"use client";

import { useEffect } from "react";
import { enqueuePoolWarmup } from "@/lib/sharedVideoPool";
import { PROJECT_GENRES } from "@/constants/projects";

export function VideoWarmupTrigger() {
  useEffect(() => {
    const urls = Array.from(
      new Set(
        PROJECT_GENRES.flatMap((genre) =>
          genre.items.map((item) => item.fullVideoUrl),
        ),
      ),
    );

    const timer = window.setTimeout(() => {
      enqueuePoolWarmup(urls);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
