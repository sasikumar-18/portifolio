import CyanNavbar from "./CyanNavbar";
import CyanHero from "./CyanHero";
import CyanSkills from "./CyanSkills";
import CyanProjects from "./CyanProjects";
import CyanContactBanner from "./CyanContactBanner";
import CyanFooter from "./CyanFooter";

interface CyanLandingPageProps {
  onSwitchMode?: (mode: "cyan" | "3d") => void;
}

export default function CyanLandingPage({ onSwitchMode }: CyanLandingPageProps) {
  return (
    <div className="min-h-screen bg-[#05070f] text-[#f1f5f9] selection:bg-cyan selection:text-black">
      {/* Top Navbar */}
      <CyanNavbar onSwitchMode={onSwitchMode} />

      <main>
        {/* 1. Hero Section with Personal Intro, Freelance Badge, CTA buttons, Socials & Stats Panel */}
        <CyanHero />

        {/* 2. Skills & Technologies Grid with Proficiency Bars */}
        <CyanSkills />

        {/* 3. Selected Projects Showcase with Tech Tags */}
        <CyanProjects />

        {/* 4. 'Let's build something amazing together' Contact Banner */}
        <CyanContactBanner />
      </main>

      {/* 5. Clean Footer with Navigation and Back-to-Top Button */}
      <CyanFooter />
    </div>
  );
}
