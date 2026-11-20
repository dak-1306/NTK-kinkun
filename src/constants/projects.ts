import { PORTFOLIO_VIDEOS } from "./assets";
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
        title: PORTFOLIO_VIDEOS.badChoices.title,
        previewVideoUrl: PORTFOLIO_VIDEOS.badChoices.videoUrl,
        fullVideoUrl: PORTFOLIO_VIDEOS.badChoices.videoUrl,
        driveUrl: PORTFOLIO_VIDEOS.badChoices.driveUrl,
        isFeatured: true,
      },
      {
        id: "p1-02",
        title: PORTFOLIO_VIDEOS.finalCut.title,
        previewVideoUrl: PORTFOLIO_VIDEOS.finalCut.videoUrl,
        fullVideoUrl: PORTFOLIO_VIDEOS.finalCut.videoUrl,
        driveUrl: PORTFOLIO_VIDEOS.finalCut.driveUrl,
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
        title: PORTFOLIO_VIDEOS.dakiTeam.title,
        previewVideoUrl: PORTFOLIO_VIDEOS.dakiTeam.videoUrl,
        fullVideoUrl: PORTFOLIO_VIDEOS.dakiTeam.videoUrl,
        driveUrl: PORTFOLIO_VIDEOS.dakiTeam.driveUrl,
        isFeatured: true,
      },
    ],
  },
] as const;
