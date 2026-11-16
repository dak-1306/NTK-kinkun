export interface ProgressNode {
  id: string;
  index: string;
  label: string;
  href: string;
}

export const NAV_DATA = {
  ariaLabel: "Thanh tiến trình và điều hướng các phần",
  progressAriaLabel: "Tiến trình xem trang",
  nodes: [
    { id: "about", index: "01", label: "GIỚI THIỆU", href: "#about" },
    { id: "project-01", index: "02", label: "DỰ ÁN 01", href: "#project-01" },
    { id: "project-02", index: "03", label: "DỰ ÁN 02", href: "#project-02" },
    { id: "project-03", index: "04", label: "DỰ ÁN 03", href: "#project-03" },
    { id: "filmstrip", index: "05", label: "CUỘN PHIM", href: "#filmstrip" },
  ] as readonly ProgressNode[],
} as const;
