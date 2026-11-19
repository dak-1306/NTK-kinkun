import type { CreativeSkillCategory } from "@/types/skill";

export const SKILLS_UI_LABELS = {
  sectionTitle: "CREATIVE SKILLS",
} as const;

export const CREATIVE_SKILL_CATEGORIES: readonly CreativeSkillCategory[] = [
  {
    id: "visual-photography",
    number: "01",
    title: "VISUAL & PHOTOGRAPHY",
    skills: [
      "Photography & Visual Composition",
      "Lighting & Visual Aesthetics",
      "Visual Storytelling",
    ],
  },
  {
    id: "filmmaking-production",
    number: "02",
    title: "FILMMAKING & PRODUCTION",
    skills: [
      "Camera Operation",
      "Storyboard & Creative Ideas",
      "Video Production",
    ],
  },
  {
    id: "art-direction-design",
    number: "03",
    title: "ART DIRECTION & DESIGN",
    skills: [
      "Concept Development",
      "Moodboard & Look and Feel",
      "Visual Direction",
    ],
  },
] as const;
