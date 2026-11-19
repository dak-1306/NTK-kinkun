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
 * Ghép đường dẫn file với GitHub Releases CDN.
 * Nếu truyền sẵn URL đầy đủ (https://...) sẽ giữ nguyên.
 */
export function getMediaUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return MEDIA_CDN_BASE ? `${MEDIA_CDN_BASE}${normalizedPath}` : normalizedPath;
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
    label: "ĐANG NẠP CUỘN PHIM 01",
    src: getMediaUrl("/badchoices.45.mp4"),
    type: "video-meta",
  },
  {
    id: "video-meta-02",
    label: "ĐANG NẠP CUỘN PHIM 02",
    src: getMediaUrl("/final.mp4"),
    type: "video-meta",
  },
  {
    id: "video-meta-03",
    label: "ĐANG NẠP CUỘN PHIM MV",
    src: getMediaUrl("/the.Daki.team.mp4"),
    type: "video-meta",
  },
] as const;

export const CV_ASSET = {
  href: "/media/cv/Nguyen-Trung-Kien-CV.pdf",
  downloadName: "Nguyen-Trung-Kien-CV.pdf",
} as const;
