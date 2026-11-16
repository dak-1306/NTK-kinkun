"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_DATA } from "@/constants/navigation";

export function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    let lastIndex = 0;

    const syncProgressAndNodes = () => {
      // 1. Cập nhật thanh tiến trình mượt 120 FPS bằng GPU scale3d
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const ratio =
        maxScroll > 0
          ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
          : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scale3d(${ratio}, 1, 1)`;
      }

      // 2. Dò section có z-index cao nhất tại điểm neo y = 120px để sáng đúng node
      const probeY = 120;
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-section-wrapper='true']",
      );

      let highestZ = -1;
      let currentSectionId = "";

      for (let i = 0; i < sections.length; i += 1) {
        const el = sections[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          const z = Number(el.dataset.zIndex ?? 0);
          if (z >= highestZ) {
            highestZ = z;
            currentSectionId = el.id;
          }
        }
      }

      if (currentSectionId) {
        const foundIdx = NAV_DATA.nodes.findIndex(
          (node) => node.id === currentSectionId,
        );
        if (foundIdx !== -1 && foundIdx !== lastIndex) {
          lastIndex = foundIdx;
          setActiveIndex(foundIdx);
        }
      }

      rafId = window.requestAnimationFrame(syncProgressAndNodes);
    };

    rafId = window.requestAnimationFrame(syncProgressAndNodes);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const currentNode = NAV_DATA.nodes[activeIndex] ?? NAV_DATA.nodes[0];

  return (
    <header
      aria-label={NAV_DATA.ariaLabel}
      className="fixed top-5 left-1/2 z-50 w-[min(84vw,360px)] -translate-x-1/2 lg:w-1/3 lg:max-w-[440px]"
    >
      {/* Đường ray tiến trình + Các node mốc section */}
      <div className="relative flex h-5 items-center">
        {/* Thanh nền tĩnh */}
        <div
          role="progressbar"
          aria-label={NAV_DATA.progressAriaLabel}
          aria-valuenow={activeIndex + 1}
          aria-valuemin={1}
          aria-valuemax={NAV_DATA.nodes.length}
          className="h-[2px] w-full overflow-clip bg-white/15"
        >
          <div
            ref={progressRef}
            style={{ transform: "scale3d(0, 1, 1)" }}
            className="h-full w-full origin-left bg-[var(--accent)] will-change-transform"
          />
        </div>

        {/* Các node nằm trên đường ray */}
        <nav className="absolute inset-x-0 flex items-center justify-between">
          {NAV_DATA.nodes.map((node, index) => {
            const isCurrent = index === activeIndex;
            const isPassed = index < activeIndex;

            return (
              <a
                key={node.id}
                href={node.href}
                aria-label={`${node.index} - ${node.label}`}
                aria-current={isCurrent ? "step" : undefined}
                title={`${node.index} // ${node.label}`}
                className="group relative flex h-6 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <span
                  className={`block transition-transform duration-150 ${
                    isCurrent
                      ? "h-2.5 w-2.5 scale-110 bg-[var(--accent)] ring-4 ring-[var(--accent)]/25"
                      : isPassed
                        ? "h-2 w-2 bg-[var(--accent)]"
                        : "h-1.5 w-1.5 bg-white/40 group-hover:scale-125 group-hover:bg-white"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>

      {/* Nhãn gọn hiển thị tên section hiện tại */}
      <div className="mt-1 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
        <span className="text-[var(--accent)]">{currentNode.index}</span>
        <span>/</span>
        <span className="text-[var(--text-primary)]">{currentNode.label}</span>
      </div>
    </header>
  );
}
