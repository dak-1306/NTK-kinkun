"use client";

import { memo, useId } from "react";

interface CinemaCameraPropProps {
  className?: string;
  flip?: boolean;
}

export const CinemaCameraProp = memo(function CinemaCameraProp({
  className = "",
  flip = false,
}: CinemaCameraPropProps) {
  const uid = useId();
  const sprocketClipId = `${uid}-sprocket-clip`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${
        flip ? "-scale-x-100" : ""
      } ${className}`}
    >
      <svg viewBox="0 0 380 215" fill="none" className="h-auto w-full">
        <defs>
          <clipPath id={sprocketClipId}>
            <rect x="112" y="182" width="236" height="18" />
          </clipPath>
        </defs>

        {/* 1. CUỘN PHIM LỚN PHÍA SAU (35MM MAGAZINE REEL 1) */}
        <g className="svg-origin-center animate-cinema-reel">
          {/* Vành ngoài */}
          <circle
            cx="94"
            cy="66"
            r="42"
            fill="#070709"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.1"
          />
          {/* Vòng cuộn phim bên trong */}
          <circle
            cx="94"
            cy="66"
            r="34"
            stroke="rgba(217, 4, 41, 0.42)"
            strokeWidth="1"
            strokeDasharray="6 3"
          />
          <circle
            cx="94"
            cy="66"
            r="24"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="0.8"
          />
          {/* 5 nan hoa CNC */}
          <line
            x1="94"
            y1="24"
            x2="94"
            y2="108"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />
          <line
            x1="52"
            y1="66"
            x2="136"
            y2="66"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />
          <line
            x1="64"
            y1="36"
            x2="124"
            y2="96"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
          />
          <line
            x1="124"
            y1="36"
            x2="64"
            y2="96"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
          />
          {/* Trục khóa trung tâm */}
          <circle
            cx="94"
            cy="66"
            r="10"
            fill="#050505"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.1"
          />
          <circle cx="94" cy="66" r="3.5" fill="#d90429" />
        </g>

        {/* 2. CUỘN PHIM THU PHÍA TRƯỚC (TAKE-UP REEL 2) */}
        <g className="svg-origin-center animate-cinema-reel-fast">
          <circle
            cx="158"
            cy="76"
            r="30"
            fill="#070709"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.1"
          />
          <circle
            cx="158"
            cy="76"
            r="22"
            stroke="rgba(217, 4, 41, 0.38)"
            strokeWidth="0.9"
            strokeDasharray="4 4"
          />
          <line
            x1="128"
            y1="76"
            x2="188"
            y2="76"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
          />
          <line
            x1="158"
            y1="46"
            x2="158"
            y2="106"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
          />
          <circle
            cx="158"
            cy="76"
            r="8"
            fill="#050505"
            stroke="rgba(255, 255, 255, 0.38)"
            strokeWidth="1"
          />
          <circle cx="158" cy="76" r="2.5" fill="#d90429" />
        </g>

        {/* 3. TAY CẦM TRÊN (TOP HANDLE) & KÍNH NGẮM ĐIỆN TỬ (EVF) */}
        <g>
          {/* Top Handle */}
          <path
            d="M104,106 L104,94 L172,94 L172,106"
            stroke="rgba(255, 255, 255, 0.34)"
            strokeWidth="1.4"
          />
          {/* Khớp nối EVF */}
          <line
            x1="82"
            y1="106"
            x2="64"
            y2="98"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.2"
          />
          {/* Thân kính ngắm EVF & Eyecup */}
          <rect
            x="38"
            y="91"
            width="28"
            height="13"
            fill="#08080a"
            stroke="rgba(255, 255, 255, 0.34)"
            strokeWidth="1"
          />
          <polygon
            points="38,89 28,86 28,109 38,106"
            fill="#08080a"
            stroke="#d90429"
            strokeWidth="1"
          />
        </g>

        {/* 4. THÂN MÁY QUAY ĐIỆN ẢNH (CINEMA BODY) */}
        <g>
          {/* Khung thân vát góc */}
          <polygon
            points="74,106 184,106 188,112 188,154 182,160 74,160 68,154 68,112"
            fill="#08080a"
            stroke="rgba(255, 255, 255, 0.38)"
            strokeWidth="1.2"
          />

          {/* Bảng điều khiển kỹ thuật bên hông */}
          <rect
            x="82"
            y="116"
            width="54"
            height="32"
            fill="#050505"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="0.9"
          />
          {/* Các vạch hiển thị thông số Timecode / Audio */}
          <line
            x1="88"
            y1="124"
            x2="118"
            y2="124"
            stroke="rgba(255, 255, 255, 0.32)"
            strokeWidth="1"
          />
          <line
            x1="88"
            y1="130"
            x2="108"
            y2="130"
            stroke="#d90429"
            strokeWidth="1.2"
          />
          <line
            x1="88"
            y1="136"
            x2="126"
            y2="136"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />

          {/* Khe tản nhiệt phía trước thân máy */}
          <line
            x1="146"
            y1="118"
            x2="146"
            y2="148"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />
          <line
            x1="152"
            y1="118"
            x2="152"
            y2="148"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />
          <line
            x1="158"
            y1="118"
            x2="158"
            y2="148"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />

          {/* Đèn báo REC nhấp nháy */}
          <circle
            cx="174"
            cy="118"
            r="3"
            fill="#d90429"
            className="animate-tally"
          />
        </g>

        {/* 5. HỆ THANH TRƯỢT STUDIO 15MM RODS & ĐẾ MÁY */}
        <g>
          <rect
            x="86"
            y="160"
            width="84"
            height="7"
            fill="#0a0a0d"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1"
          />
          <line
            x1="66"
            y1="168"
            x2="274"
            y2="168"
            stroke="rgba(255, 255, 255, 0.32)"
            strokeWidth="1.2"
          />
          <line
            x1="66"
            y1="173"
            x2="274"
            y2="173"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1"
          />
        </g>

        {/* 6. ỐNG KÍNH CINEMA PRIME, FOLLOW FOCUS & MATTE BOX */}
        <g>
          {/* Ngàm PL Mount */}
          <rect
            x="188"
            y="115"
            width="8"
            height="36"
            fill="#0a0a0d"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1"
          />
          {/* Thân ống kính & Vòng chia vạch lấy nét */}
          <rect
            x="196"
            y="118"
            width="30"
            height="30"
            fill="#070709"
            stroke="rgba(255, 255, 255, 0.36)"
            strokeWidth="1.1"
          />
          <line
            x1="205"
            y1="118"
            x2="205"
            y2="148"
            stroke="#d90429"
            strokeWidth="1.2"
          />
          <line
            x1="215"
            y1="118"
            x2="215"
            y2="148"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Bánh răng Follow Focus xoay lấy nét */}
          <g className="svg-origin-center animate-follow-focus">
            <circle
              cx="208"
              cy="157"
              r="11"
              fill="#070709"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.1"
            />
            <circle
              cx="208"
              cy="157"
              r="7"
              stroke="#d90429"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle cx="208" cy="157" r="2.5" fill="rgba(255,255,255,0.6)" />
          </g>

          {/* Hộp chắn sáng Matte Box vát góc */}
          <polygon
            points="226,114 256,106 256,160 226,152"
            fill="#08080a"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.2"
          />
          {/* Mặt kính lọc đỏ trước Matte Box */}
          <line
            x1="252"
            y1="110"
            x2="252"
            y2="156"
            stroke="#d90429"
            strokeWidth="1.5"
          />
          {/* Cờ chắn sáng trên (French Flag) */}
          <polygon
            points="236,111 268,96 271,100 242,113"
            fill="#0a0a0d"
            stroke="rgba(255, 255, 255, 0.38)"
            strokeWidth="1"
          />
        </g>

        {/* 7. DẢI PHIM NHỰA 35MM VỚI LỖ RĂNG CƯA TRƯỢT LIÊN TỤC */}
        <g>
          {/* Dẫn hướng phim từ thân máy xuống */}
          <path
            d="M94,160 C94,176 102,183 114,183"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
          />
          {/* 2 mép băng phim */}
          <line
            x1="112"
            y1="183"
            x2="348"
            y2="183"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
          />
          <line
            x1="112"
            y1="199"
            x2="348"
            y2="199"
            stroke="rgba(255, 255, 255, 0.24)"
            strokeWidth="1"
          />

          {/* Lỗ răng cưa phim 35mm trượt mượt trên GPU */}
          <g clipPath={`url(#${sprocketClipId})`}>
            <g className="animate-film-sprocket">
              <line
                x1="112"
                y1="187"
                x2="380"
                y2="187"
                stroke="#d90429"
                strokeWidth="2"
                strokeDasharray="4 8"
              />
              <line
                x1="112"
                y1="195"
                x2="380"
                y2="195"
                stroke="#d90429"
                strokeWidth="2"
                strokeDasharray="4 8"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
});
