"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { TvStaticBackdrop } from "./TvStaticBackdrop";
import { VideoStateOverlay } from "./VideoStateOverlay";
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

function formatTimecode(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function ScreeningPlayer({ video, onClose }: ScreeningPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [hasMediaError, setHasMediaError] = useState(false);

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

  // Vòng lặp rAF duy nhất cập nhật thanh tiến trình video bằng GPU scale3d
  useEffect(() => {
    let rafId = 0;

    const syncTimeline = () => {
      const el = videoRef.current;
      if (el && el.duration > 0) {
        const ratio = Math.min(1, Math.max(0, el.currentTime / el.duration));
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scale3d(${ratio}, 1, 1)`;
        }
        if (timecodeRef.current) {
          timecodeRef.current.textContent = `${formatTimecode(
            el.currentTime,
          )} / ${formatTimecode(el.duration)}`;
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

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleRetryVideo = () => {
    setHasMediaError(false);
    setIsBuffering(true);
    const el = videoRef.current;
    if (el) {
      el.load();
      el.play().catch(() => {
        setIsBuffering(false);
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
      {/* 1. BACKGROUND NHIỄU TV ANALOG / CRT MẤT TÍN HIỆU */}
      <TvStaticBackdrop intensity="normal" />

      {/* 2. THANH TIÊU ĐỀ PHÒNG CHIẾU */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] items-center justify-between border-b border-[var(--border)] pb-3.5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-[var(--accent)]" />
          <span className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">
            {video.sceneCode}
          </span>
          <span className="text-[var(--border-strong)]">/</span>
          <h2 className="truncate text-sm font-semibold uppercase tracking-wide text-[var(--text-primary)] sm:text-base">
            {video.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label={PROJECT_UI_LABELS.modal.closeAriaLabel}
          className="inline-flex h-9 cursor-pointer items-center gap-2 border border-[var(--border-strong)] bg-[#0a0a0d] px-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-primary)] transition-colors duration-150 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <span>{PROJECT_UI_LABELS.modal.closeLabel}</span>
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 3. KHUNG MÀN CHIẾU CHÍNH */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1240px] flex-col items-center justify-center">
        <div className="relative aspect-video max-h-[70dvh] w-full overflow-clip border border-[var(--border-strong)] bg-black">
          <video
            ref={videoRef}
            src={video.fullVideoUrl}
            autoPlay
            playsInline
            onClick={togglePlay}
            onLoadStart={() => setIsBuffering(true)}
            onWaiting={() => setIsBuffering(true)}
            onCanPlay={() => setIsBuffering(false)}
            onPlaying={() => {
              setIsBuffering(false);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              setIsBuffering(false);
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
              sceneCode={video.sceneCode}
              onRetry={handleRetryVideo}
            />
          )}
        </div>
      </div>

      {/* 4. BẢNG ĐIỀU KHIỂN PHÁT & THANH TUA TIẾN TRÌNH */}
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

        <div className="flex items-center justify-between font-mono text-xs tracking-[0.16em]">
          <div className="flex items-center gap-3">
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
          </div>

          <div className="flex items-center gap-4 text-[var(--text-secondary)]">
            <span className="hidden text-[10px] md:inline">
              {PROJECT_UI_LABELS.modal.shortcutHint}
            </span>
            <span ref={timecodeRef} className="text-[var(--text-primary)]">
              00:00 / {video.duration}
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
