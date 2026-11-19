import { getMediaUrl } from "./assets";
import type { ProjectVideoItem } from "@/types/project";

export const FILMSTRIP_UI_LABELS = {
  openFramePrefix: "Mở khung hình",
} as const;

const VIDEO_BADCHOICES = getMediaUrl("/badchoices.45.mp4");
const VIDEO_FINAL = getMediaUrl("/final.mp4");
const VIDEO_DAKI = getMediaUrl("/the.Daki.team.mp4");

const DRIVE_BADCHOICES =
  "https://drive.google.com/file/d/THAY_ID_BADCHOICES/view";
const DRIVE_FINAL = "https://drive.google.com/file/d/THAY_ID_FINAL/view";
const DRIVE_DAKI = "https://drive.google.com/file/d/THAY_ID_DAKI/view";

export const FILMSTRIP_REEL_ITEMS: readonly ProjectVideoItem[] = [
  {
    id: "fs-01",
    title: "BAD CHOICES",

    previewVideoUrl: VIDEO_BADCHOICES,
    fullVideoUrl: VIDEO_BADCHOICES,
    driveUrl: DRIVE_BADCHOICES,
  },
  {
    id: "fs-02",
    
    title: "FINAL CUT",


    previewVideoUrl: VIDEO_FINAL,
    fullVideoUrl: VIDEO_FINAL,
    driveUrl: DRIVE_FINAL,
  },
  {
    id: "fs-03",
   
    title: "THE DAKI TEAM",

    previewVideoUrl: VIDEO_DAKI,
    fullVideoUrl: VIDEO_DAKI,
    driveUrl: DRIVE_DAKI,
  },
] as const;
