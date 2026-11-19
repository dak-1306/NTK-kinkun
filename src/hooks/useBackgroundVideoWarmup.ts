"use client";

import { useEffect } from "react";

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

export function useBackgroundVideoWarmup(
  urls: readonly string[],
  startWhen: boolean,
) {
  useEffect(() => {
    if (!startWhen || typeof window === "undefined") return;

    // Tôn trọng chế độ tiết kiệm dữ liệu trên mobile
    const conn = (
      navigator as Navigator & { connection?: NetworkInformationLike }
    ).connection;
    if (conn?.saveData || conn?.effectiveType === "2g") return;

    const controller = new AbortController();
    const uniqueUrls = Array.from(new Set(urls));

    const warmUpSequentially = async () => {
      // Đợi 1.5s sau khi Splash tắt để ưu tiên băng thông cho khung hình đầu tiên
      await new Promise((r) => window.setTimeout(r, 1500));

      for (const url of uniqueUrls) {
        if (controller.signal.aborted) break;
        try {
          // Nạp tuần tự từng video vào HTTP Cache của trình duyệt
          const res = await fetch(url, {
            signal: controller.signal,
            mode: "cors",
            cache: "force-cache",
          });
          if (res.ok && res.body) {
            const reader = res.body.getReader();
            while (!controller.signal.aborted) {
              const { done } = await reader.read();
              if (done) break;
            }
          }
        } catch {
          // Bỏ qua nếu người dùng chuyển trang hoặc hủy request
        }
      }
    };

    warmUpSequentially();
    return () => controller.abort();
  }, [urls, startWhen]);
}
