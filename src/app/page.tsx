import { SplashScreen } from "@/components/sections/SplashScreen";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <Header />

      <main className="relative w-full">
        {/* Section mở màn nền (z-0, curtain="base") */}
        <AboutSection />

        {/* Cụm 3 Section Project xếp lớp màn trập (z-15, z-20, z-25) */}
        <ProjectsShowcase />

        {/* Section tiếp theo: FilmstripOverview (2 cuộn phim chạy song song, curtain="cover" layer={4}) */}
      </main>
    </>
  );
}
