import { useState } from "react";
import { ExternalLink, Github, Code, Layers, Sparkles, Filter, ChevronRight, CheckCircle2, Terminal } from "lucide-react";
import { projects, Project } from "../../../data/content";
import { profile } from "../../../data/profile";
import Thumb from "../../Thumb";

export default function ProjectsTab() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewFormat, setViewFormat] = useState<"cards" | "json">("cards");

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "fullstack", label: "Full-Stack Web" },
    { id: "aiml", label: "AI & Machine Learning" },
    { id: "api", label: "APIs & Cloud" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "fullstack") return p.stack.includes("React.js") || p.stack.includes("Node.js");
    if (activeFilter === "aiml") return p.stack.includes("OpenCV") || p.stack.includes("Scikit-learn") || p.stack.includes("Machine Learning");
    if (activeFilter === "api") return p.stack.includes("Flask") || p.stack.includes("AWS") || p.stack.includes("REST APIs");
    return true;
  });

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text">
      {/* Tab Control Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2d2d2d] bg-[#252526] px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#858585]">&gt; sasikumar-portfolio / src / projects.tsx</span>
          <span className="rounded bg-[#333333] px-2 py-0.5 text-[10px] font-mono text-[#38bdf8]">
            {filteredProjects.length} items
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Format Toggle: Cards vs JSON */}
          <div className="flex items-center rounded bg-[#1e1e1e] p-0.5">
            <button
              onClick={() => setViewFormat("cards")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] transition ${
                viewFormat === "cards" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
              }`}
            >
              <Layers size={13} /> Cards
            </button>
            <button
              onClick={() => setViewFormat("json")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] transition ${
                viewFormat === "json" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
              }`}
            >
              <Code size={13} /> projects.json
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      {viewFormat === "cards" ? (
        <div className="flex-1 overflow-auto p-5 lg:p-7">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 flex items-center gap-1 text-xs text-[#858585]">
                <Filter size={13} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    activeFilter === cat.id
                      ? "bg-[#007acc] text-white shadow-sm"
                      : "bg-[#252526] text-[#cccccc] hover:bg-[#2d2d2d] hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#2d2d2d] bg-[#252526] transition-all duration-300 hover:border-[#007acc]/60 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                >
                  {/* Thumbnail Preview */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-[#2d2d2d] bg-[#1a1a1a]">
                    <Thumb kind={project.kind} />
                    <div className="absolute right-3 top-3">
                      <span className="rounded-md border border-[#007acc]/40 bg-[#1e1e1e]/90 px-2.5 py-1 font-mono text-[10px] font-bold text-[#38bdf8] backdrop-blur-md">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#9d9d9d] line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-[#3d3d3d] bg-[#1e1e1e] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#cccccc]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: Live Demo and Repo */}
                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between border-t border-[#333333] pt-3.5">
                        <div className="flex items-center gap-2">
                          {/* Live Demo */}
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg bg-[#007acc] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0098ff]"
                          >
                            <ExternalLink size={13} /> Live Demo
                          </a>

                          {/* Repo Button */}
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg border border-[#3d3d3d] bg-[#1e1e1e] px-3 py-1.5 text-xs font-semibold text-[#cccccc] transition hover:border-[#007acc] hover:text-white"
                          >
                            <Github size={13} /> Code
                          </a>
                        </div>

                        {/* Inspect Details */}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-0.5 text-xs font-medium text-[#858585] transition hover:text-[#38bdf8]"
                        >
                          Specs <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* JSON Raw Editor View */
        <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-6 scrollbar-thin">
          <div className="flex min-w-[600px]">
            {/* Line numbers */}
            <div className="select-none pr-4 text-right text-[#858585]">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>
            {/* Formatted JSON */}
            <pre className="flex-1 whitespace-pre text-[#9cdcfe]">
              <code>
                {`{\n`}
                {`  "developer": `}
                <span className="text-[#ce9178]">"{profile.name}"</span>
                {`,\n`}
                {`  "repository": `}
                <span className="text-[#ce9178]">"{profile.github}"</span>
                {`,\n`}
                {`  "projects": [\n`}
                {projects.map((p, i) => (
                  <span key={p.id}>
                    {`    {\n`}
                    {`      "id": `}
                    <span className="text-[#ce9178]">"{p.id}"</span>
                    {`,\n`}
                    {`      "title": `}
                    <span className="text-[#ce9178]">"{p.title}"</span>
                    {`,\n`}
                    {`      "status": `}
                    <span className="text-[#ce9178]">"{p.status}"</span>
                    {`,\n`}
                    {`      "stack": `}
                    <span className="text-[#4ec9b0]">{JSON.stringify(p.stack)}</span>
                    {`,\n`}
                    {`      "demo": `}
                    <span className="text-[#ce9178]">"{p.demo}"</span>
                    {`,\n`}
                    {`      "repo": `}
                    <span className="text-[#ce9178]">"{p.repo}"</span>
                    {`\n    }${i < projects.length - 1 ? "," : ""}\n`}
                  </span>
                ))}
                {`  ]\n}`}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* Project Specs Inspection Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#3d3d3d] bg-[#1e1e1e] p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#2d2d2d] pb-4">
              <div>
                <span className="font-mono text-xs text-[#38bdf8] uppercase">
                  {selectedProject.status}
                </span>
                <h2 className="mt-1 font-display text-xl font-bold text-white">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-[#252526] text-white hover:bg-[#333333]"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-[#cccccc]">
              <div>
                <h4 className="font-mono font-bold text-[#858585] uppercase">Problem Solved</h4>
                <p className="mt-1 leading-relaxed text-[#d4d4d4]">{selectedProject.problem}</p>
              </div>

              <div>
                <h4 className="font-mono font-bold text-[#858585] uppercase">Key Features</h4>
                <ul className="mt-1.5 space-y-1.5">
                  {selectedProject.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#38bdf8]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono font-bold text-[#858585] uppercase">Engineering Contribution</h4>
                <p className="mt-1 leading-relaxed text-[#d4d4d4]">{selectedProject.contribution}</p>
              </div>

              {selectedProject.results && (
                <div>
                  <h4 className="font-mono font-bold text-[#858585] uppercase">Impact &amp; Results</h4>
                  <p className="mt-1 leading-relaxed font-semibold text-emerald-400">
                    {selectedProject.results}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-mono font-bold text-[#858585] uppercase">Technology Stack</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-[#3d3d3d] bg-[#252526] px-2.5 py-1 font-mono text-xs text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#2d2d2d] pt-4">
              <a
                href={selectedProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-[#3d3d3d] bg-[#252526] px-4 py-2 text-xs font-semibold text-white hover:border-[#007acc]"
              >
                <Github size={14} /> Open Repository
              </a>
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-[#007acc] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0098ff]"
              >
                <ExternalLink size={14} /> Launch Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
