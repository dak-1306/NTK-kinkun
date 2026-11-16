export interface PreloadAssetItem {
  id: string;
  label: string;
  src: string;
  type: "image" | "video-meta";
}

export const PORTRAIT_ASSET = {
  src: "/media/posters/portrait.webp",
  alt: "Chân dung Nguyễn Trung Kiên",
  fallbackInitials: "NTK",
} as const;

export const CRITICAL_ASSETS: readonly PreloadAssetItem[] = [
  {
    id: "portrait",
    label: "ĐANG TẢI HÌNH ẢNH",
    src: PORTRAIT_ASSET.src,
    type: "image",
  },
  {
    id: "video-meta-01",
    label: "ĐANG ĐỒNG BỘ DỮ LIỆU PHIM",
    src: "/media/videos/projects/project-01.mp4",
    type: "video-meta",
  },
] as const;

export const CV_ASSET = {
  href: "/media/cv/Nguyen-Trung-Kien-CV.pdf",
  downloadName: "Nguyen-Trung-Kien-CV.pdf",
} as const;
