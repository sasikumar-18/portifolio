import { useState } from "react";
import { ExternalLink, Github, Sparkles, ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { profile } from "../../data/profile";
import Thumb from "../Thumb";

interface ProjectItem {
  id: string;
  title: string;
  category: "fullstack" | "nextjs" | "aiml";
  status: string;
  kind: "shop" | "medicine" | "house" | "api" | "vision";
  summary: string;
  features: string[];
  stack: string[];
  demo: string;
  repo: string;
  highlight: string;
}

export default function CyanProjects() {
  const [filter, setFilter] = useState<"all" | "fullstack" | "nextjs" | "aiml">("all");

  const projectList: ProjectItem[] = [
    {
      id: "ecommerce-fullstack",
      title: "Full-Stack E-Commerce Platform",
      category: "fullstack",
      status: "Production Ready",
      kind: "shop",
      summary:
        "End-to-end shopping platform with seamless user authentication, persistent cart workflows, simulated payments, and optimized MongoDB aggregation schemas.",
      features: [
        "JWT bearer authentication and protected customer routes",
        "Dynamic cart synchronization with stock validation",
        "Fast REST APIs built with Express and Node.js",
        "Responsive glassmorphism UI styled with Tailwind CSS",
      ],
      stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST APIs"],
      demo: profile.github,
      repo: profile.github,
      highlight: "Sub-40ms database queries & zero-downtime cart updates",
    },
    {
      id: "cloud-task-analytics",
      title: "Cloud Analytics & Task Management Platform",
      category: "nextjs",
      status: "Next.js & TypeScript",
      kind: "api",
      summary:
        "Full-stack team workspace featuring real-time sprint boards, interactive metric charts, role-based permissions, and relational PostgreSQL integration.",
      features: [
        "Server-rendered dashboards using Next.js App Router",
        "Strict TypeScript type safety from DB layer to UI",
        "PostgreSQL database connected with high-speed query indexing",
        "Instant CRUD operations with optimistic UI updates",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "Prisma"],
      demo: profile.github,
      repo: profile.github,
      highlight: "100% TypeScript coverage with sub-50ms API endpoints",
    },
    {
      id: "face-recognition-attendance",
      title: "AI Face Recognition Attendance System",
      category: "aiml",
      status: "90% ML Accuracy",
      kind: "medicine",
      summary:
        "Real-time computer vision pipeline automating attendance tracking using OpenCV Haar cascades and trained machine learning classification algorithms.",
      features: [
        "Real-time video feed face detection & feature vector extraction",
        "Trained ML models achieving 90% facial verification accuracy",
        "Automated attendance records logged into SQL database",
        "Prevents proxy attendance with duplicate detection logic",
      ],
      stack: ["Python", "OpenCV", "Machine Learning", "PostgreSQL/SQL", "Flask"],
      demo: profile.github,
      repo: profile.github,
      highlight: "Achieved 90% identification accuracy during live testing",
    },
    {
      id: "house-price-prediction",
      title: "Real Estate Valuation & Prediction Engine",
      category: "aiml",
      status: "85% Accuracy · AWS",
      kind: "house",
      summary:
        "Data-driven property valuation engine with regression modeling in Scikit-learn, deployed as an automated REST API on AWS cloud infrastructure.",
      features: [
        "Exploratory data analysis and feature transformation pipelines",
        "Trained regression models delivering 85% price prediction accuracy",
        "Lightweight Flask microservice with automated health checks",
        "Cloud hosted on AWS with 99% verified service uptime",
      ],
      stack: ["Python", "Scikit-learn", "Flask", "AWS", "React", "REST APIs"],
      demo: profile.github,
      repo: profile.github,
      highlight: "Deployed on AWS cloud with 99% production uptime",
    },
    {
      id: "rest-api-microservices",
      title: "Microservices REST API & Security Hub",
      category: "fullstack",
      status: "High Throughput",
      kind: "vision",
      summary:
        "High-performance backend API service with token rotation, rate limiting, granular route permissions, and comprehensive error auditing.",
      features: [
        "JWT bearer authentication and refresh token rotation",
        "Express middleware for request validation and IP rate limiting",
        "Structured error handling and real-time activity telemetry",
        "PostgreSQL and MongoDB hybrid caching layer",
      ],
      stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "MongoDB", "JWT"],
      demo: profile.github,
      repo: profile.github,
      highlight: "Handles 1,000+ requests/sec with comprehensive error auditing",
    },
  ];

  const filteredProjects = projectList.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 -right-48 h-[36rem] w-[36rem] rounded-full bg-cyan/10 blur-[170px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1 font-mono text-xs font-semibold text-cyan mb-3">
            <Layers size={13} />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Selected Projects
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Featured full-stack web applications, cloud APIs, and AI-powered systems. Built with clean architecture, strict typing, and glowing cyan glassmorphism aesthetics.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Projects" },
              { id: "fullstack", label: "Full-Stack Web" },
              { id: "nextjs", label: "Next.js & TypeScript" },
              { id: "aiml", label: "AI & Machine Learning" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  filter === cat.id
                    ? "bg-cyan text-black shadow-[0_0_20px_#00f0ff] font-bold"
                    : "glass-cyan text-slate-300 hover:text-white hover:border-cyan/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-cyan-card group flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:border-cyan hover:shadow-[0_15px_45px_-10px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.35)]"
            >
              {/* Thumbnail / UI Visual */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-cyan/20 bg-[#060a16]">
                <Thumb kind={project.kind} />
                <div className="absolute top-3 right-3">
                  <span className="rounded-full border border-cyan/40 bg-black/80 px-3 py-1 font-mono text-[10px] font-bold text-cyan shadow-[0_0_12px_rgba(0,240,255,0.4)] backdrop-blur-md">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Key Features Bullet Points */}
                <div className="mt-4 space-y-1.5 border-t border-cyan/15 pt-3">
                  {project.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-cyan" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-cyan/20 bg-cyan/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlight Badge */}
                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 px-3 py-2 font-mono text-[11px] text-emerald-400">
                  ⚡ {project.highlight}
                </div>

                {/* Action Buttons: Live Demo & Repo */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-3 border-t border-cyan/20 pt-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyan flex-1 !text-xs !py-2.5"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>

                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn glass-cyan-card flex-1 !text-xs !py-2.5 text-white hover:border-cyan hover:text-cyan"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
