"use client";

import { memo, useEffect, useState } from "react";

interface TvStaticBackdropProps {
  intensity?: "subtle" | "normal";
  className?: string;
}

let cachedCrimsonNoiseDataUrl: string | null = null;

function getCrimsonNoiseTileDataUrl(): string {
  if (cachedCrimsonNoiseDataUrl) return cachedCrimsonNoiseDataUrl;
  if (typeof document === "undefined") return "";

  const size = 160;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return "";

  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const shade = (Math.random() * 255) | 0;
    // Khoảng 18% hạt nhiễu mang sắc phốt-pho đỏ đặc trưng của tín hiệu analog
    const isRedPhosphor = Math.random() < 0.18;

    if (isRedPhosphor) {
      data[i] = Math.min(255, shade + 75);
      data[i + 1] = (shade * 0.18) | 0;
      data[i + 2] = (shade * 0.24) | 0;
    } else {
      data[i] = shade;
      data[i + 1] = shade;
      data[i + 2] = shade;
    }
    data[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);
  cachedCrimsonNoiseDataUrl = canvas.toDataURL("image/png");
  return cachedCrimsonNoiseDataUrl;
}

export const TvStaticBackdrop = memo(function TvStaticBackdrop({
  intensity = "normal",
  className = "",
}: TvStaticBackdropProps) {
  const [tileUrl, setTileUrl] = useState("");

  useEffect(() => {
    setTileUrl(getCrimsonNoiseTileDataUrl());
  }, []);

  const noiseOpacityClass =
    intensity === "subtle" ? "opacity-[0.085]" : "opacity-[0.14]";

  const crimsonGlow =
    intensity === "subtle"
      ? "radial-gradient(circle at 50% 50%, rgba(217, 4, 41, 0.07) 0%, rgba(120, 2, 22, 0.03) 42%, rgba(0, 0, 0, 0.9) 100%)"
      : "radial-gradient(circle at 50% 50%, rgba(217, 4, 41, 0.13) 0%, rgba(138, 3, 24, 0.05) 45%, rgba(0, 0, 0, 0.92) 100%)";

  return (
    <div
      aria-hidden="true"
      style={{ contain: "strict" }}
      className={`pointer-events-none absolute inset-0 overflow-clip bg-[#050304] ${className}`}
    >
      {/* 1. Lớp hạt tuyết TV analog pha phốt-pho đỏ dịch chuyển GPU */}
      {tileUrl && (
        <div
          style={{
            backgroundImage: `url("${tileUrl}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "160px 160px",
          }}
          className={`animate-tv-static absolute -inset-12 will-change-transform ${noiseOpacityClass}`}
        />
      )}

      {/* 2. Đường quét ngang màn hình CRT xen kẽ tia đỏ siêu mảnh */}
      <div
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(217, 4, 41, 0.035) 0px, transparent 1px, transparent 2px, rgba(0, 0, 0, 0.52) 2px, rgba(0, 0, 0, 0.52) 4px)",
        }}
        className="absolute inset-0 opacity-80"
      />

      {/* 3. Ánh sáng ống phóng CRT đỏ trầm ở tâm & tối sâu 4 góc */}
      <div
        style={{
          background: crimsonGlow,
          boxShadow: "inset 0 0 90px rgba(217, 4, 41, 0.08)",
        }}
        className="absolute inset-0"
      />
    </div>
  );
});