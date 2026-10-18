import ProgressBar from "./components/awwwards/ProgressBar";
import Cursor from "./components/awwwards/Cursor";
import Navbar from "./components/awwwards/Navbar";
import Hero from "./components/awwwards/Hero";
import About from "./components/awwwards/About";
import SkillsMarquee from "./components/awwwards/Marquee";
import Projects from "./components/awwwards/Projects";
import Experience from "./components/awwwards/Experience";
import Education from "./components/awwwards/Education";
import Testimonials from "./components/awwwards/Testimonials";
import Contact from "./components/awwwards/Contact";
import Footer from "./components/awwwards/Footer";
import AiRoboticsBackground from "./components/awwwards/AiRoboticsBackground";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#05060a] text-neutral-100 transition-colors duration-400 font-sans selection:bg-[#00f0ff] selection:text-black">
      {/* 1. Full-screen 4D AI & Robotics Background */}
      <AiRoboticsBackground />

      {/* 2. Top Scroll Progress Bar */}
      <ProgressBar />

      {/* 3. Custom Magnetic Hover-Scaling Cursor */}
      <Cursor />

      {/* 4. Sticky Glass Navbar with Light/Dark Mode Toggle & Resume CTA */}
      <Navbar />

      {/* 5. Subtle Ambient Film Grain */}
      <div className="fixed inset-0 pointer-events-none bg-grain opacity-40 z-[1]" />

      {/* 6. Main Single-Page Transparent Foreground Content Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section with Infinite Marquee & Interactive Cards */}
        <SkillsMarquee />

        {/* Projects Showcase with 3D Tilt Cards */}
        <Projects />

        {/* Work & Internships Section */}
        <Experience />

        {/* Separate Academic Education & Certifications Section */}
        <Education />

        {/* Testimonials Auto-sliding Carousel */}
        <Testimonials />

        {/* Contact Form & Direct Touchpoints */}
        <Contact />
      </main>

      {/* 7. Footer with Magnetic Back to Top */}
      <Footer />
    </div>
  );
}
