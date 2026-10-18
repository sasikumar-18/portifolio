import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import Magnetic from "./Magnetic";
import { personalInfo } from "../../data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-black/10 dark:border-white/10 pt-20 pb-12 px-6 sm:px-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top Tier: Giant Brand Name & Back To Top */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-16 border-b border-black/10 dark:border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#0284c7] dark:text-[#00f0ff] font-bold block mb-2">
              PORTFOLIO // 2026 EDITION
            </span>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-black dark:text-white uppercase leading-none">
              SASIKUMAR<span className="text-[#00f0ff]">.</span>
            </h2>
          </div>

          {/* Magnetic Back to Top Button */}
          <Magnetic strength={0.4}>
            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#00f0ff] dark:hover:bg-[#00f0ff] hover:text-black transition-all duration-200 shadow-lg group cursor-pointer"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </button>
          </Magnetic>
        </div>

        {/* Middle Tier: Navigation Links & Socials */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Col 1: Bio Note */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-base uppercase text-black dark:text-white">
              SINGANABOYINA SASIKUMAR
            </h4>
            <p className="max-w-md text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Full-Stack Developer and Python Machine Learning Engineer specializing in modern
              web applications, OpenCV vision pipelines, and resilient cloud architectures.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Sections
            </h5>
            <ul className="space-y-1.5 text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400">
              <li>
                <a href="#about" className="hover:text-[#0284c7] dark:hover:text-[#00f0ff] transition-colors">
                  01 // About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#0284c7] dark:hover:text-[#00f0ff] transition-colors">
                  02 // Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#0284c7] dark:hover:text-[#00f0ff] transition-colors">
                  03 // Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#0284c7] dark:hover:text-[#00f0ff] transition-colors">
                  04 // Experience
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#0284c7] dark:hover:text-[#00f0ff] transition-colors">
                  05 // Education
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#0284c7] dark:hover:text-[#00f0ff] transition-colors">
                  06 // Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0284c7] dark:hover:text-[#00f0ff] transition-colors">
                  07 // Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Links & Availability */}
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Connect
            </h5>
            <div className="flex flex-col gap-2 text-xs font-mono">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#00f0ff] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub (sasikumar-18)</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#00f0ff] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-[#00f0ff] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Sasikumar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Meta */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} SINGANABOYINA SASIKUMAR. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span>ALL SYSTEMS NOMINAL &bull; 60 FPS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
