"use client";

import { useMemo } from "react";
import { useBackgroundVideoWarmup } from "@/hooks/useBackgroundVideoWarmup";
import { PROJECT_GENRES } from "@/constants/projects";

export function VideoWarmupTrigger() {
  const videoUrls = useMemo(
    () =>
      PROJECT_GENRES.flatMap((genre) =>
        genre.items.map((item) => item.previewVideoUrl),
      ),
    [],
  );

  useBackgroundVideoWarmup(videoUrls, true);
  return null;
}
