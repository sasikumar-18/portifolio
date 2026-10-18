import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const duration = 1600; // total ms
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // easeOutQuad for smooth counter feel
      const progress = currentStep / steps;
      const eased = Math.min(1, progress * (2 - progress));
      const val = Math.floor(eased * 100);

      setCount(val);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(100);
        setTimeout(() => {
          setComplete(true);
          setTimeout(onComplete, 700);
        }, 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#040408] p-8 sm:p-12 text-[#f2f2f7]"
        >
          {/* Top metadata */}
          <div className="flex items-center justify-between font-mono text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue animate-ping" />
              <span>INITIALIZING 3D ENVIRONMENT</span>
            </span>
            <span>THREE.JS · REACT · GSAP</span>
          </div>

          {/* Center Title and Counter */}
          <div className="my-auto max-w-4xl">
            <p className="font-mono text-sm tracking-widest text-blue uppercase mb-2">
              Portfolio Experience
            </p>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              SINGANABOYINA <br />
              <span className="grad-text">SASIKUMAR</span>
            </h1>
            <p className="mt-4 font-mono text-xs sm:text-sm text-slate-400">
              SOFTWARE ENGINEER · FULL-STACK &amp; AI BUILDER
            </p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div>
            <div className="flex items-end justify-between font-mono">
              <span className="text-xs text-slate-500">SYSTEM READY: {count}%</span>
              <span className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white">
                {count.toString().padStart(2, "0")}
                <span className="text-red text-2xl">%</span>
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-blue via-silver to-red shadow-[0_0_15px_#00d2ff]"
                style={{ width: `${count}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
