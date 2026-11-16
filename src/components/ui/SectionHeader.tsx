"use client";

import { memo, useId } from "react";

interface SectionHeaderProps {
  title: string;
  badge?: string;
  description?: string;
  className?: string;
}

export const SectionHeader = memo(function SectionHeader({
  title,
  badge,
  description,
  className = "",
}: SectionHeaderProps) {
  const gradientId = useId();

  return (
    <header
      className={`mb-6 flex flex-col justify-between gap-3 border-b border-[var(--border)] pb-4 sm:mb-8 lg:flex-row lg:items-end ${className}`}
    >
      <div className="space-y-2">
        {badge && (
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <span className="inline-block h-1.5 w-1.5 bg-[var(--accent)]" />
            <span>{badge}</span>
          </div>
        )}

        <div className="relative inline-block">
          {/* Vệt cọ đỏ mềm mại quét ngang sau tiêu đề */}
          <svg
            aria-hidden="true"
            viewBox="0 0 640 110"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -inset-x-5 top-1/2 -z-10 h-[115%] w-[calc(100%+40px)] -translate-y-1/2"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6e0209" stopOpacity="0" />
                <stop offset="14%" stopColor="#8a030c" stopOpacity="0.72" />
                <stop offset="52%" stopColor="#c80815" stopOpacity="0.85" />
                <stop offset="86%" stopColor="#8a030c" stopOpacity="0.68" />
                <stop offset="100%" stopColor="#6e0209" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M12,46 C140,22 330,18 510,28 C575,32 615,40 632,48 C610,68 540,84 430,86 C270,88 120,82 16,66 C4,62 2,52 12,46 Z"
              fill={`url(#${gradientId})`}
            />
            <path
              d="M38,42 C185,28 415,34 602,44 C580,62 430,72 240,68 C135,66 65,60 28,52 Z"
              fill="#d90429"
              opacity="0.38"
            />
            <path
              d="M75,78 C220,74 420,76 565,70 C435,81 225,83 75,78 Z"
              fill="#b8041c"
              opacity="0.45"
            />
          </svg>

          <h2 className="relative z-10 text-xl font-bold uppercase tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>
      </div>

      {description && (
        <p className="max-w-sm text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm lg:text-right">
          {description}
        </p>
      )}
    </header>
  );
});
