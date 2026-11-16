"use client";

import { memo } from "react";
import { UI_LABELS } from "@/constants/ui";
import type { DiscVariant } from "@/types/section";

interface CdDiscProps {
  variant: DiscVariant;
  trackCode?: string;
  label?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CdDisc = memo(function CdDisc({
  variant,
  trackCode = "01",
  label = UI_LABELS.disc.cvTag,
  isActive = false,
  onClick,
  className = "",
}: CdDiscProps) {
  const isInteractive = variant === "project" && Boolean(onClick);

  const spinClass =
    variant === "splash"
      ? "animate-disc-fast"
      : variant === "half"
        ? "animate-disc-bg"
        : "animate-disc-project";

  const sizeClass =
    variant === "splash"
      ? "h-[0.82em] w-[0.82em] inline-block align-baseline"
      : variant === "half"
        ? "h-[min(78vw,680px)] w-[min(78vw,680px)]"
        : "h-64 w-64 sm:h-72 sm:w-72";

  const discVisual = (
    <div
      className={`relative aspect-square select-none overflow-clip rounded-full border transition-colors duration-200 ${
        isActive
          ? "border-[var(--accent)]"
          : "border-[var(--border-strong)] group-hover:border-[var(--accent)]"
      } bg-[#08080a] ${sizeClass} ${className}`}
      aria-label={
        variant === "splash"
          ? UI_LABELS.disc.splashAria
          : variant === "half"
            ? UI_LABELS.disc.halfBgAria
            : `${UI_LABELS.disc.projectPlayAria} ${trackCode}`
      }
    >
      {/* LỚP 1: MẶT ĐĨA QUAY THUẦN GPU (KHÔNG DÙNG DROP-SHADOW) */}
      <div
        className={`absolute inset-0 rounded-full ${spinClass}`}
        style={{
          animationPlayState:
            variant === "project" && !isActive ? "paused" : "running",
          background: `conic-gradient(
            from 15deg,
            #070709 0deg,
            #26262c 36deg,
            #8a0303 68deg,
            #e4e4e7 84deg,
            #09090b 115deg,
            #1b1b20 175deg,
            #b8041c 228deg,
            #f4f4f5 245deg,
            #070709 280deg,
            #4a0108 325deg,
            #070709 360deg
          )`,
        }}
      >
        {/* Các rãnh dữ liệu đồng tâm */}
        <div className="absolute inset-[10%] rounded-full border border-white/10" />
        <div className="absolute inset-[18%] rounded-full border border-white/[0.07]" />
        <div className="absolute inset-[26%] rounded-full border border-[#d90429]/25" />

        {/* Vạch đánh dấu vật lý trên đĩa để mắt nhận biết chuyển động xoay */}
        <div className="absolute top-[6%] left-1/2 h-3 w-[1px] -translate-x-1/2 bg-white/60" />
        <div className="absolute bottom-[6%] left-1/2 h-3 w-[1px] -translate-x-1/2 bg-[#d90429]" />
      </div>

      {/* LỚP 2: PHẢN QUANG ÁNH SÁNG TĨNH PHÍA TRÊN (TẠO CẢM GIÁC ĐĨA QUAY DƯỚI ĐÈN) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-75 mix-blend-screen"
        style={{
          background: `conic-gradient(
            from -35deg,
            transparent 0deg,
            rgba(217, 4, 41, 0.42) 32deg,
            rgba(255, 255, 255, 0.25) 46deg,
            transparent 75deg,
            transparent 185deg,
            rgba(217, 4, 41, 0.35) 215deg,
            transparent 255deg
          )`,
        }}
      />

      {/* LỚP 3: VÒNG KẸP TRUNG TÂM (HUB RING) & LỖ TRỤC ĐĨA */}
      <div className="pointer-events-none absolute inset-[33%] rounded-full border border-white/20 bg-[#0a0a0d]/95">
        <div className="absolute inset-[18%] rounded-full border border-[#d90429]/50" />
        <div className="absolute inset-[34%] rounded-full border border-white/30 bg-[#050505]" />
      </div>

      {/* LỚP 4: THÔNG SỐ KỸ THUẬT CHO PROJECT DISC */}
      {variant === "project" && (
        <>
          <span className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-white/80">
            {trackCode}
          </span>
          <span className="pointer-events-none absolute bottom-4 left-1/2 max-w-[70%] -translate-x-1/2 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">
            {label}
          </span>
        </>
      )}
    </div>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isActive}
        className="group relative inline-flex cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        {discVisual}
      </button>
    );
  }

  return discVisual;
});
