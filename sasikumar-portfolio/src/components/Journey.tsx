import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { timeline } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="section-pad">
      <SectionHeading
        title="Education &amp; Academic Timeline"
        intro="Formal academic qualification in Information Technology and Electrical &amp; Electronics Engineering."
      />

      <div className="relative mx-auto max-w-3xl">
        <ol className="relative ml-4 border-l-2 border-silver/20 pl-6 space-y-10">
          {timeline.map((t, i) => {
            const isBlue = i % 2 === 0;

            return (
              <motion.li
                key={t.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Glowing Node Icon in Electric Blue or Fiery Red */}
                <span
                  aria-hidden
                  className={`absolute -left-[35px] top-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#040408] ${
                    isBlue
                      ? "text-blue shadow-[0_0_15px_#00d2ff]"
                      : "text-red shadow-[0_0_15px_#ff003c]"
                  }`}
                >
                  <GraduationCap size={14} />
                </span>

                <div className="glass-card rounded-2xl border border-silver/15 bg-[#080916]/85 p-5 sm:p-6 hover:border-blue/50 transition-all">
                  <span className="font-mono text-xs font-bold text-blue">
                    {t.place.split("|")[1]?.trim() || "Academic Path"}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-white">
                    {t.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-red font-medium">
                    {t.place.split("|")[0]?.trim()}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-silver">
                    {t.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
