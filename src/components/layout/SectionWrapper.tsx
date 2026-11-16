"use client";

import { motion } from "framer-motion";
import { StageBackground } from "@/components/ui/StageBackground";
import type { SectionWrapperProps } from "@/types/section";

export function SectionWrapper({
  id,
  children,
  curtain = "stack",
  layer = 1,
  backgroundVariant = "standard",
  className = "",
  innerClassName = "",
  noPadding = false,
}: SectionWrapperProps) {
  // Khóa layer tối đa = 5 -> z-index tối đa = 10 + 5 * 5 = 35 (luôn dưới Header z-50)
  const clampedLayer = Math.min(Math.max(Math.floor(layer), 0), 5);
  const zIndex = curtain === "base" ? 0 : 10 + clampedLayer * 5;

  const positioningClass =
    curtain === "base"
      ? "relative lg:sticky lg:top-0 min-h-dvh"
      : curtain === "stack"
        ? "relative lg:sticky lg:top-0 min-h-dvh"
        : "relative min-h-dvh";

  const paddingClass = noPadding ? "" : "pt-24 pb-12";

  return (
    <section
      id={id}
      data-section-wrapper="true"
      data-z-index={zIndex}
      style={{ zIndex }}
      className={`w-full overflow-clip bg-[var(--background)] text-[var(--text-primary)] ${positioningClass} ${className}`}
    >
      {/* Nền chuyên biệt: standard (trang thường) hoặc cinema (đỏ quẹt cọ + nửa đĩa CV xoay) */}
      <StageBackground variant={backgroundVariant} />

      {/* Đường phân tách màn trập 1px ở mép trên các lớp trồi lên */}
      {curtain !== "base" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[1px] bg-[var(--border-strong)]"
        />
      )}

      {/* Một lớp bọc GPU duy nhất (opacity + translate3d) cho toàn section */}
      {curtain === "base" ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 flex min-h-dvh w-full flex-col justify-between ${paddingClass} ${innerClassName}`}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 flex min-h-dvh w-full flex-col justify-between ${paddingClass} ${innerClassName}`}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
