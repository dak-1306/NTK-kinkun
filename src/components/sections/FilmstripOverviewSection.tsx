"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { TvStaticBackdrop } from "@/components/ui/TvStaticBackdrop";
import { FilmstripTrack } from "@/components/ui/FilmstripTrack";
import { CinemaScreeningModal } from "@/components/ui/CinemaScreeningModal";
import { FILMSTRIP_REEL_ITEMS } from "@/constants/filmstrip";
import type { ProjectVideoItem } from "@/types/project";

export function FilmstripOverviewSection() {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ProjectVideoItem | null>(
    null,
  );

  useEffect(() => {
    const target = triggerRef.current;
    if (!target) return;

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsSectionVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.12 },
    );

    visibilityObserver.observe(target);
    return () => visibilityObserver.disconnect();
  }, []);

  // Tạm dừng các video preview ở layer bên dưới khi section tổng hợp đang hiển thị
  useEffect(() => {
    if (!isSectionVisible) return;

    const container = triggerRef.current;
    const allVideos = Array.from(document.querySelectorAll("video"));
    const pausedVideos = allVideos.filter(
      (el) => !container?.contains(el) && !el.paused,
    );

    pausedVideos.forEach((el) => el.pause());

    return () => {
      pausedVideos.forEach((el) => {
        el.play().catch(() => {});
      });
    };
  }, [isSectionVisible]);

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <>
      <SectionWrapper
        id="overview"
        curtain="cover"
        layer={4}
        innerClassName="justify-center pt-14 pb-4 sm:pt-16 sm:pb-6"
        noPadding
      >
        <TvStaticBackdrop intensity="normal" className="z-0" />

        <div
          ref={triggerRef}
          className="relative z-10 my-auto flex w-full flex-col justify-center"
        >
          <FilmstripTrack
            items={FILMSTRIP_REEL_ITEMS}
            direction="left"
            isSectionVisible={isSectionVisible}
            onSelectVideo={setSelectedVideo}
          />
        </div>
      </SectionWrapper>

      <CinemaScreeningModal video={selectedVideo} onClose={handleCloseModal} />
    </>
  );
}
