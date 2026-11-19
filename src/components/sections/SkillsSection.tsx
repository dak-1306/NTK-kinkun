"use client";

import { memo } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Container } from "@/components/layout/Container";
import {
  CREATIVE_SKILL_CATEGORIES,
  SKILLS_UI_LABELS,
} from "@/constants/skills";

export const SkillsSection = memo(function SkillsSection() {
  return (
    <SectionWrapper
      id="skills"
      curtain="stack"
      layer={1}
      backgroundVariant="standard"
      innerClassName="items-center justify-center pt-16 pb-6 sm:pt-20 sm:pb-8"
      noPadding
    >
      <Container className="my-auto flex items-center justify-center">
        <div className="w-full max-w-[1160px] space-y-5 lg:space-y-6">
          {/* 1. TIÊU ĐỀ SECTION */}
          <div className="flex items-center gap-3 border-b border-[var(--border-strong)] pb-3.5">
            <span className="h-2 w-2 bg-[var(--accent)]" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
              {SKILLS_UI_LABELS.sectionTitle}
            </h2>
          </div>

          {/* 2. KHUNG 3 CỘT KỸ NĂNG CÓ TÂM NGẮM 4 GÓC */}
          <div className="relative border border-[var(--border-strong)] bg-[#060608]/90 p-4 sm:p-6 lg:p-8">
            {/* Dấu tâm ngắm 4 góc đồng bộ hệ thống */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-[1px] -left-[1px] h-2.5 w-2.5 border-t-2 border-l-2 border-[var(--accent)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-[1px] -right-[1px] h-2.5 w-2.5 border-t-2 border-r-2 border-[var(--accent)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[1px] -left-[1px] h-2.5 w-2.5 border-b-2 border-l-2 border-[var(--accent)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-2.5 w-2.5 border-b-2 border-r-2 border-[var(--accent)]"
            />

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
              {CREATIVE_SKILL_CATEGORIES.map((category) => (
                <article
                  key={category.id}
                  className="group flex flex-col justify-between border border-[var(--border)] bg-[#08080b] p-5 transition-colors duration-200 hover:border-[var(--accent)] sm:p-6"
                >
                  <div>
                    {/* Số thứ tự nhóm kỹ năng */}
                    <div className="flex items-center justify-between font-mono text-xs tracking-[0.2em]">
                      <span className="font-semibold text-[var(--accent)]">
                        {category.number}.
                      </span>
                      <span className="h-1.5 w-1.5 bg-white/20 transition-colors duration-150 group-hover:bg-[var(--accent)]" />
                    </div>

                    {/* Tên nhóm kỹ năng */}
                    <h3 className="mt-3 text-base font-bold uppercase tracking-wide text-[var(--text-primary)] sm:text-lg">
                      {category.title}
                    </h3>

                    <div className="my-4 h-[1px] w-full bg-[var(--border)] transition-colors duration-200 group-hover:bg-[var(--accent)]/40" />

                    {/* Danh sách 3 kỹ năng thành phần */}
                    <ul className="space-y-3">
                      {category.skills.map((skill) => (
                        <li
                          key={skill}
                          className="flex items-start gap-2.5 text-sm leading-snug text-[var(--text-secondary)] transition-colors duration-150 group-hover:text-[var(--text-primary)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]"
                          />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
});
