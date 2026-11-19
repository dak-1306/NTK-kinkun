"use client";

import { memo, useEffect, useRef, useState } from "react";
import { VideoStateOverlay } from "./VideoStateOverlay";
import { PROJECT_UI_LABELS } from "@/constants/projects";
import type { DiscSlideDirection, ProjectVideoItem } from "@/types/project";

interface ProjectPreviewCardProps {
  item: ProjectVideoItem;
  discSide?: DiscSlideDirection;
  onSelect: (item: ProjectVideoItem) => void;
  className?: string;
}

function isCardMostlyCovered(cardEl: HTMLElement): boolean {
  const mySection = cardEl.closest<HTMLElement>(
    "[data-section-wrapper='true']",
  );
  if (!mySection) return false;

  const myZ = Number(mySection.dataset.zIndex ?? 0);
  const cardRect = cardEl.getBoundingClientRect();
  if (cardRect.height <= 0) return true;

  const sections = document.querySelectorAll<HTMLElement>(
    "[data-section-wrapper='true']",
  );

  for (let i = 0; i < sections.length; i += 1) {
    const sec = sections[i];
    if (sec === mySection) continue;
    const z = Number(sec.dataset.zIndex ?? 0);
    if (z > myZ) {
      const secRect = sec.getBoundingClientRect();
      const overlapTop = Math.max(cardRect.top, secRect.top);
      const overlapBottom = Math.min(cardRect.bottom, secRect.bottom);
      const overlapHeight = Math.max(0, overlapBottom - overlapTop);

      // Chỉ tạm dừng video lớp dưới khi section lớp trên đã che phủ > 85% khung hình
      if (overlapHeight / cardRect.height > 0.85) {
        return true;
      }
    }
  }

  return false;
}

export const ProjectPreviewCard = memo(function ProjectPreviewCard({
  item,
  discSide = "right",
  onSelect,
  className = "",
}: ProjectPreviewCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Đồng bộ trạng thái nếu trình duyệt đã nạp xong khung hình trước khi hydrate
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2) {
      setHasFirstFrame(true);
    }
  }, [item.previewVideoUrl]);

  // Theo dõi vùng nhìn & mức độ che phủ để bật/tắt phát mượt mà
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || hasVideoError) return;

    let isIntersecting = false;
    let rafId = 0;
    let stallTimer = 0;

    const clearStallTimer = () => {
      if (stallTimer !== 0) {
        window.clearTimeout(stallTimer);
        stallTimer = 0;
      }
    };

    const syncPlaybackState = () => {
      rafId = 0;
      const shouldPlay = isIntersecting && !isCardMostlyCovered(container);

      if (shouldPlay) {
        // Nếu sau 10s đang trong vùng nhìn mà vẫn chưa giải mã được khung đầu -> báo lỗi thay vì xoay mãi
        if (video.readyState < 2 && stallTimer === 0) {
          stallTimer = window.setTimeout(() => {
            if (video.readyState < 2) {
              setHasVideoError(true);
            }
          }, 10000);
        }

        if (video.paused) {
          video.play().catch(() => {});
        }
      } else {
        clearStallTimer();
        if (!video.paused) {
          video.pause();
        }
      }
    };

    const handleScroll = () => {
      if (!isIntersecting || rafId !== 0) return;
      rafId = window.requestAnimationFrame(syncPlaybackState);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isIntersecting = entry.isIntersecting;
        syncPlaybackState();
      },
      { rootMargin: "150px 0px", threshold: 0.1 },
    );

    observer.observe(container);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearStallTimer();
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [hasVideoError, item.previewVideoUrl]);

  const handleRetryPreview = () => {
    setHasVideoError(false);
    setHasFirstFrame(false);
    const el = videoRef.current;
    if (el) {
      el.load();
      el.play().catch(() => {});
    }
  };

  const drawerPositionClass =
    discSide === "right"
      ? "right-2 disc-drawer-right"
      : "left-2 disc-drawer-left";

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      aria-label={`${PROJECT_UI_LABELS.openVideoPrefix}: ${item.title}`}
      className={`group relative block h-full w-full cursor-pointer overflow-visible text-left focus-visible:z-30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] hover:z-30 ${className}`}
    >
      {/* 1. ĐĨA CV TRÒN 1:1 (Z-0) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 z-0 aspect-square h-[74%] max-h-[190px] select-none rounded-full border border-[#d90429] bg-[#09090b] ${drawerPositionClass}`}
      >
        <div
          className="h-full w-full rounded-full group-hover:animate-disc-project group-focus-visible:animate-disc-project"
          style={{
            background: `conic-gradient(
              from 15deg,
              #09090b 0deg,
              #27272a 38deg,
              #8a0303 70deg,
              #e4e4e7 86deg,
              #09090b 118deg,
              #1c1c21 178deg,
              #b8041c 228deg,
              #f4f4f5 245deg,
              #09090b 282deg,
              #4a0108 326deg,
              #09090b 360deg
            )`,
          }}
        >
          <span className="absolute inset-[14%] rounded-full border border-white/15" />
          <span className="absolute inset-[26%] rounded-full border border-[#d90429]/45" />
          <span className="absolute inset-[38%] rounded-full border border-white/15" />
          <span className="absolute top-[5%] left-1/2 h-2 w-[1px] -translate-x-1/2 bg-white/80" />
          <span className="absolute bottom-[5%] left-1/2 h-2 w-[1px] -translate-x-1/2 bg-[#d90429]" />
        </div>

        <span className="absolute top-1/2 left-1/2 flex h-[33%] w-[33%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#0a0a0d]">
          <span className="h-[45%] w-[45%] rounded-full border border-white/35 bg-[#050505]" />
        </span>
      </div>

      {/* 2. KHUNG VIDEO PREVIEW CHÍNH (Z-10) */}
      <div className="relative z-10 h-full w-full overflow-clip border border-[var(--border-strong)] bg-[#08080a] transition-colors duration-200 group-hover:border-[var(--accent)] group-focus-visible:border-[var(--accent)]">
        <video
          ref={videoRef}
          src={item.previewVideoUrl}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setHasFirstFrame(true)}
          onCanPlay={() => setHasFirstFrame(true)}
          onPlaying={() => setHasFirstFrame(true)}
          onError={() => setHasVideoError(true)}
          className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] ${
            hasFirstFrame ? "opacity-100" : "opacity-0"
          }`}
        />

        {!hasFirstFrame && !hasVideoError && (
          <VideoStateOverlay status="loading" variant="compact" />
        )}

        {hasVideoError && (
          <VideoStateOverlay
            status="error"
            variant="compact"
          
            onRetry={handleRetryPreview}
          />
        )}

        {/* Lớp phủ tối sâu ở 30% đáy khung */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5, 5, 5, 0.96) 0%, rgba(5, 5, 5, 0.84) 26%, rgba(5, 5, 5, 0.22) 54%, transparent 100%)",
          }}
        />

       

        {/* Cụm thông tin góc dưới */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4">
         
          <h3 className="mt-1.5 truncate text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] sm:text-base">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
});
