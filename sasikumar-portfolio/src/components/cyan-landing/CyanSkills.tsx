import { useState } from "react";
import { Code2, Server, Database, Layout, Layers, Terminal, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "database" | "tools";
  level: number;
  description: string;
  tags: string[];
}

export default function CyanSkills() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "database">("all");

  // Primary requested skills with proficiency percentages
  const coreSkills: SkillItem[] = [
    {
      name: "React",
      category: "frontend",
      level: 95,
      description: "Component lifecycle, custom hooks, context API, state management, and SSR patterns.",
      tags: ["React 18", "Hooks", "Redux", "Zustand"],
    },
    {
      name: "Next.js",
      category: "frontend",
      level: 90,
      description: "App Router, Server Components, SSR/SSG rendering, SEO optimization, and API endpoints.",
      tags: ["App Router", "SSR", "Server Actions", "Turbopack"],
    },
    {
      name: "TypeScript",
      category: "frontend",
      level: 92,
      description: "Strict typing, generic types, interface contracts, and scalable full-stack codebases.",
      tags: ["Type Safety", "Generics", "Interfaces", "ESNext"],
    },
    {
      name: "Node.js",
      category: "backend",
      level: 90,
      description: "RESTful architecture, Express.js microservices, JWT authentication, and async pipelines.",
      tags: ["Express.js", "REST APIs", "JWT", "Microservices"],
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      level: 96,
      description: "Modern responsive utility design, custom design tokens, animations, and dark modes.",
      tags: ["Utility-First", "Responsive", "Custom Themes", "Animation"],
    },
    {
      name: "PostgreSQL",
      category: "database",
      level: 88,
      description: "Relational database schema modeling, complex SQL queries, indexing, and migrations.",
      tags: ["Relational", "SQL Queries", "Prisma", "Transactions"],
    },
    // Supporting full stack competencies
    {
      name: "MongoDB",
      category: "database",
      level: 90,
      description: "NoSQL document stores, aggregation pipelines, schema indexing, and Mongoose ODM.",
      tags: ["NoSQL", "Aggregations", "Mongoose", "Atlas"],
    },
    {
      name: "Python & AI/ML",
      category: "backend",
      level: 88,
      description: "Computer vision with OpenCV, Scikit-learn predictive models, and Flask APIs.",
      tags: ["OpenCV", "Scikit-learn", "Flask", "Data Analysis"],
    },
    {
      name: "REST APIs & Security",
      category: "backend",
      level: 92,
      description: "Role-based auth, rate limiting, encryption middleware, and CORS security protocols.",
      tags: ["API Contracts", "CORS", "Rate Limit", "Sanitization"],
    },
    {
      name: "Git, GitHub & Agile",
      category: "tools",
      level: 94,
      description: "Version control branching, Pull Request reviews, CI/CD deployment, and agile sprints.",
      tags: ["Git Flow", "CI/CD", "Agile Sprints", "Code Reviews"],
    },
  ];

  const filteredSkills = coreSkills.filter((s) => {
    if (activeTab === "all") return true;
    return s.category === activeTab;
  });

  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] rounded-full bg-cyan/10 blur-[160px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1 font-mono text-xs font-semibold text-cyan mb-3">
            <Sparkles size={13} />
            <span>CORE TECHNICAL MATRIX</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills &amp; Technologies
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Engineered with a modern full stack focus. Measured proficiency bars across frontend architectures, backend API services, and high-performance databases.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Technologies" },
              { id: "frontend", label: "Frontend Stacks" },
              { id: "backend", label: "Backend & Systems" },
              { id: "database", label: "Databases & Storage" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-cyan text-black shadow-[0_0_20px_#00f0ff] font-bold"
                    : "glass-cyan text-slate-300 hover:text-white hover:border-cyan/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid with Proficiency Bars */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="glass-cyan-card group relative overflow-hidden rounded-2xl p-6 transition-all"
            >
              {/* Top Row: Skill Name & Level Percentage */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 font-mono text-sm font-bold text-cyan group-hover:border-cyan group-hover:shadow-[0_0_15px_#00f0ff] transition-all">
                    {skill.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-cyan transition-colors">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[10px] text-cyan/80 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-display text-xl font-extrabold text-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.7)]">
                    {skill.level}%
                  </span>
                  <div className="text-[10px] font-mono text-slate-400">
                    Proficiency
                  </div>
                </div>
              </div>

              {/* Glowing Proficiency Bar */}
              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/60 border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan via-[#38bdf8] to-[#0284c7] shadow-[0_0_12px_#00f0ff] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="mt-3.5 text-xs text-slate-300 leading-relaxed">
                {skill.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-cyan/15">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner on Education & Foundation */}
        <div className="mt-12 glass-cyan-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-cyan/30">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan/40 bg-cyan/10 text-cyan shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white">
                B.Tech in Information Technology · JNTUA (2023–2026)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Grounded in core Computer Science: Object-Oriented Programming, Data Structures, Algorithms, Database Management Systems, and Cloud Architectures.
              </p>
            </div>
          </div>

          <a
            href="#projects"
            className="btn-cyan shrink-0 !text-xs !py-2.5 !px-5"
          >
            <span>Explore Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
}
