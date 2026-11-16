export type ProjectGridLayout = "featured-left" | "triptych" | "featured-right";

export type DiscSlideDirection = "right" | "left";

export interface ProjectVideoItem {
  id: string;
  sceneCode: string;
  title: string;
  duration: string;
  year: string;
  previewVideoUrl: string;
  fullVideoUrl: string;
  isFeatured?: boolean;
}

export interface ProjectGenreSectionData {
  id: string;
  layer: number;
  indexCode: string;
  genreTitle: string;
  genreSub: string;
  layoutVariant: ProjectGridLayout;
  discSide: DiscSlideDirection;
  items: readonly ProjectVideoItem[];
}
