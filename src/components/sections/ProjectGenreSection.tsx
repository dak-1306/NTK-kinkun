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
    case "triptych":
      return "grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 lg:grid-rows-1";
    case "featured-right":
    case "featured-left":
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2";
  }
}

function getGridCellClass(layout: ProjectGridLayout, index: number): string {
  if (layout === "triptych") {
    return "aspect-video sm:aspect-auto sm:h-[320px] lg:h-full";
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
  // Dành sẵn khoảng trống phía hướng đĩa trượt ra ngoài để đĩa lớn không bị cắt mép
  const discEjectionPadding =
    data.discSide === "right"
      ? "p-4 pr-12 sm:p-5 sm:pr-16 lg:p-6 lg:pr-24"
      : "p-4 pl-12 sm:p-5 sm:pl-16 lg:p-6 lg:pl-24";

  return (
    <SectionWrapper
      id={data.id}
      curtain="stack"
      layer={data.layer}
      backgroundVariant="cinema"
      innerClassName="justify-center pt-16 pb-6 lg:pt-20 lg:pb-6"
      noPadding
    >
      <Container className="my-auto">
        <div className="flex flex-col gap-4 lg:h-[min(74dvh,640px)] lg:flex-row lg:items-stretch lg:gap-6">
          {/* CỘT TRÁI: CHỈ GIỮ DUY NHẤT TIÊU ĐỀ THỂ LOẠI NẰM DỌC */}
          <div className="flex shrink-0 items-center border-b border-[var(--border)] pb-3 lg:w-14 lg:justify-center lg:border-r lg:border-b-0 lg:pr-4 lg:pb-0 xl:w-16">
            <h2 className="text-lg font-bold uppercase tracking-wider text-[var(--text-primary)] sm:text-2xl lg:whitespace-nowrap lg:text-2xl lg:tracking-[0.16em] lg:[writing-mode:vertical-rl] lg:rotate-180">
              {data.genreTitle}
            </h2>
          </div>

          {/* CỘT PHẢI: DÒNG CHỮ MỜ TRÊN GÓC PHẢI + KHUNG CHIẾU VIDEO RỘNG TỐI ĐA */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Dòng text phụ nằm bên phải phía trên khung preview */}
            <div className="mb-2.5 flex justify-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)] sm:text-[11px]">
                {data.genreSub}
              </span>
            </div>

            {/* Khung chiếu phim lớn */}
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

              {/* Lưới các ô preview với khoảng cách rộng rãi hơn */}
              <div
                className={`grid flex-1 gap-4 sm:gap-5 lg:gap-6 ${getGridContainerClass(
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
