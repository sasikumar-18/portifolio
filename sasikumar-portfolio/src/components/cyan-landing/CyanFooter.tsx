import { ArrowUp, Github, Linkedin, Mail, Phone, Heart } from "lucide-react";
import { profile } from "../../data/profile";

export default function CyanFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-cyan/20 bg-[#04060f] py-14 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-cyan/10 blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand & Subtitle */}
          <div className="text-center md:text-left">
            <a href="#top" className="inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-white group">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/10 font-mono text-sm font-bold text-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                S
              </span>
              <span>
                sasikumar<span className="text-cyan drop-shadow-[0_0_10px_#00f0ff]">.dev</span>
              </span>
            </a>
            <p className="mt-2 text-xs text-slate-400 font-mono">
              Full Stack Web Developer &amp; Software Engineer · JNTUA
            </p>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons & Back to Top Button */}
          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan hover:text-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              title="GitHub"
            >
              <Github size={16} />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan hover:text-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              title="LinkedIn"
            >
              <Linkedin size={16} />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan hover:text-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              title="Email"
            >
              <Mail size={16} />
            </a>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group grid h-10 w-10 place-items-center rounded-xl border border-cyan/40 bg-cyan/10 text-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all hover:bg-cyan hover:text-black hover:shadow-[0_0_25px_#00f0ff]"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Singanaboyina Sasikumar. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Built with React, Next-gen Tailwind &amp; Glowing Glassmorphism</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
