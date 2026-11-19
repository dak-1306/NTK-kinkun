"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { TvStaticBackdrop } from "./TvStaticBackdrop";
import { VideoStateOverlay } from "./VideoStateOverlay";
import { CinemaButton } from "./CinemaButton";
import { PROJECT_UI_LABELS } from "@/constants/projects";
import type { ProjectVideoItem } from "@/types/project";

interface CinemaScreeningModalProps {
  video: ProjectVideoItem | null;
  onClose: () => void;
}

interface ScreeningPlayerProps {
  video: ProjectVideoItem;
  onClose: () => void;
}

function ScreeningPlayer({ video, onClose }: ScreeningPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const bufferingTimerRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [hasMediaError, setHasMediaError] = useState(false);

  const scheduleBufferingOverlay = useCallback((delayMs = 200) => {
    window.clearTimeout(bufferingTimerRef.current);
    bufferingTimerRef.current = window.setTimeout(() => {
      setIsBuffering(true);
    }, delayMs);
  }, []);

  const clearBufferingOverlay = useCallback(() => {
    window.clearTimeout(bufferingTimerRef.current);
    setIsBuffering(false);
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(bufferingTimerRef.current);
    };
  }, []);

  // Tạm dừng toàn bộ video preview nền để điện thoại dồn 100% băng thông & decoder cho phòng chiếu
  useEffect(() => {
    const allVideos = Array.from(document.querySelectorAll("video"));
    const pausedBackgroundVideos = allVideos.filter(
      (el) => el !== videoRef.current && !el.paused,
    );

    pausedBackgroundVideos.forEach((el) => el.pause());

    return () => {
      pausedBackgroundVideos.forEach((el) => {
        el.play().catch(() => {});
      });
    };
  }, []);

  // Khởi chạy video & dự phòng nếu trình duyệt di động chặn autoplay có tiếng
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    el.play().catch(() => {
      el.muted = true;
      setIsMuted(true);
      el.play().catch(() => {
        setIsPlaying(false);
        clearBufferingOverlay();
      });
    });
  }, [video.fullVideoUrl, clearBufferingOverlay]);

  // Khóa cuộn trang & gắn phím tắt ESC / Space
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " ") {
        e.preventDefault();
        const el = videoRef.current;
        if (!el) return;
        if (el.paused) {
          el.play().catch(() => {});
          setIsPlaying(true);
        } else {
          el.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Cập nhật thanh tiến trình video bằng GPU scale3d
  useEffect(() => {
    let rafId = 0;

    const syncTimeline = () => {
      const el = videoRef.current;
      if (el && el.duration > 0) {
        const ratio = Math.min(1, Math.max(0, el.currentTime / el.duration));
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scale3d(${ratio}, 1, 1)`;
        }
      }
      rafId = window.requestAnimationFrame(syncTimeline);
    };

    rafId = window.requestAnimationFrame(syncTimeline);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleOpenDrive = () => {
    const el = videoRef.current;
    if (el && !el.paused) {
      el.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleRetryVideo = () => {
    setHasMediaError(false);
    scheduleBufferingOverlay(0);
    const el = videoRef.current;
    if (el) {
      el.load();
      el.play().catch(() => {
        clearBufferingOverlay();
      });
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width),
    );
    el.currentTime = clickRatio * el.duration;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={PROJECT_UI_LABELS.modal.dialogAriaLabel}
      className="fixed inset-0 z-[70] flex flex-col justify-between bg-[#030303] p-4 sm:p-8"
    >
      <TvStaticBackdrop intensity="normal" />

      {/* THANH TIÊU ĐỀ PHÒNG CHIẾU */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] items-start justify-between gap-4 border-b border-[var(--border)] pb-3.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]">
            <span className="h-2 w-2 shrink-0 bg-[var(--accent)]" />
          </div>

          <h2 className="mt-1.5 text-sm font-semibold uppercase leading-snug tracking-wide text-[var(--text-primary)] break-words sm:text-base lg:text-lg">
            {video.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={PROJECT_UI_LABELS.modal.closeAriaLabel}
          className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 border border-[var(--border-strong)] bg-[#0a0a0d] px-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <span>{PROJECT_UI_LABELS.modal.closeLabel}</span>
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* KHUNG MÀN CHIẾU CHÍNH */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1240px] flex-col items-center justify-center">
        <div className="relative aspect-video max-h-[60dvh] w-full overflow-clip border border-[var(--border-strong)] bg-black sm:max-h-[64dvh]">
          <video
            ref={videoRef}
            src={video.fullVideoUrl}
            autoPlay
            playsInline
            preload="auto"
            onClick={togglePlay}
            onWaiting={() => scheduleBufferingOverlay(300)}
            onLoadedData={clearBufferingOverlay}
            onCanPlay={clearBufferingOverlay}
            onPlaying={() => {
              clearBufferingOverlay();
              setIsPlaying(true);
            }}
            onSeeked={clearBufferingOverlay}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              clearBufferingOverlay();
              setHasMediaError(true);
            }}
            className="h-full w-full cursor-pointer object-contain"
          />

          {isBuffering && !hasMediaError && (
            <VideoStateOverlay status="loading" variant="theater" />
          )}

          {hasMediaError && (
            <VideoStateOverlay
              status="error"
              variant="theater"
              onRetry={handleRetryVideo}
            />
          )}
        </div>
      </div>

      {/* BẢNG ĐIỀU KHIỂN PHÁT & THANH TUA TIẾN TRÌNH */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] space-y-3 pt-3">
        <div
          onClick={handleScrub}
          role="slider"
          aria-label={PROJECT_UI_LABELS.modal.sliderAriaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          tabIndex={0}
          className="group relative h-2 w-full cursor-pointer bg-white/15"
        >
          <div
            ref={progressBarRef}
            style={{ transform: "scale3d(0, 1, 1)" }}
            className="h-full w-full origin-left bg-[var(--accent)] will-change-transform"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs tracking-[0.16em]">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex h-8 cursor-pointer items-center gap-2 border border-[var(--border-strong)] bg-[#0a0a0d] px-3 text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current" />
                  <span>{PROJECT_UI_LABELS.modal.pauseLabel}</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>{PROJECT_UI_LABELS.modal.playLabel}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex h-8 cursor-pointer items-center gap-2 border border-[var(--border-strong)] bg-[#0a0a0d] px-3 text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="hidden sm:inline">
                    {PROJECT_UI_LABELS.modal.unmuteLabel}
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {PROJECT_UI_LABELS.modal.muteLabel}
                  </span>
                </>
              )}
            </button>

            {video.driveUrl && (
              <CinemaButton
                size="sm"
                href={video.driveUrl}
                label={PROJECT_UI_LABELS.modal.driveLabel}
                ariaLabel={PROJECT_UI_LABELS.modal.driveAriaLabel}
                onClick={handleOpenDrive}
              />
            )}
          </div>

          <div className="flex items-center gap-4 text-[var(--text-secondary)]">
            <span className="hidden text-[10px] lg:inline">
              {PROJECT_UI_LABELS.modal.shortcutHint}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CinemaScreeningModal({
  video,
  onClose,
}: CinemaScreeningModalProps) {
  if (!video || typeof document === "undefined") return null;

  return createPortal(
    <ScreeningPlayer key={video.id} video={video} onClose={onClose} />,
    document.body,
  );
}
