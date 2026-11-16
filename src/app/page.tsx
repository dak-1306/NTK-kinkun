import { SplashScreen } from "@/components/sections/SplashScreen";
import { Header } from "@/components/layout/Header";
import { AboutSection } from "@/components/sections/AboutSection";

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <Header />

      <main className="relative w-full">
        {/* Section mở màn nền (z-0, curtain="base") */}
        <AboutSection />

        {/* Các section tiếp theo sẽ xếp lớp màn trập tại đây:
            - Project 01..03: curtain="stack" layer={1..3} backgroundVariant="cinema"
            - Filmstrip Overview: curtain="cover" layer={4} backgroundVariant="standard"
        */}
      </main>
    </>
  );
}
