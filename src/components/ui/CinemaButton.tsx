"use client";

import { UI_LABELS } from "@/constants/ui";

interface CinemaButtonProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
  href?: string;
  download?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
}

export function CinemaButton({
  label,
  size = "md",
  isActive = false,
  href,
  download,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}: CinemaButtonProps) {
  const discSizeClass =
    size === "lg"
      ? "h-20 w-20 sm:h-24 sm:w-24"
      : size === "sm"
        ? "h-9 w-9 sm:h-10 sm:w-10"
        : "h-16 w-16 sm:h-20 sm:w-20";

  const layoutClass = size === "sm" ? "gap-2.5 pr-1" : "gap-4";

  const labelSizeClass =
    size === "sm" ? "text-[11px] sm:text-xs" : "text-xs sm:text-sm";

  const sharedClassName = `group inline-flex cursor-pointer items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${layoutClass} ${className}`;

  const buttonContent = (
    <>
      {/* ĐĨA CV TRÒN THUẦN TÚY (KHÔNG ICON THỪA Ở TÂM) */}
      <span
        className={`relative inline-flex shrink-0 items-center justify-center overflow-clip rounded-full border transition-colors duration-200 ${discSizeClass} ${
          isActive
            ? "border-[var(--accent)]"
            : "border-[var(--border-strong)] group-hover:border-[var(--accent)]"
        }`}
      >
        {/* Mặt đĩa phản quang xoay thuần GPU */}
        <span
          aria-hidden="true"
          className="animate-disc-project absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 15deg,
              #09090b 0deg,
              #27272a 38deg,
              #8a0303 70deg,
              #e4e4e7 86deg,
              #09090b 118deg,
              #1c1c21 178deg,
              #b8041c 228deg,
              #f4f4f5 245deg,
              #09090b 282deg,
              #4a0108 326deg,
              #09090b 360deg
            )`,
          }}
        >
          {/* Rãnh dữ liệu đồng tâm */}
          <span className="absolute inset-[13%] rounded-full border border-white/15" />
          <span className="absolute inset-[22%] rounded-full border border-[#d90429]/40" />
          {/* Vạch đánh dấu chuyển động xoay trên mặt đĩa */}
          <span className="absolute top-[7%] left-1/2 h-2 w-[1px] -translate-x-1/2 bg-white/75" />
          <span className="absolute bottom-[7%] left-1/2 h-2 w-[1px] -translate-x-1/2 bg-[var(--accent)]" />
        </span>

        {/* Lớp phản quang ánh sáng tĩnh phía trên */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-70 mix-blend-screen"
          style={{
            background: `conic-gradient(
              from -35deg,
              transparent 0deg,
              rgba(217, 4, 41, 0.45) 35deg,
              rgba(255, 255, 255, 0.25) 50deg,
              transparent 80deg,
              transparent 200deg,
              rgba(217, 4, 41, 0.35) 230deg,
              transparent 270deg
            )`,
          }}
        />

        {/* Vòng kẹp trung tâm (Hub Ring) & Lỗ trục đĩa sạch sẽ */}
        <span
          aria-hidden="true"
          className="pointer-events-none relative z-10 flex h-[34%] w-[34%] items-center justify-center rounded-full border border-white/25 bg-[#0a0a0d]/95"
        >
          <span className="h-[46%] w-[46%] rounded-full border border-white/30 bg-[#050505]" />
        </span>
      </span>

      {/* Nhãn hành động bên cạnh */}
      {label && (
        <span
          className={`font-mono font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)] transition-colors duration-150 group-hover:text-[var(--text-primary)] ${labelSizeClass}`}
        >
          {label}
        </span>
      )}
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        download={download}
        onClick={onClick}
        aria-label={ariaLabel ?? label ?? UI_LABELS.button.nextSection}
        className={sharedClassName}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={ariaLabel ?? label ?? UI_LABELS.button.nextSection}
      className={sharedClassName}
    >
      {buttonContent}
    </button>
  );
}
