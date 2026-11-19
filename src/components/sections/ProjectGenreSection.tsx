"use client";

import { memo } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { ProjectPreviewCard } from "@/components/ui/ProjectPreviewCard";
import type {
  ProjectGenreSectionData,
  ProjectGridLayout,
  ProjectVideoItem,
} from "@/types/project";

interface ProjectGenreSectionProps {
  data: ProjectGenreSectionData;
  onSelectVideo: (video: ProjectVideoItem) => void;
}

function getGridContainerClass(layout: ProjectGridLayout): string {
  switch (layout) {
    case "single":
      return "grid-cols-1 place-items-center";
    case "duo":
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-1";
    case "triptych":
      return "grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 lg:grid-rows-1";
    case "featured-right":
    case "featured-left":
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2";
  }
}

function getGridCellClass(layout: ProjectGridLayout, index: number): string {
  if (layout === "single") {
    return "aspect-video w-full max-w-[700px]";
  }

  if (layout === "duo") {
    return "aspect-video md:aspect-auto md:h-[260px] lg:h-full";
  }

  if (layout === "triptych") {
    return "aspect-video sm:aspect-auto sm:h-[290px] lg:h-full";
  }

  if (layout === "featured-left") {
    if (index === 0) {
      return "aspect-video sm:col-span-2 lg:col-span-7 lg:row-span-2 lg:aspect-auto lg:h-full";
    }
    return "aspect-video lg:col-span-5 lg:row-span-1 lg:aspect-auto lg:h-full";
  }

  if (index === 2) {
    return "aspect-video sm:col-span-2 lg:col-start-6 lg:col-span-7 lg:row-start-1 lg:row-span-2 lg:aspect-auto lg:h-full";
  }
  return "aspect-video lg:col-span-5 lg:row-span-1 lg:aspect-auto lg:h-full";
}

export const ProjectGenreSection = memo(function ProjectGenreSection({
  data,
  onSelectVideo,
}: ProjectGenreSectionProps) {
  const discEjectionPadding =
    data.discSide === "right"
      ? "p-3.5 pr-16 sm:p-5 sm:pr-20 lg:p-6 lg:pr-24"
      : "p-3.5 pl-16 sm:p-5 sm:pl-20 lg:p-6 lg:pl-24";

  return (
    <SectionWrapper
      id={data.id}
      curtain="stack"
      layer={data.layer}
      backgroundVariant="cinema"
      innerClassName="items-center justify-center pt-16 pb-6 sm:pt-20 sm:pb-8"
      noPadding
    >
      <Container className="my-auto flex items-center justify-center">
        <div className="flex w-full max-w-[1160px] flex-col gap-4 lg:h-[min(64dvh,540px)] lg:flex-row lg:items-center lg:justify-center lg:gap-8">
          {/* CỘT TRÁI: TIÊU ĐỀ THỂ LOẠI CĂN GIỮA CÂN ĐỐI */}
          <div className="flex shrink-0 items-center justify-center border-b border-[var(--border)] pb-3 text-center lg:h-full lg:w-16 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
            <h2 className="text-base font-bold tracking-wider text-[var(--text-primary)] sm:text-xl lg:whitespace-nowrap lg:text-2xl lg:tracking-[0.16em] lg:[writing-mode:vertical-rl] lg:rotate-180">
              {data.genreTitle}
            </h2>
          </div>

          {/* CỘT PHẢI: KHUNG CHIẾU VIDEO CÂN ĐỐI */}
          <div className="flex min-w-0 flex-1 flex-col lg:h-full">
            <div
              className={`relative flex flex-1 flex-col border border-[var(--border-strong)] bg-[#060608]/90 ${discEjectionPadding}`}
            >
              {/* Dấu tâm ngắm 4 góc khung chiếu */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-[1px] -left-[1px] h-2.5 w-2.5 border-t-2 border-l-2 border-[var(--accent)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-[1px] -right-[1px] h-2.5 w-2.5 border-t-2 border-r-2 border-[var(--accent)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[1px] -left-[1px] h-2.5 w-2.5 border-b-2 border-l-2 border-[var(--accent)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-2.5 w-2.5 border-b-2 border-r-2 border-[var(--accent)]"
              />

              {/* Lưới các ô preview */}
              <div
                className={`grid flex-1 gap-4 sm:gap-5 lg:gap-7 ${getGridContainerClass(
                  data.layoutVariant,
                )}`}
              >
                {data.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={getGridCellClass(data.layoutVariant, idx)}
                  >
                    <ProjectPreviewCard
                      item={item}
                      discSide={data.discSide}
                      onSelect={onSelectVideo}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
});
