import { useState, useEffect } from "react";
import { Download, Menu, X, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

interface NavigationProps {
  onOpenSectionModal?: (section: "about" | "skills" | "projects" | "contact") => void;
}

export default function Navigation({ onOpenSectionModal }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about", modal: "about" as const },
    { label: "Skills", href: "#skills", modal: "skills" as const },
    { label: "Projects", href: "#projects", modal: "projects" as const },
    { label: "Contact", href: "#contact", modal: "contact" as const },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-black/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
        {/* Brand Name */}
        <a href="#top" className="group flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 font-mono text-sm font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all group-hover:border-white group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
            S
          </span>
          <span className="tracking-widest uppercase">
            SASIKUMAR
          </span>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (link.modal && onOpenSectionModal) {
                  onOpenSectionModal(link.modal);
                } else {
                  const target = document.querySelector(link.href);
                  target?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-semibold tracking-wide text-slate-300 transition-colors hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA: Resume & Socials */}
        <div className="hidden items-center gap-4 sm:flex">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/40 hover:text-white"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/40 hover:text-white"
            title="LinkedIn"
          >
            <Linkedin size={16} />
          </a>

          <a
            href={personalInfo.resumeUrl}
            download
            className="flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/10 px-4 py-2 font-mono text-xs font-semibold text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            <Download size={13} />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-white md:hidden hover:border-white"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-black/95 px-6 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3 font-display text-base">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.modal && onOpenSectionModal) {
                    onOpenSectionModal(link.modal);
                  } else {
                    const target = document.querySelector(link.href);
                    target?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-left rounded-lg p-2 font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="mt-5 border-t border-white/10 pt-4">
            <a
              href={personalInfo.resumeUrl}
              download
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 font-mono text-xs font-bold text-black"
            >
              <Download size={14} /> Download Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
