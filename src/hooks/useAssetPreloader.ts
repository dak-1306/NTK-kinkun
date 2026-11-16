"use client";

import { useEffect, useRef, useState } from "react";
import { CRITICAL_ASSETS, type PreloadAssetItem } from "@/constants/assets";
import { SPLASH_COPY } from "@/constants/splash";

const ASSET_TIMEOUT_MS = 3500;

function probeSingleAsset(item: PreloadAssetItem): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve();
    };

    const timer = window.setTimeout(finish, ASSET_TIMEOUT_MS);

    if (item.type === "image") {
      const img = new window.Image();
      img.onload = finish;
      img.onerror = finish;
      img.src = item.src;
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.onloadedmetadata = finish;
    video.onerror = finish;
    video.src = item.src;
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

    // Tổng số tác vụ = 1 (Fonts) + số lượng CRITICAL_ASSETS
    const totalTasks = CRITICAL_ASSETS.length + 1;
    let completedTasks = 0;
    let allSettled = false;
    let visualProgress = 0;

    if (statusRef.current) {
      statusRef.current.textContent = SPLASH_COPY.fontLoadLabel;
    }

    const markTaskDone = (nextLabel?: string) => {
      if (isCancelled) return;
      completedTasks += 1;
      if (statusRef.current && nextLabel) {
        statusRef.current.textContent = nextLabel;
      }
      if (completedTasks >= totalTasks) {
        allSettled = true;
        if (statusRef.current) {
          statusRef.current.textContent = SPLASH_COPY.readyLabel;
        }
      }
    };

    // 1. Nạp Font chữ Việt hóa thực tế
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready
        .then(() => markTaskDone(CRITICAL_ASSETS[0]?.label))
        .catch(() => markTaskDone(CRITICAL_ASSETS[0]?.label));
    } else {
      markTaskDone(CRITICAL_ASSETS[0]?.label);
    }

    // 2. Nạp đồng thời các ảnh bìa & metadata video
    CRITICAL_ASSETS.forEach((asset, index) => {
      const nextAsset = CRITICAL_ASSETS[index + 1];
      probeSingleAsset(asset).then(() => {
        markTaskDone(nextAsset ? nextAsset.label : SPLASH_COPY.readyLabel);
      });
    });

    // 3. Vòng lặp rAF duy nhất nội suy thanh tiến trình bằng GPU scale3d
    const tick = () => {
      if (isCancelled) return;

      const targetProgress = (completedTasks / totalTasks) * 100;
      const diff = targetProgress - visualProgress;

      if (Math.abs(diff) < 0.25) {
        visualProgress = targetProgress;
      } else {
        visualProgress += diff * 0.14;
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
        }, 220);
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
