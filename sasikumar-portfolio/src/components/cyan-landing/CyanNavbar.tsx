import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Code, Sparkles, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../../data/profile";

interface CyanNavbarProps {
  onSwitchMode?: (mode: "cyan" | "3d") => void;
}

export default function CyanNavbar({ onSwitchMode }: CyanNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-[#050814]/90 backdrop-blur-md border-b border-cyan/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo */}
        <a href="#top" className="group flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/10 font-mono text-base font-bold text-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all group-hover:scale-105 group-hover:border-cyan group-hover:shadow-[0_0_25px_#00f0ff]">
            S
          </span>
          <span>
            sasikumar<span className="text-cyan drop-shadow-[0_0_10px_#00f0ff]">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 sm:flex">
          {/* Mode Switcher to 3D */}
          {onSwitchMode && (
            <button
              onClick={() => onSwitchMode("3d")}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300 transition hover:border-cyan/50 hover:text-white"
              title="View in 3D Scene Mode"
            >
              <Sparkles size={13} className="text-cyan" />
              <span>3D Mode</span>
            </button>
          )}

          {/* Mode Switcher to 3D */}
          {onSwitchMode && (
            <button
              onClick={() => onSwitchMode("3d")}
              className="hidden lg:flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300 transition hover:border-cyan/50 hover:text-white"
              title="View in 3D Scene Mode"
            >
              <Sparkles size={13} className="text-cyan" />
              <span>3D</span>
            </button>
          )}

          {/* Download CV CTA */}
          <a
            href={profile.resume}
            download
            className="btn-cyan !py-2 !px-4 !text-xs"
          >
            <Download size={13} />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-cyan/20 bg-cyan/5 text-white md:hidden hover:border-cyan hover:text-cyan"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-cyan/20 bg-[#050814]/98 px-6 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-3 font-display text-base">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 font-semibold text-slate-200 transition hover:bg-cyan/15 hover:text-cyan"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4">
            {onSwitchMode && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchMode("3d");
                }}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 py-2 font-mono text-xs font-semibold text-slate-300"
              >
                <Sparkles size={14} className="text-cyan" /> 3D Mode
              </button>
            )}

            <a
              href={profile.resume}
              download
              className="btn-cyan w-full text-center"
            >
              <Download size={14} /> Download CV (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
