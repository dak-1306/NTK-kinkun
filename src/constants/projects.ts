import { getMediaUrl } from "./assets";
import type { ProjectGenreSectionData } from "@/types/project";

export const PROJECT_UI_LABELS = {
  openVideoPrefix: "Mở phim",
  videoState: {
    loadingPreview: "ĐANG TẢI VIDEO...",
    loadingTheater: "ĐANG NẠP TÍN HIỆU PHIM...",
    errorCode: "MẤT TÍN HIỆU",
    errorTitle: "KHÔNG THỂ PHÁT VIDEO",
    errorDescription: "Tệp nguồn chưa sẵn sàng hoặc kết nối bị gián đoạn.",
    retryLabel: "THỬ TẢI LẠI",
  },
  modal: {
    dialogAriaLabel: "Phòng chiếu video toàn màn hình",
    closeLabel: "ĐÓNG",
    closeAriaLabel: "Đóng phòng chiếu video",
    muteLabel: "TẮT TIẾNG",
    unmuteLabel: "BẬT TIẾNG",
    playLabel: "PHÁT",
    pauseLabel: "TẠM DỪNG",
    driveLabel: "BẢN GỐC DRIVE",
    driveShortLabel: "DRIVE",
    driveAriaLabel: "Mở video bản gốc trên Google Drive trong tab mới",
    shortcutHint: "NHẤN ESC ĐỂ THOÁT • SPACE ĐỂ TẠM DỪNG",
    sliderAriaLabel: "Thanh tua tiến trình video",
  },
} as const;

const VIDEO_BADCHOICES = getMediaUrl("/badchoices.45.mp4");
const VIDEO_FINAL = getMediaUrl("/final.mp4");
const VIDEO_DAKI = getMediaUrl("/the.Daki.team.mp4");

const DRIVE_BADCHOICES =
  "https://drive.google.com/file/d/1M4baBZaZyAdW2DZ9b34Sl11-1fHN2euk/view?usp=drive_link";
const DRIVE_FINAL =
  "https://drive.google.com/file/d/1n5Yib6md7b9L1cBFICAMy9XTlg-IqTxb/view?usp=drive_link";
const DRIVE_DAKI =
  "https://drive.google.com/file/d/1R9yU3YUBBzHKtOwlAbwOjm4cBcmDjnP5/view?usp=drive_link";

export const PROJECT_GENRES: readonly ProjectGenreSectionData[] = [
  {
    id: "project-01",
    layer: 1,
    indexCode: "02",
    genreTitle: "iTVC",
    layoutVariant: "duo",
    discSide: "right",
    items: [
      {
        id: "p1-01",

        title: "BAD CHOICES",

        previewVideoUrl: VIDEO_BADCHOICES,
        fullVideoUrl: VIDEO_BADCHOICES,
        driveUrl: DRIVE_BADCHOICES,
        isFeatured: true,
      },
      {
        id: "p1-02",

        title: "FINAL CUT",

        previewVideoUrl: VIDEO_FINAL,
        fullVideoUrl: VIDEO_FINAL,
        driveUrl: DRIVE_FINAL,
      },
    ],
  },
  {
    id: "project-mv",
    layer: 2,
    indexCode: "03",
    genreTitle: "MV",
    layoutVariant: "single",
    discSide: "left",
    items: [
      {
        id: "mv-01",

        title: "THE DAKI TEAM",

        previewVideoUrl: VIDEO_DAKI,
        fullVideoUrl: VIDEO_DAKI,
        driveUrl: DRIVE_DAKI,
        isFeatured: true,
      },
    ],
  },
] as const;
