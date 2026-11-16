"use client";

import { memo } from "react";
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
      {/* NỀN CHO TRANG PROJECT (CINEMA) */}
      <div className="animate-brush-drift absolute inset-0">
        <div
          className="absolute top-[23%] -left-[4%] h-[28px] w-[76%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(110,2,9,0.2) 0%, rgba(138,3,12,0.85) 35%, rgba(217,4,41,0.65) 75%, transparent 100%)",
            clipPath:
              "polygon(0% 35%, 16% 8%, 85% 22%, 100% 52%, 80% 90%, 10% 78%)",
          }}
        />
        <div
          className="absolute top-[51%] -left-[2%] h-[36px] w-[84%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(122,2,10,0.3) 0%, rgba(168,4,16,0.88) 40%, rgba(217,4,41,0.7) 78%, transparent 100%)",
            clipPath:
              "polygon(0% 48%, 14% 14%, 88% 18%, 100% 50%, 84% 86%, 12% 82%)",
          }}
        />
        <div
          className="absolute top-[77%] left-[4%] h-[22px] w-[72%]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(89,1,7,0.85) 28%, rgba(168,4,16,0.65) 72%, transparent 100%)",
            clipPath:
              "polygon(0% 50%, 20% 15%, 82% 25%, 100% 55%, 78% 85%, 15% 75%)",
          }}
        />
      </div>

      {/* ĐĨA CV XOAY 1 NỬA Ở CẠNH PHẢI */}
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 opacity-90">
        <CdDisc variant="half" />
      </div>

      {/* LỚP CẮT KÍNH KIẾN TRÚC & ĐƯỜNG TÂM NGẮM TĨNH */}
      <div className="absolute inset-y-0 right-[14%] w-[1px] bg-white/12" />
      <div className="absolute inset-y-0 right-[28%] w-[1px] bg-white/[0.05]" />
      <div className="absolute top-[22%] inset-x-0 h-[1px] bg-white/[0.06]" />
      <div className="absolute bottom-[24%] inset-x-0 h-[1px] bg-white/[0.06]" />

      <div
        className="absolute top-[22%] right-[28%] h-4 w-4 translate-x-1/2 -translate-y-1/2"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 47%, rgba(255,255,255,0.45) 47%, rgba(255,255,255,0.45) 53%, transparent 53%), linear-gradient(to bottom, transparent 47%, rgba(255,255,255,0.45) 47%, rgba(255,255,255,0.45) 53%, transparent 53%)",
        }}
      />
    </div>
  );
});
