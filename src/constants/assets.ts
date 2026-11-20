export interface PreloadAssetItem {
  id: string;
  label: string;
  src: string;
  type: "image" | "video-meta";
}

const MEDIA_CDN_BASE = (process.env.NEXT_PUBLIC_MEDIA_CDN_URL ?? "").replace(
  /\/$/,
  "",
);

/**
 * Ghép đường dẫn file với Cloudinary CDN.
 * Nếu truyền sẵn URL đầy đủ (https://...) sẽ giữ nguyên.
 */
export function getMediaUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return MEDIA_CDN_BASE ? `${MEDIA_CDN_BASE}${normalizedPath}` : normalizedPath;
}

/**
 * NGUỒN DỮ LIỆU GỐC CHO TOÀN BỘ VIDEO
 * Sau này đổi link video, tên phim hay link Drive chỉ cần sửa đúng tại đây.
 */
export const PORTFOLIO_VIDEOS = {
  badChoices: {
    title: "BAD CHOICES",
    preloadLabel: "ĐANG NẠP CUỘN PHIM 01",
    videoUrl: getMediaUrl("/badchoices_45_jygs2l.mp4"),
    driveUrl:
      "https://drive.google.com/file/d/1M4baBZaZyAdW2DZ9b34Sl11-1fHN2euk/view?usp=drive_link",
  },
  finalCut: {
    title: "FINAL CUT",
    preloadLabel: "ĐANG NẠP CUỘN PHIM 02",
    videoUrl: getMediaUrl("/final_nrky8d.mp4"),
    driveUrl:
      "https://drive.google.com/file/d/1n5Yib6md7b9L1cBFICAMy9XTlg-IqTxb/view?usp=drive_link",
  },
  dakiTeam: {
    title: "THE DAKI TEAM",
    preloadLabel: "ĐANG NẠP CUỘN PHIM MV",
    videoUrl: getMediaUrl("/the_Daki_team_jck9ip.mp4"),
    driveUrl:
      "https://drive.google.com/file/d/1R9yU3YUBBzHKtOwlAbwOjm4cBcmDjnP5/view?usp=drive_link",
  },
} as const;

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
  ...Object.entries(PORTFOLIO_VIDEOS).map(([key, item], index) => ({
    id: `video-meta-0${index + 1}-${key}`,
    label: item.preloadLabel,
    src: item.videoUrl,
    type: "video-meta" as const,
  })),
] as const;

export const CV_ASSET = {
  href: "/media/cv/Nguyen-Trung-Kien-CV.pdf",
  downloadName: "Nguyen-Trung-Kien-CV.pdf",
} as const;
