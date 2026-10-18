import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import Magnetic from "./Magnetic";
import { personalInfo } from "../../data/portfolioData";

export default function Hero() {
  const roles = [
    "Full-Stack Developer",
    "Python Engineer",
    "AI & ML Specialist",
    "REST API Architect",
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating roles every 2.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) * 0.05);
    mouseY.set((clientY - innerHeight / 2) * 0.05);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 pt-28 pb-16 overflow-hidden"
    >
      {/* Background Parallax Ambient Elements */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00f0ff]/10 dark:bg-[#00f0ff]/[0.08] rounded-full blur-[140px] pointer-events-none" />

        {/* Ambient Floating Grid Elements */}
        <div className="absolute top-24 left-[10%] w-32 h-32 border border-black/5 dark:border-white/5 rounded-3xl -rotate-12 backdrop-blur-[1px]" />
        <div className="absolute bottom-32 right-[8%] w-48 h-48 border border-black/5 dark:border-white/5 rounded-full rotate-45 backdrop-blur-[1px]" />
        
        {/* Corner Crosshairs */}
        <div className="absolute top-36 right-[15%] text-xs font-mono text-black/20 dark:text-white/20 select-none">
          + 13.6288° N, 79.4192° E
        </div>
        <div className="absolute bottom-28 left-[12%] text-xs font-mono text-black/20 dark:text-white/20 select-none hidden md:block">
          SYS.STATE // STABLE &bull; 60 FPS
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md mb-8 hover:border-[#00f0ff]/60 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
          </span>
          <span className="text-xs font-mono tracking-widest uppercase font-semibold text-neutral-800 dark:text-neutral-200">
            AVAILABLE FOR HIRE &bull; FULL-TIME / CONTRACT
          </span>
        </motion.div>

        {/* Main Bold Headline with Split Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="block text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400 mb-2">
            Software Engineer &bull; Full-Stack &amp; AI
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-black dark:text-white uppercase">
            SINGANABOYINA <br className="hidden sm:inline" />
            <span className="relative inline-block text-black dark:text-white">
              SASIKUMAR
              <span className="inline-block text-[#00f0ff] ml-1">.</span>
            </span>
          </h1>
        </motion.div>

        {/* Animated Rotating Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-10 sm:h-12 flex items-center justify-center mb-6 overflow-hidden"
        >
          <div className="flex items-center gap-2 text-lg sm:text-2xl font-mono font-medium">
            <span className="text-neutral-500 dark:text-neutral-400">&gt; I am a</span>
            <motion.span
              key={roleIndex}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-black dark:text-white font-bold bg-[#00f0ff]/30 dark:bg-[#00f0ff]/20 px-2 py-0.5 rounded border border-[#00f0ff]/50"
            >
              {roles[roleIndex]}
            </motion.span>
          </div>
        </motion.div>

        {/* Short Punchy Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed mb-10"
        >
          Engineering modern full-stack web architectures with React and Node.js,
          building production-ready machine learning solutions in Python, and turning
          complex algorithms into elegant, resilient digital products.
        </motion.p>

        {/* Magnetic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          {/* Primary Magnetic Button */}
          <Magnetic strength={0.4}>
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 rounded-full bg-[#00f0ff] text-black font-bold text-sm tracking-wider uppercase hover:bg-[#66f4ff] transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.5)] flex items-center gap-2 group cursor-pointer"
            >
              <span>View Selected Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
            </button>
          </Magnetic>

          {/* Secondary Magnetic Button */}
          <Magnetic strength={0.4}>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-black dark:text-white font-bold text-sm tracking-wider uppercase hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </Magnetic>
        </motion.div>

        {/* Quick Social & Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center gap-6 text-neutral-500 dark:text-neutral-400"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full hover:text-black dark:hover:text-[#00f0ff] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-full hover:text-black dark:hover:text-[#00f0ff] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Direct Email"
            className="p-2 rounded-full hover:text-black dark:hover:text-[#00f0ff] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Prompt Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        onClick={() => scrollToSection("about")}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
          Scroll Down
        </span>
        <div className="w-5 h-9 rounded-full border border-black/20 dark:border-white/20 flex justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#00f0ff]" />
        </div>
      </motion.div>
    </section>
  );
}
