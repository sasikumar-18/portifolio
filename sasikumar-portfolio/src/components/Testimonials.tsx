import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { testimonials } from "../data/testimonials";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-pad">
      <SectionHeading
        title="Endorsements & Recommendations"
        intro="Feedback from project advisors, industry internship leads, and technical evaluators."
      />

      <Reveal>
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="glass-card relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-silver/20 bg-[#080916]/90 p-8 sm:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.85)]"
        >
          {/* Ambient Glow in Electric Blue and Fiery Red */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-red/20 blur-3xl pointer-events-none" />

          {/* Top Quote Icon & Index Counter */}
          <div className="flex items-center justify-between border-b border-silver/15 pb-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue/15 border border-blue/30 text-blue shadow-[0_0_15px_rgba(0,210,255,0.3)]">
              <Quote size={22} />
            </span>
            <div className="flex items-center gap-2 font-mono text-xs text-silver-dark">
              <Sparkles size={14} className="text-red" />
              <span>
                {current + 1} / {testimonials.length}
              </span>
            </div>
          </div>

          {/* Carousel Slide Area */}
          <div className="min-h-[200px] sm:min-h-[170px] py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <p className="font-display text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-silver-light italic">
                  "{t.quote}"
                </p>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {t.name}
                    </h3>
                    <p className="text-sm text-blue font-medium">
                      {t.role} · <span className="text-silver-dark">{t.organization}</span>
                    </p>
                    <p className="text-xs font-mono text-silver-dark mt-0.5">
                      {t.relation}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span key={tag} className="chip !text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Bottom Controls */}
          <div className="flex items-center justify-between border-t border-silver/15 pt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === idx
                      ? "w-8 bg-gradient-to-r from-blue via-silver to-red shadow-[0_0_8px_#00d2ff]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-xl border border-silver/20 bg-white/5 text-white transition hover:border-blue hover:text-blue hover:shadow-[0_0_15px_rgba(0,210,255,0.3)]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-xl border border-silver/20 bg-white/5 text-white transition hover:border-red hover:text-red hover:shadow-[0_0_15px_rgba(255,0,60,0.3)]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
