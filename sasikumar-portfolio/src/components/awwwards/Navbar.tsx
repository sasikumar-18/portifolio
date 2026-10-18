import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Download, ArrowUpRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ["about", "skills", "projects", "experience", "education", "testimonials", "contact"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
      else if (window.scrollY < 300) setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/85 dark:bg-[#0a0a0a]/85 bg-[#f5f5f0]/85 backdrop-blur-lg border-b border-white/10 dark:border-white/10 border-black/10 py-3.5 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00f0ff] flex items-center justify-center font-black text-black font-mono text-sm tracking-tighter shadow-[0_0_15px_rgba(0,240,255,0.5)] group-hover:scale-105 transition-transform duration-200">
            S
          </div>
          <span className="font-display font-bold text-lg tracking-wider text-black dark:text-white uppercase">
            SASIKUMAR<span className="text-[#00f0ff]">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-1.5 text-xs font-medium tracking-wide uppercase rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-[#00f0ff] text-black font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Theme Switcher & Resume */}
        <div className="hidden md:flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#00f0ff] dark:hover:border-[#00f0ff] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            {dark ? (
              <Sun className="w-4 h-4 text-[#00f0ff] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-black transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Resume Download Button */}
          <a
            href="/Sasikumar_Resume.pdf"
            download="Sasikumar_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-transparent border border-black/20 dark:border-white/20 hover:border-[#00f0ff] dark:hover:border-[#00f0ff] text-black dark:text-white hover:text-black hover:bg-[#00f0ff] dark:hover:bg-[#00f0ff] transition-all duration-200 hover:shadow-[0_0_16px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Get in Touch CTA */}
          <button
            onClick={() => scrollTo("#contact")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00f0ff] text-black hover:bg-[#66f4ff] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] cursor-pointer hover:scale-105"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300"
          >
            {dark ? <Sun className="w-4 h-4 text-[#00f0ff]" /> : <Moon className="w-4 h-4 text-black" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 px-6 pt-4 pb-6 bg-[#f5f5f0]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-left py-2 text-sm font-semibold tracking-wider uppercase text-neutral-800 dark:text-neutral-200 hover:text-[#00f0ff] dark:hover:text-[#00f0ff] transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col gap-2.5">
            <a
              href="/Sasikumar_Resume.pdf"
              download="Sasikumar_Resume.pdf"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-black/20 dark:border-white/20 text-xs font-bold uppercase tracking-wider text-black dark:text-white"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00f0ff] text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.5)]"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
