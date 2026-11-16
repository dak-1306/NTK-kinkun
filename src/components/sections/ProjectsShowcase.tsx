"use client";

import { useCallback, useState } from "react";
import { ProjectGenreSection } from "./ProjectGenreSection";
import { CinemaScreeningModal } from "@/components/ui/CinemaScreeningModal";
import { PROJECT_GENRES } from "@/constants/projects";
import type { ProjectVideoItem } from "@/types/project";

export function ProjectsShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<ProjectVideoItem | null>(
    null,
  );

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <>
      {PROJECT_GENRES.map((genre) => (
        <ProjectGenreSection
          key={genre.id}
          data={genre}
          onSelectVideo={setSelectedVideo}
        />
      ))}

      <CinemaScreeningModal video={selectedVideo} onClose={handleCloseModal} />
    </>
  );
}
