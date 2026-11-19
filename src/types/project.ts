export type ProjectGridLayout =
  | "single"
  | "duo"
  | "featured-left"
  | "triptych"
  | "featured-right";

export type DiscSlideDirection = "left" | "right";

export interface ProjectVideoItem {
  id: string;

  title: string;

  previewVideoUrl: string;
  fullVideoUrl: string;
  /** Đường dẫn Google Drive lưu bản gốc chất lượng cao (tùy chọn) */
  driveUrl?: string;
  isFeatured?: boolean;
}

export interface ProjectGenreSectionData {
  id: string;
  layer: number;
  indexCode: string;
  genreTitle: string;
  layoutVariant: ProjectGridLayout;
  discSide: DiscSlideDirection;
  items: readonly ProjectVideoItem[];
}
