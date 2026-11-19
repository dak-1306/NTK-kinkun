"use client";

type PoolListener = () => void;

interface SharedVideoEntry {
  url: string;
  element: HTMLVideoElement;
  isClaimedByModal: boolean;
  isReady: boolean;
}

const pool = new Map<string, SharedVideoEntry>();
const listeners = new Set<PoolListener>();

let warmupQueue: string[] = [];
let activeWarmupUrl: string | null = null;
let isWarmupRunning = false;
let isWarmupPausedForModal = false;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

/**
 * Lấy hoặc khởi tạo đúng 1 HTMLVideoElement duy nhất cho mỗi URL (không dính CORS)
 */
export function getSharedVideoEntry(url: string): SharedVideoEntry {
  const existing = pool.get(url);
  if (existing) return existing;

  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = url;

  const entry: SharedVideoEntry = {
    url,
    element: video,
    isClaimedByModal: false,
    isReady: false,
  };

  const markReady = () => {
    entry.isReady = true;
  };

  video.addEventListener("loadeddata", markReady, { once: true });
  video.addEventListener("canplay", markReady, { once: true });

  pool.set(url, entry);
  return entry;
}

function waitForVideoBuffer(entry: SharedVideoEntry): Promise<void> {
  return new Promise((resolve) => {
    const el = entry.element;
    if (entry.isReady || el.readyState >= 3) {
      entry.isReady = true;
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      el.removeEventListener("canplaythrough", finish);
      el.removeEventListener("loadeddata", finish);
      el.removeEventListener("error", finish);
      resolve();
    };

    // Giới hạn tối đa 6s mỗi video để chuyển sang nạp video tiếp theo
    const timer = window.setTimeout(finish, 6000);
    el.addEventListener("canplaythrough", finish);
    el.addEventListener("loadeddata", finish);
    el.addEventListener("error", finish);
    el.load();
  });
}

async function runSequentialWarmup() {
  if (isWarmupRunning || isWarmupPausedForModal) return;
  isWarmupRunning = true;

  try {
    while (warmupQueue.length > 0 && !isWarmupPausedForModal) {
      const nextUrl = warmupQueue.shift();
      if (!nextUrl) continue;

      const entry = getSharedVideoEntry(nextUrl);
      if (entry.isReady || entry.element.readyState >= 3) continue;

      activeWarmupUrl = nextUrl;
      await waitForVideoBuffer(entry);
      activeWarmupUrl = null;
    }
  } finally {
    isWarmupRunning = false;
  }
}

export function enqueuePoolWarmup(urls: readonly string[]) {
  for (const url of urls) {
    if (!url || warmupQueue.includes(url)) continue;
    warmupQueue.push(url);
  }
  void runSequentialWarmup();
}

export function prioritizePoolVideo(url: string) {
  if (!url) return;
  const entry = getSharedVideoEntry(url);
  if (entry.isReady || entry.element.readyState >= 3) return;
  if (activeWarmupUrl === url) return;

  warmupQueue = [url, ...warmupQueue.filter((item) => item !== url)];
  void runSequentialWarmup();
}

/**
 * Phòng chiếu tiếp quản trực tiếp thẻ <video> đã tải sẵn từ preview
 */
export function claimSharedVideo(url: string): HTMLVideoElement {
  isWarmupPausedForModal = true;

  // Tạm dừng các video khác để dồn 100% băng thông cho video đang mở
  pool.forEach((item, key) => {
    if (key !== url && !item.element.paused) {
      item.element.pause();
    }
  });

  const entry = getSharedVideoEntry(url);
  entry.isClaimedByModal = true;
  notifyListeners();
  return entry.element;
}

/**
 * Trả thẻ <video> về lại cho preview sau khi đóng phòng chiếu
 */
export function releaseSharedVideo(url: string) {
  const entry = pool.get(url);
  if (entry) {
    entry.isClaimedByModal = false;
    entry.element.muted = true;
    entry.element.loop = true;
  }

  isWarmupPausedForModal = false;
  notifyListeners();
  void runSequentialWarmup();
}

export function isVideoClaimedByModal(url: string): boolean {
  return pool.get(url)?.isClaimedByModal ?? false;
}

export function subscribeSharedVideoPool(listener: PoolListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
