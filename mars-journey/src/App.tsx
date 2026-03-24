import { HeroSection } from "./components/HeroSection";
import { LaunchSection } from "./components/LaunchSection";
import { DeepSpaceSection } from "./components/DeepSpaceSection";
import { LandingSection } from "./components/LandingSection";
import { ExplorationSection } from "./components/ExplorationSection";
import { FallingStars } from "./components/FallingStars";

function App() {

  return (
    <main className="relative w-full bg-[var(--color-space-900)] min-h-screen text-white font-sans antialiased selection:bg-blue-500/30 font-sans">
      
      {/* Global Starfield Effect */}
      <FallingStars />
      
      {/* Scroll Sections */}
      <HeroSection />
      <LaunchSection />
      <DeepSpaceSection />
      
      {/* 
        The GSAP LandingSection now encompasses what used to be Approach + Landing, 
        making it one massive cinematic scale animation! 
      */}
      <LandingSection />
      
      {/* Final interactive content phase */}
      <ExplorationSection />

    </main>
  );
}

export default App;
