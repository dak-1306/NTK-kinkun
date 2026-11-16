"use client";

import { memo, useId } from "react";
import { CdDisc } from "./CdDisc";
import { StudioLightProp } from "./StudioLightProp";
import { CinemaCameraProp } from "./CinemaCameraProp";
import type { BackgroundVariant } from "@/types/section";

interface StageBackgroundProps {
  variant?: BackgroundVariant;
}

export const StageBackground = memo(function StageBackground({
  variant = "standard",
}: StageBackgroundProps) {
  const uid = useId();
  const trackClipId = `${uid}-film-track`;

  if (variant === "standard") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-clip bg-[#050505]"
      >
        {/* 1. LƯỚI TRỤC KIẾN TRÚC 1PX CỰC MẢNH */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "25% 100%",
          }}
        />

        {/* 2. GÓC TRÊN BÊN TRÁI: ĐÈN QUAY PHIM FRESNEL STUDIO */}
        <StudioLightProp className="absolute top-12 left-2 w-[230px] opacity-65 sm:top-14 sm:left-6 sm:w-[290px] lg:w-[330px]" />

        {/* 3. GÓC DƯỚI BÊN TRÁI: MÁY QUAY PHIM 35MM CINEMA RIG */}
        <CinemaCameraProp className="absolute bottom-4 left-2 w-[240px] opacity-65 sm:bottom-6 sm:left-6 sm:w-[300px] lg:w-[340px]" />

        {/* 4. BÊN PHẢI: CHÍNH XÁC 1 NỬA ĐĨA CV XOAY TINH TẾ */}
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 opacity-45 sm:opacity-55">
          <CdDisc variant="half" />
        </div>

        {/* 5. ĐƯỜNG TÂM NGẮM TĨNH BÊN PHẢI */}
        <div className="absolute inset-y-0 right-[12%] hidden w-[1px] bg-white/[0.06] sm:block" />
        <div
          className="absolute top-1/2 right-[12%] hidden h-3.5 w-3.5 translate-x-1/2 -translate-y-1/2 sm:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent 46%, rgba(217,4,41,0.65) 46%, rgba(217,4,41,0.65) 54%, transparent 54%), linear-gradient(to bottom, transparent 46%, rgba(217,4,41,0.65) 46%, rgba(217,4,41,0.65) 54%, transparent 54%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-clip bg-[#050505]"
    >
      {/* 1. DẢI NEO ĐỎ THẪM DỌC BÊN TRÁI TẠO ĐIỂM TỰA CHO TIÊU ĐỀ THỂ LOẠI */}
      <div
        className="absolute inset-y-0 left-0 w-[220px] sm:w-[320px] lg:w-[380px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(110, 2, 9, 0.24) 0%, rgba(110, 2, 9, 0.06) 55%, transparent 100%)",
        }}
      />
      <div className="absolute inset-y-0 left-0 w-[2px] bg-[var(--accent)]/65" />

      {/* 2. LƯỚI KHUNG NGẮM PHÒNG TỐI 1PX (TÔN TỐI ĐA MÀU SẮC VIDEO) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "33.333% 50%",
        }}
      />

      {/* 3. DẢI RĂNG CƯA PHIM 35MM TRƯỢT DỌC CỰC MẢNH Ở SÁT MÉP PHẢI */}
      <div className="absolute inset-y-0 right-2 hidden w-4 sm:block lg:right-4">
        <div className="absolute inset-y-0 left-0 w-[1px] bg-white/[0.08]" />
        <div className="absolute inset-y-0 right-0 w-[1px] bg-white/[0.08]" />
        <svg
          viewBox="0 0 16 1000"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <clipPath id={trackClipId}>
              <rect x="0" y="0" width="16" height="1000" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${trackClipId})`}>
            <line
              x1="8"
              y1="-24"
              x2="8"
              y2="1048"
              stroke="rgba(217, 4, 41, 0.42)"
              strokeWidth="3"
              strokeDasharray="5 19"
              className="animate-film-track-vertical"
            />
          </g>
        </svg>
      </div>

      {/* 4. DẤU TÂM NGẮM GÓC KHUNG CHIẾU */}
      <div className="absolute top-8 right-8 h-3 w-3 border-t border-r border-white/20" />
      <div className="absolute bottom-8 right-8 h-3 w-3 border-b border-r border-white/20" />
    </div>
  );
});
