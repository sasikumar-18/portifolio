import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import MagneticButton from "./MagneticButton";
import SmartLink from "./SmartLink";

const ids = nav.map((n) => n.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open
          ? "glass !rounded-none !border-x-0 !border-t-0 border-b-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
          : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <MagneticButton href="#top" strength={15}>
          <span className="font-display text-xl font-extrabold tracking-tight text-white group cursor-pointer">
            sasikumar<span className="grad-text">.dev</span>
          </span>
        </MagneticButton>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "page" : undefined}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  active === n.id ? "text-blue font-bold" : "text-slate-300 hover:text-white"
                }`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-gradient-to-r from-blue via-silver to-red shadow-[0_0_12px_#00d2ff]"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <MagneticButton href={profile.resume} download strength={15}>
            <span className="btn-ghost hidden !py-2 !px-4 !text-xs sm:inline-flex">
              Resume (PDF)
            </span>
          </MagneticButton>

          <button
            type="button"
            className="glass grid h-10 w-10 place-items-center rounded-xl text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#040408]/98 border-b border-silver/20 px-5 pb-4 md:hidden font-mono"
          >
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-semibold text-white hover:bg-blue/15 hover:text-blue transition-colors"
                >
                  &gt; {n.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
