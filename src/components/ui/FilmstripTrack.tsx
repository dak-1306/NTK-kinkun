"use client";

import { memo, useEffect, useRef, useState } from "react";
import { FILMSTRIP_UI_LABELS } from "@/constants/filmstrip";
import {
  getSharedVideoEntry,
  isVideoClaimedByModal,
  prioritizePoolVideo,
  subscribeSharedVideoPool,
} from "@/lib/sharedVideoPool";
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
  const hostRef = useRef<HTMLDivElement | null>(null);
  const cloneVideoRef = useRef<HTMLVideoElement | null>(null);

  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [modalClaimed, setModalClaimed] = useState(() =>
    isVideoClaimedByModal(item.previewVideoUrl),
  );

  useEffect(() => {
    if (isClone) return;
    return subscribeSharedVideoPool(() => {
      setModalClaimed(isVideoClaimedByModal(item.previewVideoUrl));
    });
  }, [isClone, item.previewVideoUrl]);

  // 3 ô chính dùng chung phần tử <video> đã đệm sẵn từ pool
  useEffect(() => {
    if (isClone || modalClaimed) return;
    const host = hostRef.current;
    if (!host) return;

    const entry = getSharedVideoEntry(item.previewVideoUrl);
    const video = entry.element;

    if (entry.isReady || video.readyState >= 2) {
      setHasFirstFrame(true);
    }

    const onReady = () => setHasFirstFrame(true);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("playing", onReady);

    if (isSectionVisible) {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.className = "h-full w-full object-cover object-center";
      if (video.parentElement !== host) {
        host.appendChild(video);
      }
      if (video.paused) {
        video.play().catch(() => {});
      }
    } else if (!video.paused) {
      video.pause();
    }

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("playing", onReady);
    };
  }, [isClone, isSectionVisible, item.previewVideoUrl, modalClaimed]);

  // 3 ô nhân bản nối vòng dùng thẻ phụ nhẹ preload="metadata"
  useEffect(() => {
    if (!isClone) return;
    const el = cloneVideoRef.current;
    if (!el) return;

    if (isSectionVisible && !modalClaimed) {
      if (el.paused) {
        el.play().catch(() => {});
      }
    } else if (!el.paused) {
      el.pause();
    }
  }, [isClone, isSectionVisible, modalClaimed]);

  return (
    <div
      role="button"
      tabIndex={isClone ? -1 : 0}
      aria-hidden={isClone || undefined}
      onMouseEnter={() => prioritizePoolVideo(item.fullVideoUrl)}
      onTouchStart={() => prioritizePoolVideo(item.fullVideoUrl)}
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
      className="group/cell relative w-[300px] shrink-0 cursor-pointer border-r-[8px] border-[#050507] bg-[#08080b] p-2.5 transition-colors duration-150 hover:bg-[#140407] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-[440px] sm:p-3.5 md:w-[540px] lg:w-[620px] xl:w-[680px]"
    >
      <div className="relative aspect-video w-full overflow-clip border border-[var(--border-strong)] bg-[#060609] transition-colors duration-200 group-hover/cell:border-[var(--accent)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="h-4 w-[1px] bg-white/15" />
          <span className="absolute h-[1px] w-4 bg-white/15" />
        </div>

        {!isClone ? (
          <div
            ref={hostRef}
            className={`relative z-10 h-full w-full transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cell:scale-[1.03] ${
              hasFirstFrame ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <video
            ref={cloneVideoRef}
            src={item.previewVideoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setHasFirstFrame(true)}
            onCanPlay={() => setHasFirstFrame(true)}
            onPlaying={() => setHasFirstFrame(true)}
            className={`relative z-10 h-full w-full object-cover object-center transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cell:scale-[1.03] ${
              hasFirstFrame ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(5, 5, 5, 0.94) 0%, rgba(5, 5, 5, 0.65) 24%, transparent 55%)",
          }}
        />

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
    direction === "left" ? "animate-filmstrip-left" : "animate-filmstrip-right";

  return (
    <div className="group/reel relative w-full border-y border-[var(--border-strong)] bg-[#060608]">
      <div
        aria-hidden="true"
        className="h-4 w-full border-b border-white/10 bg-[#040406] py-1 sm:h-5"
      >
        <div className="h-full w-full" style={SPROCKET_STRIP_STYLE} />
      </div>

      <div className="w-full overflow-clip">
        <div
          className={`flex w-max will-change-transform group-hover/reel:[animation-play-state:paused] group-focus-within/reel:[animation-play-state:paused] ${
            !isSectionVisible ? "[animation-play-state:paused]" : ""
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

      <div
        aria-hidden="true"
        className="h-4 w-full border-t border-white/10 bg-[#040406] py-1 sm:h-5"
      >
        <div className="h-full w-full" style={SPROCKET_STRIP_STYLE} />
      </div>
    </div>
  );
});
