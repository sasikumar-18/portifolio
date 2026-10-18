import { useState } from "react";
import { Code2, Database, LayoutTemplate, Server, Wrench, Search, Award, CheckCircle2, Terminal } from "lucide-react";
import { skillGroups, certifications } from "../../../data/content";

const icons = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  wrench: Wrench,
};

export default function SkillsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"visual" | "ts">("visual");

  const filteredGroups = skillGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text">
      {/* Tab Control Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2d2d2d] bg-[#252526] px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#858585]">&gt; sasikumar-portfolio / src / data / skills.ts</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#858585]" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-[#3d3d3d] bg-[#1e1e1e] py-1 pl-8 pr-3 text-xs text-white placeholder-[#858585] focus:border-[#007acc] focus:outline-none"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center rounded bg-[#1e1e1e] p-0.5">
            <button
              onClick={() => setViewMode("visual")}
              className={`rounded px-2 py-1 text-[11px] transition ${
                viewMode === "visual" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
              }`}
            >
              Visual
            </button>
            <button
              onClick={() => setViewMode("ts")}
              className={`rounded px-2 py-1 text-[11px] transition ${
                viewMode === "ts" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
              }`}
            >
              TypeScript
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      {viewMode === "visual" ? (
        <div className="flex-1 overflow-auto p-5 lg:p-7">
          <div className="mx-auto max-w-5xl space-y-8">
            {/* Technical Pillars Grid */}
            <div className="grid gap-5 md:grid-cols-2">
              {filteredGroups.map((group) => {
                const Icon = icons[group.icon] || Code2;

                return (
                  <div
                    key={group.title}
                    className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-5 shadow-lg transition-all hover:border-[#007acc]/40"
                  >
                    <div className="mb-4 flex items-center gap-2.5 border-b border-[#333333] pb-3">
                      <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#007acc]/30 bg-[#007acc]/10 text-[#38bdf8]">
                        <Icon size={16} />
                      </span>
                      <h3 className="font-display text-sm font-bold tracking-wide text-white uppercase">
                        {group.title}
                      </h3>
                      <span className="ml-auto font-mono text-[10px] text-[#858585]">
                        {group.items.length} skills
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 rounded-xl border border-[#383838] bg-[#1e1e1e] px-3 py-1.5 text-xs font-semibold text-[#cccccc] transition hover:border-[#007acc] hover:text-white hover:shadow-md"
                        >
                          <span className="grid h-5 w-5 place-items-center rounded bg-[#2d2d2d] font-mono text-[10px] font-bold text-[#38bdf8]">
                            {skill.mark}
                          </span>
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certifications & Badges */}
            <div className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-6">
              <div className="mb-4 flex items-center gap-2">
                <Award size={18} className="text-[#38bdf8]" />
                <h3 className="font-display text-base font-bold text-white uppercase">
                  Verified Industry Certifications
                </h3>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex flex-col justify-between rounded-xl border border-[#333333] bg-[#1e1e1e] p-4 transition hover:border-[#007acc]/40"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#858585]">
                        <span>{cert.issuer}</span>
                        <span className="rounded bg-[#007acc]/15 px-1.5 py-0.5 text-[#38bdf8]">
                          {cert.date}
                        </span>
                      </div>
                      <h4 className="mt-2 text-xs font-bold text-white">
                        {cert.title}
                      </h4>
                      {cert.details && (
                        <p className="mt-1 text-[11px] leading-relaxed text-[#9d9d9d]">
                          {cert.details}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                      <CheckCircle2 size={12} /> Authenticated Credential
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TypeScript Source File View */
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-6 scrollbar-thin">
          <div className="flex min-w-[550px]">
            <div className="select-none pr-4 text-right text-[#858585]">
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>

            <pre className="flex-1 whitespace-pre">
              <code>
                <span className="text-[#6a9955]">// Technical Competencies Matrix</span>{"\n"}
                <span className="text-[#c586c0]">export interface</span>{" "}
                <span className="text-[#4ec9b0]">TechnicalStack</span> {"{\n"}
                {"  "}languages: <span className="text-[#4ec9b0]">string</span>[];{"\n"}
                {"  "}frontend: <span className="text-[#4ec9b0]">string</span>[];{"\n"}
                {"  "}backend: <span className="text-[#4ec9b0]">string</span>[];{"\n"}
                {"  "}databases: <span className="text-[#4ec9b0]">string</span>[];{"\n"}
                {"  "}machineLearning: <span className="text-[#4ec9b0]">string</span>[];{"\n"}
                {"  "}toolsAndDevOps: <span className="text-[#4ec9b0]">string</span>[];{"\n"}
                {"}\n\n"}
                <span className="text-[#c586c0]">export const</span>{" "}
                <span className="text-[#9cdcfe]">skills</span>:{" "}
                <span className="text-[#4ec9b0]">TechnicalStack</span> = {"{\n"}
                {"  "}languages: [<span className="text-[#ce9178]">"Python"</span>, <span className="text-[#ce9178]">"Java"</span>, <span className="text-[#ce9178]">"C++"</span>, <span className="text-[#ce9178]">"JavaScript"</span>],{"\n"}
                {"  "}frontend: [<span className="text-[#ce9178]">"HTML5"</span>, <span className="text-[#ce9178]">"CSS3"</span>, <span className="text-[#ce9178]">"React.js"</span>],{"\n"}
                {"  "}backend: [<span className="text-[#ce9178]">"Node.js"</span>, <span className="text-[#ce9178]">"Express"</span>, <span className="text-[#ce9178]">"REST APIs"</span>],{"\n"}
                {"  "}databases: [<span className="text-[#ce9178]">"MySQL"</span>, <span className="text-[#ce9178]">"MongoDB"</span>],{"\n"}
                {"  "}machineLearning: [<span className="text-[#ce9178]">"Scikit-learn"</span>, <span className="text-[#ce9178]">"OpenCV"</span>, <span className="text-[#ce9178]">"Data Analysis"</span>],{"\n"}
                {"  "}toolsAndDevOps: [<span className="text-[#ce9178]">"Git"</span>, <span className="text-[#ce9178]">"GitHub"</span>, <span className="text-[#ce9178]">"Agile"</span>, <span className="text-[#ce9178]">"AWS"</span>]{"\n"}
                {"};\n"}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
