import { PORTFOLIO_VIDEOS } from "./assets";
import type { ProjectVideoItem } from "@/types/project";

export const FILMSTRIP_UI_LABELS = {
  openFramePrefix: "Mở khung hình",
} as const;

export const FILMSTRIP_REEL_ITEMS: readonly ProjectVideoItem[] = Object.entries(
  PORTFOLIO_VIDEOS,
).map(([key, item], index) => ({
  id: `fs-0${index + 1}-${key}`,
  title: item.title,
  previewVideoUrl: item.videoUrl,
  fullVideoUrl: item.videoUrl,
  driveUrl: item.driveUrl,
}));
