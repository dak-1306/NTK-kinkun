"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CinemaButton } from "@/components/ui/CinemaButton";
import { ABOUT_DATA } from "@/constants/about";

export function AboutSection() {
  const [hasPortraitError, setHasPortraitError] = useState(false);

  const handleNextSection = () => {
    const target = document.querySelector(ABOUT_DATA.nextAction.targetHref);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectionWrapper
      id="about"
      curtain="base"
      backgroundVariant="standard"
      innerClassName="justify-center pt-20 pb-10 lg:pt-20 lg:pb-8"
      noPadding
    >
      <Container className="my-auto">
        <SectionHeader title={ABOUT_DATA.sectionTitle} />

        <div className="grid grid-cols-1 items-center gap-7 sm:gap-9 lg:grid-cols-12 lg:gap-12">
          {/* CỘT TRÁI: KHUNG ẢNH CHÂN DUNG TỶ LỆ 3:4 CHUẨN KHUÔN MẶT */}
          <div className="lg:col-span-4">
            <div className="chamfer-md mx-auto w-full max-w-[250px] bg-[var(--border-strong)] p-[1px] sm:max-w-[290px] lg:max-w-[320px]">
              <div className="chamfer-md relative aspect-[3/4] max-h-[320px] w-full overflow-clip bg-[var(--surface)] sm:max-h-[360px] lg:max-h-[400px]">
                {!hasPortraitError ? (
                  <img
                    src={ABOUT_DATA.portrait.src}
                    alt={ABOUT_DATA.portrait.alt}
                    decoding="async"
                    onError={() => setHasPortraitError(true)}
                    className="h-full w-full object-cover object-[50%_20%] contrast-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#08080a]">
                    <span className="font-mono text-3xl font-bold tracking-[0.22em] text-[var(--text-primary)]">
                      {ABOUT_DATA.portrait.fallbackInitials}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: TÊN, NỘI DUNG GIỚI THIỆU & NÚT ĐĨA CHUYỂN TRANG */}
          <div className="flex flex-col justify-center lg:col-span-8">
            <div className="space-y-4 border-l-2 border-[var(--accent)] pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)] sm:text-xs">
                {ABOUT_DATA.role}
              </p>
              <h1 className="text-2xl font-bold leading-[1.15] tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[42px]">
                {ABOUT_DATA.fullName}
              </h1>
            </div>

            <div className="mt-6 space-y-3.5 text-sm leading-relaxed text-[var(--text-primary)]/90 sm:mt-7 sm:text-base lg:max-w-2xl lg:text-[17px]">
              {ABOUT_DATA.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 border-t border-[var(--border)] pt-6 sm:mt-8">
              <CinemaButton
                size="lg"
                label={ABOUT_DATA.nextAction.label}
                ariaLabel={ABOUT_DATA.nextAction.ariaLabel}
                onClick={handleNextSection}
              />
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
