"use client";

import { memo } from "react";

interface TvStaticBackdropProps {
  intensity?: "normal" | "strong";
  className?: string;
}

// Mẫu hạt nhiễu tuyết TV mật độ cao, nền trong suốt để xếp chồng 2 lớp ngược pha
const TV_SNOW_PRIMARY_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='%23f4f4f5'%3E%3Crect x='2' y='3' width='4' height='1' opacity='0.75'/%3E%3Crect x='14' y='5' width='3' height='1' opacity='0.5'/%3E%3Crect x='29' y='2' width='5' height='1' opacity='0.8'/%3E%3Crect x='48' y='7' width='3' height='1' opacity='0.6'/%3E%3Crect x='66' y='4' width='4' height='1' opacity='0.85'/%3E%3Crect x='82' y='8' width='6' height='1' opacity='0.55'/%3E%3Crect x='7' y='16' width='5' height='1' opacity='0.7'/%3E%3Crect x='24' y='19' width='3' height='1' opacity='0.9'/%3E%3Crect x='41' y='15' width='6' height='1' opacity='0.6'/%3E%3Crect x='59' y='21' width='4' height='1' opacity='0.75'/%3E%3Crect x='76' y='17' width='3' height='1' opacity='0.85'/%3E%3Crect x='90' y='22' width='4' height='1' opacity='0.5'/%3E%3Crect x='4' y='31' width='3' height='1' opacity='0.85'/%3E%3Crect x='19' y='34' width='6' height='1' opacity='0.65'/%3E%3Crect x='37' y='30' width='4' height='1' opacity='0.8'/%3E%3Crect x='54' y='35' width='5' height='1' opacity='0.55'/%3E%3Crect x='71' y='32' width='3' height='1' opacity='0.9'/%3E%3Crect x='85' y='36' width='5' height='1' opacity='0.65'/%3E%3Crect x='10' y='46' width='6' height='1' opacity='0.75'/%3E%3Crect x='28' y='49' width='4' height='1' opacity='0.6'/%3E%3Crect x='45' y='45' width='3' height='1' opacity='0.85'/%3E%3Crect x='62' y='50' width='5' height='1' opacity='0.7'/%3E%3Crect x='79' y='47' width='4' height='1' opacity='0.8'/%3E%3Crect x='3' y='61' width='5' height='1' opacity='0.65'/%3E%3Crect x='21' y='64' width='3' height='1' opacity='0.9'/%3E%3Crect x='36' y='60' width='5' height='1' opacity='0.55'/%3E%3Crect x='52' y='65' width='4' height='1' opacity='0.8'/%3E%3Crect x='68' y='62' width='6' height='1' opacity='0.7'/%3E%3Crect x='87' y='66' width='3' height='1' opacity='0.85'/%3E%3Crect x='12' y='76' width='4' height='1' opacity='0.8'/%3E%3Crect x='27' y='79' width='6' height='1' opacity='0.6'/%3E%3Crect x='44' y='75' width='3' height='1' opacity='0.85'/%3E%3Crect x='60' y='80' width='5' height='1' opacity='0.75'/%3E%3Crect x='77' y='77' width='4' height='1' opacity='0.65'/%3E%3Crect x='6' y='89' width='5' height='1' opacity='0.7'/%3E%3Crect x='23' y='92' width='4' height='1' opacity='0.85'/%3E%3Crect x='40' y='88' width='6' height='1' opacity='0.6'/%3E%3Crect x='58' y='93' width='3' height='1' opacity='0.9'/%3E%3Crect x='74' y='90' width='5' height='1' opacity='0.75'/%3E%3Crect x='89' y='94' width='4' height='1' opacity='0.65'/%3E%3C/g%3E%3Cg fill='%23d90429'%3E%3Crect x='11' y='11' width='6' height='1' opacity='0.85'/%3E%3Crect x='53' y='12' width='5' height='1' opacity='0.75'/%3E%3Crect x='81' y='26' width='7' height='1' opacity='0.8'/%3E%3Crect x='16' y='40' width='5' height='1' opacity='0.9'/%3E%3Crect x='64' y='41' width='6' height='1' opacity='0.75'/%3E%3Crect x='33' y='55' width='7' height='1' opacity='0.85'/%3E%3Crect x='84' y='56' width='5' height='1' opacity='0.8'/%3E%3Crect x='9' y='70' width='6' height='1' opacity='0.75'/%3E%3Crect x='49' y='71' width='7' height='1' opacity='0.9'/%3E%3Crect x='72' y='84' width='6' height='1' opacity='0.85'/%3E%3Crect x='29' y='85' width='5' height='1' opacity='0.75'/%3E%3C/g%3E%3C/svg%3E")`;

