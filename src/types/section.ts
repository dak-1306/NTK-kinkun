export type CurtainMode = "base" | "stack" | "cover";

export type BackgroundVariant = "standard" | "cinema";

export type DiscVariant = "splash" | "half" | "project";

export interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  curtain?: CurtainMode;
  /** Giới hạn từ 0 đến 5 để đảm bảo z-index <= 35 (luôn dưới Header z-50) */
  layer?: number;
  backgroundVariant?: BackgroundVariant;
  className?: string;
  innerClassName?: string;
  /** Tắt padding mặc định nếu section tự quản lý khung hình toàn màn */
  noPadding?: boolean;
}
