import { useState } from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { experiences, timeline } from "../../../data/content";

export default function ExperienceTab() {
  const [tabMode, setTabMode] = useState<"timeline" | "json">("timeline");

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text">
      {/* Tab Control Bar */}
      <div className="flex items-center justify-between border-b border-[#2d2d2d] bg-[#252526] px-4 py-2 text-xs">
        <span className="font-mono text-[#858585]">&gt; sasikumar-portfolio / src / data / experience.json</span>

        <div className="flex items-center rounded bg-[#1e1e1e] p-0.5">
          <button
            onClick={() => setTabMode("timeline")}
            className={`rounded px-2 py-1 text-[11px] transition ${
              tabMode === "timeline" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setTabMode("json")}
            className={`rounded px-2 py-1 text-[11px] transition ${
              tabMode === "json" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
            }`}
          >
            JSON
          </button>
        </div>
      </div>

      {/* Main Body */}
      {tabMode === "timeline" ? (
        <div className="flex-1 overflow-auto p-5 lg:p-7">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Internships Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Briefcase size={16} className="text-[#38bdf8]" />
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Internships &amp; Engineering Experience
                </h3>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.company}
                    className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-5 shadow-lg transition hover:border-[#007acc]/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#333333] pb-3">
                      <div>
                        <h4 className="font-display text-base font-bold text-white">
                          {exp.role}
                        </h4>
                        <div className="font-mono text-xs font-semibold text-[#38bdf8]">
                          {exp.company}
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 rounded-full bg-[#007acc]/15 px-3 py-1 font-mono text-xs text-[#38bdf8]">
                        <Calendar size={12} /> {exp.period}
                      </span>
                    </div>

                    <ul className="mt-3.5 space-y-2 text-xs text-[#cccccc]">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Education Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap size={16} className="text-[#ff003c]" />
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Academic Milestones
                </h3>
              </div>

              <div className="space-y-4">
                {timeline.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-5 transition hover:border-[#ff003c]/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-white">
                        {item.title}
                      </h4>
                    </div>

                    <div className="mt-1 font-mono text-xs text-[#858585]">
                      {item.place}
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-[#9d9d9d]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* JSON Raw View */
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-6 scrollbar-thin">
          <div className="flex min-w-[500px]">
            <div className="select-none pr-4 text-right text-[#858585]">
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>
            <pre className="flex-1 whitespace-pre text-[#9cdcfe]">
              <code>
                {JSON.stringify({ experiences, timeline }, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
