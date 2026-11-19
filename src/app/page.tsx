import { SplashScreen } from "@/components/sections/SplashScreen";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { FilmstripOverviewSection } from "@/components/sections/FilmstripOverviewSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { VideoWarmupTrigger } from "@/components/ui/VideoWarmupTrigger";

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <Header />

      <VideoWarmupTrigger />

      <main className="relative w-full">
        {/* Section mở màn nền (z-0, curtain="base") */}
        <AboutSection />

        {/* Section Kỹ năng & Công cụ sản xuất (z-15, curtain="stack") */}
        <SkillsSection />

        {/* Cụm 3 Section Project xếp lớp màn trập (z-20, z-25, z-35) */}
        <ProjectsShowcase />

        {/* Section tổng hợp phim 35mm (z-40, curtain="cover") */}
        <FilmstripOverviewSection />
      </main>
    </>
  );
}
