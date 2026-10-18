import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { experiences } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <SectionHeading
        title="Experience // Vertical Timeline"
        intro="Professional industrial internships developing predictive machine learning pipelines and full-stack web applications."
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Central glowing vertical timeline line in Blue and Red */}
        <div
          aria-hidden
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue via-silver to-red opacity-70 shadow-[0_0_12px_#00d2ff]"
        />

        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Glowing Pin */}
                <div
                  aria-hidden
                  className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 z-10 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#040408] shadow-[0_0_20px_#00d2ff]"
                >
                  <span
                    className={`h-3 w-3 rounded-full ${
                      isEven ? "bg-blue shadow-[0_0_10px_#00d2ff]" : "bg-red shadow-[0_0_10px_#ff003c]"
                    }`}
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full pl-12 sm:pl-0 sm:w-1/2 ${
                    isEven ? "sm:pl-10" : "sm:pr-10"
                  }`}
                >
                  <div className="glass-card rounded-2xl border border-silver/20 bg-[#080916]/90 p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:border-blue/50 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-silver/15 pb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue/10 border border-blue/30 px-2.5 py-1 font-mono text-xs font-bold text-blue">
                        <Briefcase size={13} /> {exp.role}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-xs text-red font-semibold">
                        <Calendar size={12} /> {exp.period}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-lg sm:text-xl font-extrabold text-white">
                      {exp.company}
                    </h3>

                    <ul className="mt-3.5 space-y-2 text-sm text-silver">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            size={15}
                            className={`mt-1 shrink-0 ${isEven ? "text-blue" : "text-red"}`}
                          />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
