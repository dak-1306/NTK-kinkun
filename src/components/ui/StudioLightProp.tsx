"use client";

import { memo, useId } from "react";

interface StudioLightPropProps {
  className?: string;
  flip?: boolean;
  showBeam?: boolean;
}

export const StudioLightProp = memo(function StudioLightProp({
  className = "",
  flip = false,
  showBeam = true,
}: StudioLightPropProps) {
  const uid = useId();
  const mainBeamId = `${uid}-main-beam`;
  const coreBeamId = `${uid}-core-beam`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${
        flip ? "-scale-x-100" : ""
      } ${className}`}
    >
      <svg viewBox="0 0 380 230" fill="none" className="h-auto w-full">
        <defs>
          {/* Luồng sáng tán rộng dịu nhẹ */}
          <linearGradient id={mainBeamId} x1="0%" y1="0%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#d90429" stopOpacity="0.28" />
            <stop offset="48%" stopColor="#8a030c" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#8a030c" stopOpacity="0" />
          </linearGradient>

          {/* Lõi tia sáng tập trung từ thấu kính Fresnel */}
          <linearGradient id={coreBeamId} x1="0%" y1="0%" x2="100%" y2="65%">
            <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.32" />
            <stop offset="40%" stopColor="#d90429" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d90429" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. LUỒNG SÁNG VOLUMETRIC CHIẾU TỪ CHÓA ĐÈN */}
        {showBeam && (
          <g className="animate-studio-beam origin-[96px_68px]">
            <polygon
              points="102,44 372,14 318,214 88,88"
              fill={`url(#${mainBeamId})`}
            />
            <polygon
              points="100,54 348,58 310,164 92,78"
              fill={`url(#${coreBeamId})`}
            />
            {/* Tia biên giới hạn góc chiếu 1px */}
            <line
              x1="102"
              y1="44"
              x2="356"
              y2="16"
              stroke="rgba(217, 4, 41, 0.24)"
              strokeWidth="0.8"
              strokeDasharray="3 5"
            />
            <line
              x1="88"
              y1="88"
              x2="305"
              y2="205"
              stroke="rgba(217, 4, 41, 0.2)"
              strokeWidth="0.8"
              strokeDasharray="3 5"
            />
          </g>
        )}

        {/* 2. DÂY NGUỒN VÕNG ĐUNG ĐƯA NHẸ (100% GPU ROTATE3D) */}
        <g className="svg-origin-top animate-cable-sway">
          <path
            d="M36,74 C14,108 18,148 48,162"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
          />
          <path
            d="M36,74 C14,108 18,148 48,162"
            stroke="rgba(217, 4, 41, 0.35)"
            strokeWidth="0.6"
            strokeDasharray="2 4"
          />
        </g>

        {/* 3. CHÂN ĐÈN STUDIO (C-STAND & RISER COLLAR) */}
        <g>
          {/* Trục chính */}
          <line
            x1="54"
            y1="96"
            x2="54"
            y2="216"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1.2"
          />
          {/* Cổ khóa tăng chiều cao */}
          <rect
            x="49"
            y="142"
            width="10"
            height="14"
            fill="#08080a"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
          />
          {/* Tay vặn khóa T-knob */}
          <line
            x1="42"
            y1="149"
            x2="49"
            y2="149"
            stroke="#d90429"
            strokeWidth="1.5"
          />
          {/* Chân đế kiềng 3 cạnh */}
          <line
            x1="54"
            y1="196"
            x2="26"
            y2="220"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
          />
          <line
            x1="54"
            y1="196"
            x2="82"
            y2="220"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
          />
          <line
            x1="18"
            y1="220"
            x2="90"
            y2="220"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1"
          />
        </g>

        {/* 4. KHUNG TREO CHỮ U (YOKE) & CUNG CHIA ĐỘ GÓC CHIẾU */}
        <path
          d="M54,96 L54,84 L82,74"
          stroke="rgba(255, 255, 255, 0.36)"
          strokeWidth="1.3"
        />
        <circle
          cx="66"
          cy="68"
          r="26"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />

        {/* 5. CỤM ĐẦU ĐÈN FRESNEL & CÁNH CHẮN SÁNG (BARN DOORS) */}
        <g transform="rotate(-15 68 66)">
          {/* Đuôi đèn & Núm chỉnh chụm sáng (Spot/Flood knob) */}
          <rect
            x="28"
            y="56"
            width="8"
            height="20"
            fill="#070709"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1"
          />
          <rect
            x="22"
            y="61"
            width="6"
            height="10"
            fill="#070709"
            stroke="#d90429"
            strokeWidth="1"
          />

          {/* Thân vỏ đèn vát góc */}
          <polygon
            points="36,48 86,48 92,54 92,78 86,84 36,84"
            fill="#08080a"
            stroke="rgba(255, 255, 255, 0.36)"
            strokeWidth="1.1"
          />

          {/* Các khe tản nhiệt trên thân đèn */}
          <line
            x1="46"
            y1="53"
            x2="46"
            y2="79"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
          />
          <line
            x1="53"
            y1="53"
            x2="53"
            y2="79"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="53"
            x2="60"
            y2="79"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
          />

          {/* Chốt xoay trục Yoke */}
          <circle
            cx="68"
            cy="66"
            r="4.5"
            fill="#050505"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1"
          />
          <circle cx="68" cy="66" r="1.5" fill="#d90429" />

          {/* Đèn báo nguồn Tally */}
          <circle
            cx="41"
            cy="54"
            r="2"
            fill="#d90429"
            className="animate-tally"
          />

          {/* Vành thấu kính Fresnel mặt trước */}
          <rect
            x="92"
            y="50"
            width="5"
            height="32"
            fill="#140407"
            stroke="#d90429"
            strokeWidth="1.2"
          />
          <line
            x1="95"
            y1="54"
            x2="95"
            y2="78"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="0.8"
          />

          {/* Cánh chắn sáng (Barn doors) mở góc điện ảnh */}
          <polygon
            points="97,50 116,34 119,37 97,53"
            fill="#0a0a0d"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
          />
          <polygon
            points="97,82 116,98 119,95 97,79"
            fill="#0a0a0d"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
});
