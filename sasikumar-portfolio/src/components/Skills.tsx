import { Code2, Database, LayoutTemplate, Server, Wrench } from "lucide-react";
import { skillGroups } from "../data/content";
import SkillsSphere3D from "./3d/SkillsSphere3D";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <SectionHeading
        title="Technical Skills &amp; 3D Matrix"
        intro="Interact directly with the 3D rotating skill sphere, or review competencies organized by domain."
      />

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Interactive 3D Sphere */}
        <Reveal>
          <div className="glass-card relative overflow-hidden rounded-3xl border border-silver/20 bg-[#070916]/85 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            <SkillsSphere3D />
          </div>
        </Reveal>

        {/* Categorized Technical Pillars */}
        <div className="space-y-4">
          {skillGroups.map((group, gi) => {
            const Icon = icons[group.icon];
            const isBlue = gi % 2 === 0;

            return (
              <Reveal key={group.title} delay={gi * 0.05}>
                <div className="glass-card rounded-2xl border border-silver/15 bg-[#080a18]/80 p-4.5 hover:border-blue/50 transition-all">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg border text-white ${
                        isBlue
                          ? "bg-blue/15 border-blue/40 text-blue shadow-[0_0_10px_rgba(0,210,255,0.3)]"
                          : "bg-red/15 border-red/40 text-red shadow-[0_0_10px_rgba(255,0,60,0.3)]"
                      }`}
                    >
                      <Icon size={16} />
                    </span>
                    <h3 className="font-display text-sm font-bold tracking-wide text-white uppercase">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <li
                        key={skill.name}
                        className="flex items-center gap-1.5 rounded-lg border border-silver/15 bg-black/70 py-1 pl-1.5 pr-2.5 text-xs font-semibold text-silver-light transition hover:border-blue hover:text-white"
                      >
                        <span
                          aria-hidden
                          className={`grid h-5 w-5 place-items-center rounded bg-black/60 font-mono text-[9px] font-bold ${
                            (gi + si) % 2 === 0 ? "text-blue border border-blue/30" : "text-red border border-red/30"
                          }`}
                        >
                          {skill.mark}
                        </span>
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
