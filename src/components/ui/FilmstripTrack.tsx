"use client";

import { memo, useEffect, useRef } from "react";
import { FILMSTRIP_UI_LABELS } from "@/constants/filmstrip";
import type { ProjectVideoItem } from "@/types/project";

interface FilmstripTrackProps {
  items: readonly ProjectVideoItem[];
  direction?: "left" | "right";
  isSectionVisible: boolean;
  onSelectVideo: (video: ProjectVideoItem) => void;
}

interface FilmstripCellProps {
  item: ProjectVideoItem;
  isClone: boolean;
  isSectionVisible: boolean;
  onSelect: (video: ProjectVideoItem) => void;
}

const SPROCKET_STRIP_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(to right, transparent 0px, transparent 10px, rgba(255, 255, 255, 0.24) 10px, rgba(255, 255, 255, 0.24) 22px, transparent 22px, transparent 32px)",
} as const;

const FilmstripCell = memo(function FilmstripCell({
  item,
  isClone,
  isSectionVisible,
  onSelect,
}: FilmstripCellProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.defaultMuted = true;
    el.muted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
  }, [item.previewVideoUrl]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Trên mobile, bỏ qua các thẻ clone đã ẩn để tránh trùng URL gây khóa luồng Safari
    if (isClone && typeof window !== "undefined" && window.innerWidth < 768) {
      if (!el.paused) el.pause();
      return;
    }

    if (isSectionVisible) {
      if (el.paused) {
        el.play().catch(() => {});
      }
    } else if (!el.paused) {
      el.pause();
    }
  }, [isClone, isSectionVisible]);

  return (
    <div
      role="button"
      tabIndex={isClone ? -1 : 0}
      aria-hidden={isClone || undefined}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      aria-label={
        isClone
          ? undefined
          : `${FILMSTRIP_UI_LABELS.openFramePrefix}: ${item.title}`
      }
      className={`group/cell relative w-[82vw] max-w-[680px] shrink-0 snap-center cursor-pointer border-r-[8px] border-[#050507] bg-[#08080b] p-2.5 transition-colors duration-150 hover:bg-[#140407] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-[460px] sm:p-3.5 md:w-[540px] lg:w-[620px] xl:w-[680px] ${
        isClone ? "hidden md:block" : ""
      }`}
    >
      {/* Khung hình 16:9 khổ lớn */}
      <div className="relative aspect-video w-full overflow-clip border border-[var(--border-strong)] bg-[#060609] transition-colors duration-200 group-hover/cell:border-[var(--accent)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="h-4 w-[1px] bg-white/15" />
          <span className="absolute h-[1px] w-4 bg-white/15" />
        </div>

        <video
          ref={videoRef}
          src={item.previewVideoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="relative z-10 h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cell:scale-[1.03]"
        />

        {/* Lớp phủ tối đáy khung giúp chữ luôn sắc nét */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(5, 5, 5, 0.94) 0%, rgba(5, 5, 5, 0.65) 24%, transparent 55%)",
          }}
        />

        {/* Nhãn thông tin góc dưới */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-3.5 sm:p-4">
          <div className="min-w-0">
            <h3 className="mt-1.5 truncate text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] sm:text-base">
              {item.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
});

export const FilmstripTrack = memo(function FilmstripTrack({
  items,
  direction = "left",
  isSectionVisible,
  onSelectVideo,
}: FilmstripTrackProps) {
  const animationClass =
    direction === "left"
      ? "md:animate-filmstrip-left"
      : "md:animate-filmstrip-right";

  return (
    <div className="group/reel relative w-full border-y border-[var(--border-strong)] bg-[#060608]">
      {/* Hàng lỗ răng cưa phim 35mm phía trên */}
      <div
        aria-hidden="true"
        className="h-4 w-full border-b border-white/10 bg-[#040406] py-1 sm:h-5"
      >
        <div className="h-full w-full" style={SPROCKET_STRIP_STYLE} />
      </div>

      {/* Mobile: vuốt chạm mượt | Desktop: băng chuyền tự trôi ngang */}
      <div className="w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-clip">
        <div
          className={`flex w-max md:will-change-transform md:group-hover/reel:[animation-play-state:paused] md:group-focus-within/reel:[animation-play-state:paused] ${
            !isSectionVisible ? "md:[animation-play-state:paused]" : ""
          } ${animationClass}`}
        >
          {items.map((item) => (
            <FilmstripCell
              key={item.id}
              item={item}
              isClone={false}
              isSectionVisible={isSectionVisible}
              onSelect={onSelectVideo}
            />
          ))}

          {items.map((item) => (
            <FilmstripCell
              key={`${item.id}-clone`}
              item={item}
              isClone
              isSectionVisible={isSectionVisible}
              onSelect={onSelectVideo}
            />
          ))}
        </div>
      </div>

      {/* Hàng lỗ răng cưa phim 35mm phía dưới */}
      <div
        aria-hidden="true"
        className="h-4 w-full border-t border-white/10 bg-[#040406] py-1 sm:h-5"
      >
        <div className="h-full w-full" style={SPROCKET_STRIP_STYLE} />
      </div>
    </div>
  );
});
