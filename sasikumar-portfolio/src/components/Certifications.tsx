import { Award, CheckCircle } from "lucide-react";
import { certifications } from "../data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Certifications() {
  return (
    <section id="certs" className="section-pad">
      <SectionHeading
        title="Certifications &amp; Credentials"
        intro="Verified industry specializations across Artificial Intelligence, Python Full-Stack, Cloud APIs, and Data Analytics."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => {
          const isBlue = i % 2 === 0;

          return (
            <Reveal key={c.title + c.issuer} delay={i * 0.05}>
              <div className="glass-card h-full flex flex-col justify-between rounded-2xl border border-silver/15 bg-[#080916]/85 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:border-blue/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.3)] transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-xl border ${
                        isBlue
                          ? "bg-blue/15 border-blue/40 text-blue shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                          : "bg-red/15 border-red/40 text-red shadow-[0_0_12px_rgba(255,0,60,0.3)]"
                      }`}
                    >
                      <Award size={18} />
                    </span>
                    <span className="font-mono text-xs font-semibold text-silver-dark bg-black/70 px-2 py-0.5 rounded-md border border-silver/15">
                      {c.date}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-base font-extrabold text-white leading-snug">
                    {c.title}
                  </h3>

                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs font-bold text-blue">
                    <CheckCircle size={13} className="text-red shrink-0" /> {c.issuer}
                  </p>

                  {c.details && (
                    <p className="mt-2 text-xs leading-relaxed text-silver-dark">
                      {c.details}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