export const TvStaticBackdrop = memo(function TvStaticBackdrop({
  intensity = "normal",
  className = "",
}: TvStaticBackdropProps) {
  const primaryOpacity = intensity === "strong" ? "opacity-75" : "opacity-55";
  const secondaryOpacity = intensity === "strong" ? "opacity-55" : "opacity-35";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-clip bg-[#0e0e11] select-none ${className}`}
    >
      {/* 1. ÁNH PHÁT QUANG PHỐT-PHO CRT MÀU XÁM ĐỎ ĐỂ HẠT NHIỄU NỔI BẬT */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(155, 6, 24, 0.26) 0%, rgba(22, 22, 27, 0.94) 58%, rgba(8, 8, 10, 1) 100%)",
        }}
      />

      {/* 2. LỚP NHIỄU TUYẾT TV CHÍNH (DỊCH CHUYỂN TỨC THÌ TRÊN GPU) */}
      <div
        className={`animate-tv-static absolute -inset-16 ${primaryOpacity}`}
        style={{
          backgroundImage: TV_SNOW_PRIMARY_URI,
          backgroundSize: "96px 96px",
        }}
      />

      {/* 3. LỚP NHIỄU TUYẾT PHỤ NGƯỢC PHA TẠO ĐỘ RỐI ANALOG */}
      <div
        className={`animate-tv-static-alt absolute -inset-16 ${secondaryOpacity}`}
        style={{
          backgroundImage: TV_SNOW_PRIMARY_URI,
          backgroundSize: "144px 144px",
        }}
      />

      {/* 4. HỆ THỐNG ĐƯỜNG QUÉT NGANG CRT CÓ TƯƠNG PHẢN (SCANLINES) */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 0px, rgba(255, 255, 255, 0.045) 1px, rgba(0, 0, 0, 0.72) 1px, rgba(0, 0, 0, 0.72) 3px)",
        }}
      />

      {/* 5. DẢI SÓNG NHIỄU TRACKING TRÔI DỌC TỪ TRÊN XUỐNG */}
      <div
        className="animate-crt-roll absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 42%, rgba(217, 4, 41, 0.22) 52%, rgba(255, 255, 255, 0.06) 60%, transparent 100%)",
        }}
      />

      {/* 6. CÁC DẢI XÉ NGANG MẤT ĐỒNG BỘ (HORIZONTAL GLITCH TEARS) */}
      <div className="animate-crt-glitch-1 absolute top-[14%] inset-x-0 h-[6px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="animate-crt-glitch-1 absolute top-[15%] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)]/85 to-transparent" />

      <div className="animate-crt-glitch-2 absolute top-[82%] inset-x-0 h-[8px] bg-gradient-to-r from-transparent via-[var(--accent)]/55 to-transparent" />
      <div className="animate-crt-glitch-2 absolute top-[83%] inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      {/* 7. VIỀN TỐI NHẸ Ở 4 GÓC CỰC BIÊN (KHÔNG CHE MẤT NHIỄU Ở VIỀN VIDEO) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 58%, rgba(0, 0, 0, 0.76) 100%)",
        }}
      />
    </div>
  );
});
