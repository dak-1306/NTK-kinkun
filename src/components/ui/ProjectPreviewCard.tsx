"use client";

import { memo, useEffect, useId, useRef, useState } from "react";
import { VideoStateOverlay } from "./VideoStateOverlay";
import { PROJECT_UI_LABELS } from "@/constants/projects";
import type { DiscSlideDirection, ProjectVideoItem } from "@/types/project";

interface ProjectPreviewCardProps {
  item: ProjectVideoItem;
  discSide?: DiscSlideDirection;
  onSelect: (item: ProjectVideoItem) => void;
  className?: string;
}

export const ProjectPreviewCard = memo(function ProjectPreviewCard({
  item,
  discSide = "right",
  onSelect,
  className = "",
}: ProjectPreviewCardProps) {
  const uid = useId();
  const sheenGradId = `${uid}-disc-sheen`;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Tự động phát video preview khi khung hình lọt vào vùng nhìn, tạm dừng khi rời khỏi màn hình
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || hasVideoError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Trình duyệt có thể tạm hoãn autoplay cho đến khi có tương tác
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasVideoError]);

  const handleRetryPreview = () => {
    setHasVideoError(false);
    setIsVideoLoading(true);
    const el = videoRef.current;
    if (el) {
      el.load();
      el.play().catch(() => {
        setIsVideoLoading(false);
      });
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
      {/* 1. ĐĨA CV TRÒN 1:1 TUYỆT ĐỐI (Z-0): ẨN HOÀN TOÀN LÚC TĨNH, TRƯỢT RA NGOÀI KHI HOVER */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        width="600"
        height="600"
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "76%",
          maxHeight: "82%",
        }}
        className={`pointer-events-none absolute top-1/2 z-0 select-none ${drawerPositionClass}`}
      >
        <defs>
          <linearGradient id={sheenGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="30%" stopColor="#8a0303" />
            <stop offset="50%" stopColor="#e4e4e7" />
            <stop offset="72%" stopColor="#b8041c" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* Nhóm mặt đĩa xoay tròn liên tục trên GPU */}
        <g className="svg-origin-center animate-disc-project">
          {/* Nền đĩa & viền đỏ sắc nét */}
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="#09090b"
            stroke="#d90429"
            strokeWidth="2"
          />

          {/* Mảng phản quang quang học */}
          <path
            d="M100,100 L100,2 A98,98 0 0,1 188,58 Z"
            fill={`url(#${sheenGradId})`}
            opacity="0.78"
          />
          <path
            d="M100,100 L100,198 A98,98 0 0,1 12,142 Z"
            fill={`url(#${sheenGradId})`}
            opacity="0.72"
          />
          <path
            d="M100,100 L185,148 A98,98 0 0,1 132,192 Z"
            fill="#d90429"
            opacity="0.35"
          />
          <path
            d="M100,100 L15,52 A98,98 0 0,1 68,8 Z"
            fill="#ffffff"
            opacity="0.14"
          />

          {/* Các rãnh dữ liệu đồng tâm */}
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="rgba(217,4,41,0.45)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="56"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />

          {/* Vạch định vị chuyển động xoay */}
          <line
            x1="100"
            y1="6"
            x2="100"
            y2="16"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.5"
          />
          <line
            x1="100"
            y1="184"
            x2="100"
            y2="194"
            stroke="#d90429"
            strokeWidth="1.5"
          />
        </g>

        {/* Vòng kẹp trung tâm (Hub Ring) & lỗ trục tĩnh */}
        <circle
          cx="100"
          cy="100"
          r="33"
          fill="#0a0a0d"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.2"
        />
        <circle
          cx="100"
          cy="100"
          r="15"
          fill="#050505"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        />
      </svg>

      {/* 2. KHUNG VIDEO PREVIEW CHÍNH (Z-10, PHÁT VIDEO TRỰC TIẾP) */}
      <div className="relative z-10 h-full w-full overflow-clip border border-[var(--border-strong)] bg-[#08080a] transition-colors duration-200 group-hover:border-[var(--accent)] group-focus-visible:border-[var(--accent)]">
        <video
          ref={videoRef}
          src={item.previewVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadStart={() => setIsVideoLoading(true)}
          onWaiting={() => setIsVideoLoading(true)}
          onCanPlay={() => setIsVideoLoading(false)}
          onPlaying={() => setIsVideoLoading(false)}
          onError={() => {
            setIsVideoLoading(false);
            setHasVideoError(true);
          }}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.03]"
        />

        {/* Overlay custom cho trạng thái chờ tải & lỗi video */}
        {isVideoLoading && !hasVideoError && (
          <VideoStateOverlay status="loading" variant="compact" />
        )}

        {hasVideoError && (
          <VideoStateOverlay
            status="error"
            variant="compact"
            sceneCode={item.sceneCode}
            onRetry={handleRetryPreview}
          />
        )}

        {/* Lớp phủ tối sâu ở 30% đáy khung giúp tiêu đề luôn nổi bật trên mọi cảnh quay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(5, 5, 5, 0.96) 0%, rgba(5, 5, 5, 0.84) 26%, rgba(5, 5, 5, 0.22) 54%, transparent 100%)",
          }}
        />

        {/* Thông số góc trên */}
        <div className="relative z-10 flex items-center justify-between p-3.5 sm:p-4">
          <span className="inline-flex items-center gap-1.5 border border-white/10 bg-[#050505]/85 px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-[var(--text-primary)]">
            <span className="h-1.5 w-1.5 bg-white/40 transition-colors duration-150 group-hover:bg-[var(--accent)]" />
            {item.sceneCode}
          </span>

          <span className="border border-white/10 bg-[#050505]/85 px-2 py-0.5 font-mono text-[10px] tracking-[0.16em] text-[var(--text-secondary)]">
            {item.duration}
          </span>
        </div>

        {/* Cụm thông tin góc dưới: Nhãn đỏ có nền khóa tương phản + Tiêu đề sắc nét */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4">
          <span className="inline-flex items-center border-l-2 border-[var(--accent)] bg-[#050505]/92 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.16em] text-[#ff2a4b]">
            {item.year} • {item.duration}
          </span>
          <h3 className="mt-1.5 truncate text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] sm:text-base">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
});
