import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-6 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/30">
            05 // ENDORSEMENTS
          </span>
          <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-black dark:text-white uppercase tracking-tight">
            TESTIMONIALS<span className="text-[#00f0ff]">.</span>
          </h2>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Feedback and recommendations from mentors, academic advisors, and engineering team leads.
          </p>
        </div>
      </div>

      {/* Auto-sliding Carousel Box */}
      <div
        className="max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative rounded-3xl bg-[#ffffff] dark:bg-[#121212] border border-black/10 dark:border-white/10 p-8 sm:p-12 shadow-xl overflow-hidden min-h-[340px] flex flex-col justify-between">
          {/* Subtle Ambient Quote Background Icon */}
          <Quote className="absolute right-8 bottom-8 w-32 h-32 text-black/[0.03] dark:text-white/[0.03] pointer-events-none select-none" />

          {/* Testimonial Quote Animated Transition */}
          <div className="relative z-10 mb-8">
            <div className="flex items-center gap-1.5 text-[#00f0ff] mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#00f0ff]" />
              ))}
              <span className="ml-2 text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
                VERIFIED EVALUATION
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p className="text-lg sm:text-2xl text-black dark:text-neutral-100 font-sans font-medium leading-relaxed italic mb-8">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div>
                  <h4 className="font-display font-bold text-lg text-black dark:text-white uppercase tracking-wide">
                    {current.name}
                  </h4>
                  <p className="text-sm font-semibold text-[#0284c7] dark:text-[#00f0ff]">
                    {current.role} &bull; {current.organization}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {current.relation}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls & Dot Navigation */}
          <div className="relative z-10 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Jump to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"
                      : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#00f0ff] text-black dark:text-white hover:text-black hover:bg-[#00f0ff] dark:hover:bg-[#00f0ff] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-[#00f0ff] text-black dark:text-white hover:text-black hover:bg-[#00f0ff] dark:hover:bg-[#00f0ff] transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
