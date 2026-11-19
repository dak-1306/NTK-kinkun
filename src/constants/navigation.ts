export interface NavNodeItem {
  id: string;
  href: string;
  index: string;
  label: string;
}

export interface NavigationData {
  ariaLabel: string;
  progressAriaLabel: string;
  nodes: readonly NavNodeItem[];
}

export const NAV_DATA: NavigationData = {
  ariaLabel: "Điều hướng các phân đoạn trang",
  progressAriaLabel: "Tiến trình cuộn trang",
  nodes: [
    {
      id: "about",
      href: "#about",
      index: "01",
      label: "GIỚI THIỆU",
    },
    {
      id: "skills",
      href: "#skills",
      index: "05",
      label: "KỸ NĂNG",
    },
    {
      id: "project-01",
      href: "#project-01",
      index: "02",
      label: "DỰ ÁN",
    },
    {
      id: "project-mv",
      href: "#project-mv",
      index: "03",
      label: "MV",
    },
    {
      id: "overview",
      href: "#overview",
      index: "04",
      label: "LƯU TRỮ",
    },
  ],
} as const;
