"use client";

import { memo } from "react";
import { RotateCcw } from "lucide-react";
import { PROJECT_UI_LABELS } from "@/constants/projects";

export type VideoPlaybackStatus = "loading" | "error";

interface VideoStateOverlayProps {
  status: VideoPlaybackStatus;
  variant?: "compact" | "theater";
  onRetry?: () => void;
}

export const VideoStateOverlay = memo(function VideoStateOverlay({
  status,
  variant = "compact",
  onRetry,
}: VideoStateOverlayProps) {
  const isTheater = variant === "theater";

  if (status === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/75 ${
          isTheater ? "gap-4" : "gap-2.5"
        }`}
      >
        {/* Vòng đĩa quang học xoay thuần GPU */}
        <div
          className={`relative flex items-center justify-center rounded-full border border-white/15 ${
            isTheater ? "h-14 w-14" : "h-9 w-9"
          }`}
        >
          <span
            aria-hidden="true"
            className="animate-disc-fast absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent)] border-r-[var(--accent)]/40"
          />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        </div>

        <span
          className={`font-mono uppercase tracking-[0.2em] text-[var(--text-primary)] ${
            isTheater ? "text-xs" : "text-[9px]"
          }`}
        >
          {isTheater
            ? PROJECT_UI_LABELS.videoState.loadingTheater
            : PROJECT_UI_LABELS.videoState.loadingPreview}
        </span>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#070709]/92 p-4 text-center ${
        isTheater ? "gap-4" : "gap-2"
      }`}
    >
      {/* Biểu tượng cuộn phim mất tín hiệu 1px */}
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className={isTheater ? "h-12 w-12" : "h-8 w-8"}
      >
        <rect
          x="6"
          y="10"
          width="36"
          height="28"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.2"
        />
        <line
          x1="12"
          y1="10"
          x2="12"
          y2="38"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <line
          x1="36"
          y1="10"
          x2="36"
          y2="38"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <line
          x1="16"
          y1="18"
          x2="32"
          y2="30"
          stroke="#d90429"
          strokeWidth="1.6"
        />
        <line
          x1="32"
          y1="18"
          x2="16"
          y2="30"
          stroke="#d90429"
          strokeWidth="1.6"
        />
      </svg>

      <div className="space-y-1">
        <p
          className={`font-mono uppercase tracking-[0.2em] text-[var(--accent)] ${
            isTheater ? "text-xs" : "text-[9px]"
          }`}
        ></p>

        <p
          className={`font-semibold uppercase tracking-wide text-[var(--text-primary)] ${
            isTheater ? "text-base sm:text-lg" : "text-xs"
          }`}
        >
          {PROJECT_UI_LABELS.videoState.errorTitle}
        </p>

        {isTheater && (
          <p className="mx-auto max-w-md text-xs text-[var(--text-secondary)]">
            {PROJECT_UI_LABELS.videoState.errorDescription}
          </p>
        )}
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRetry();
          }}
          className={`mt-1 inline-flex cursor-pointer items-center gap-1.5 border border-[var(--border-strong)] bg-[#0c0c10] font-mono uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
            isTheater ? "h-9 px-4 text-xs" : "h-7 px-2.5 text-[9px]"
          }`}
        >
          <RotateCcw className={isTheater ? "h-3.5 w-3.5" : "h-2.5 w-2.5"} />
          <span>{PROJECT_UI_LABELS.videoState.retryLabel}</span>
        </button>
      )}
    </div>
  );
});
