"use client";

import { useEffect, useRef, useState } from "react";
import { PORTRAIT_ASSET } from "@/constants/assets";
import { SPLASH_COPY } from "@/constants/splash";

const IMAGE_TIMEOUT_MS = 3000;

function preloadPortrait(src: string): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      img.onload = null;
      img.onerror = null;
      resolve();
    };

    const timer = window.setTimeout(finish, IMAGE_TIMEOUT_MS);
    const img = new window.Image();
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
  });
}

export function useAssetPreloader() {
  const [isReadyToExit, setIsReadyToExit] = useState(false);

  const barRef = useRef<HTMLDivElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const statusRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let rafId = 0;

    const totalTasks = 2; // 1: Fonts, 2: Portrait Image
    let completedTasks = 0;
    let allSettled = false;
    let visualProgress = 0;

    if (statusRef.current) {
      statusRef.current.textContent = SPLASH_COPY.fontLoadLabel;
    }

    const markTaskDone = (nextLabel: string) => {
      if (isCancelled) return;
      completedTasks += 1;
      if (statusRef.current) {
        statusRef.current.textContent = nextLabel;
      }
      if (completedTasks >= totalTasks) {
        allSettled = true;
      }
    };

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready
        .then(() => markTaskDone("ĐANG TẢI HÌNH ẢNH"))
        .catch(() => markTaskDone("ĐANG TẢI HÌNH ẢNH"));
    } else {
      markTaskDone("ĐANG TẢI HÌNH ẢNH");
    }

    preloadPortrait(PORTRAIT_ASSET.src).then(() => {
      markTaskDone(SPLASH_COPY.readyLabel);
    });

    const tick = () => {
      if (isCancelled) return;

      const targetProgress = (completedTasks / totalTasks) * 100;
      const diff = targetProgress - visualProgress;

      if (Math.abs(diff) < 0.3) {
        visualProgress = targetProgress;
      } else {
        visualProgress += diff * 0.16;
      }

      const clamped = Math.min(100, Math.max(0, visualProgress));
      const rounded = Math.round(clamped);

      if (barRef.current) {
        barRef.current.style.transform = `scale3d(${clamped / 100}, 1, 1)`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${String(rounded).padStart(3, "0")}%`;
      }

      if (allSettled && rounded >= 100) {
        window.setTimeout(() => {
          if (!isCancelled) {
            setIsReadyToExit(true);
          }
        }, 200);
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    isReadyToExit,
    barRef,
    percentRef,
    statusRef,
  };
}
