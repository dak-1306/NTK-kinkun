"use client";

import { useEffect, useState } from "react";
import { CdDisc } from "@/components/ui/CdDisc";
import { Container } from "@/components/layout/Container";
import { useAssetPreloader } from "@/hooks/useAssetPreloader";
import { SPLASH_COPY } from "@/constants/splash";

export function SplashScreen() {
  const { isReadyToExit, barRef, percentRef, statusRef } = useAssetPreloader();
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    if (isUnmounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isUnmounted]);

  useEffect(() => {
    if (!isReadyToExit) return;
    const timer = window.setTimeout(() => {
      document.body.style.overflow = "";
      setIsUnmounted(true);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [isReadyToExit]);

  if (isUnmounted) return null;

  return (
    <div
      aria-hidden={isReadyToExit}
      style={{
        transform: isReadyToExit
          ? "translate3d(0, -100%, 0)"
          : "translate3d(0, 0, 0)",
      }}
      className="fixed inset-0 z-[60] flex flex-col justify-between bg-[#050505] py-8 transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] will-change-transform"
    >
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-[var(--accent)]" />

      {/* Phần trăm tải ở góc trên bên phải */}
      <Container className="flex justify-end font-mono text-xs tracking-[0.2em] text-[var(--text-primary)]">
        <span ref={percentRef}>000%</span>
      </Container>

      {/* Trung tâm: P[ĐĨA CV XOAY]RTFOLIO */}
      <Container className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center select-none">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-10vw] top-1/2 h-[1px] -translate-y-1/2 bg-[var(--border)]"
          />
          <div className="relative z-10 flex items-center text-[clamp(2.5rem,11vw,8.5rem)] font-bold leading-none tracking-[-0.04em] text-[var(--text-primary)]">
            <span>{SPLASH_COPY.prefixChar}</span>
            <span className="mx-[0.03em] inline-flex items-center justify-center">
              <CdDisc variant="splash" />
            </span>
            <span>{SPLASH_COPY.suffixText}</span>
          </div>
        </div>
      </Container>

      {/* Thanh tiến trình tải thực tế */}
      <Container className="space-y-2.5">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <span ref={statusRef}>{SPLASH_COPY.fontLoadLabel}</span>
        </div>

        <div
          role="progressbar"
          aria-label={SPLASH_COPY.progressAriaLabel}
          className="h-[2px] w-full overflow-clip bg-[var(--border)]"
        >
          <div
            ref={barRef}
            style={{ transform: "scale3d(0, 1, 1)" }}
            className="h-full w-full origin-left bg-[var(--accent)] will-change-transform"
          />
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[1px] bg-[var(--border-strong)]" />
    </div>
  );
}
