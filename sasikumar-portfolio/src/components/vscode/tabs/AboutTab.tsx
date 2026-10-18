import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, FastForward, Eye, Code, Download, ExternalLink, ShieldCheck, Sparkles, MapPin, Mail, Phone, GraduationCap } from "lucide-react";
import { profile } from "../../../data/profile";
import { professionalSummary } from "../../../data/content";

const CODE_STRING = `/**
 * @file about.tsx
 * @author Singanaboyina Sasikumar
 * @role Software Engineer
 * @degree B.Tech in Information Technology (JNTUA)
 */

import { SoftwareEngineer, DeveloperProfile } from "@sasikumar/core";

export const sasikumar: DeveloperProfile = {
  name: "SINGANABOYINA SASIKUMAR",
  role: "Software Engineer",
  education: {
    degree: "B.Tech in Information Technology",
    university: "Sri Venkateswara College of Engg & Tech (JNTUA)",
    batch: "2023 - 2026",
    diploma: "Diploma in EEE (SV Govt Polytechnic, 2020 - 2023)",
  },
  status: "🟢 Available for Software Engineering Opportunities",
  location: "Andhra Pradesh, India",
  summary: "${professionalSummary.replace(/"/g, '\\"')}",
  coreSkills: {
    languages: ["Python", "Java", "C++", "JavaScript"],
    web: ["React.js", "Node.js", "Express", "HTML5", "CSS3", "REST APIs"],
    databases: ["MySQL", "MongoDB"],
    ai_ml: ["Scikit-learn", "OpenCV", "Data Processing", "Data Visualization"],
    tools: ["Git", "GitHub", "Agile", "AWS", "VS Code"],
  },
  internships: [
    {
      company: "Technex IIT (BHU) Varanasi & ElSystems",
      role: "Machine Learning with Python Intern",
      period: "Aug 2025 - Nov 2025",
    },
    {
      company: "VaultofCodes",
      role: "Web Development Intern",
      period: "Internship",
    },
  ],
  passions: [
    "Architecting scalable, resilient web applications",
    "Real-time computer vision & predictive machine learning",
    "Continuous algorithmic learning and clean software design",
  ],
};

export default function renderProfile() {
  return <SasikumarProductionReady profile={sasikumar} />;
}`;

interface AboutTabProps {
  onNavigateTab: (tabId: string) => void;
}

export default function AboutTab({ onNavigateTab }: AboutTabProps) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<1 | 2 | 4>(2);
  const [isTyping, setIsTyping] = useState(true);
  const [viewMode, setViewMode] = useState<"code" | "preview" | "split">("split");
  const codeContainerRef = useRef<HTMLDivElement>(null);

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;
    if (typedIndex >= CODE_STRING.length) {
      setIsTyping(false);
      return;
    }

    const baseDelay = 14;
    const delay = Math.max(3, Math.floor(baseDelay / speedMultiplier));

    const timeout = setTimeout(() => {
      // Advance by chunk if fast
      const step = speedMultiplier === 4 ? 4 : speedMultiplier === 2 ? 2 : 1;
      setTypedIndex((prev) => Math.min(CODE_STRING.length, prev + step));
    }, delay);

    return () => clearTimeout(timeout);
  }, [typedIndex, isTyping, speedMultiplier]);

  const displayedCode = CODE_STRING.slice(0, typedIndex);
  const lines = displayedCode.split("\n");
  const isComplete = typedIndex >= CODE_STRING.length;

  const handleSkip = () => {
    setTypedIndex(CODE_STRING.length);
    setIsTyping(false);
  };

  const handleReplay = () => {
    setTypedIndex(0);
    setIsTyping(true);
  };

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#2d2d2d] bg-[#252526] px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#858585]">&gt; sasikumar-portfolio / src / about.tsx</span>
          {isTyping && (
            <span className="flex items-center gap-1.5 rounded-full bg-[#007acc]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#38bdf8]">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#38bdf8]" />
              Typing code... ({Math.floor((typedIndex / CODE_STRING.length) * 100)}%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Typing Controls */}
          {isTyping ? (
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 rounded bg-[#333333] px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-[#007acc]"
              title="Skip typing and display full code"
            >
              <FastForward size={13} /> Skip Typing
            </button>
          ) : (
            <button
              onClick={handleReplay}
              className="flex items-center gap-1 rounded bg-[#333333] px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-[#007acc]"
              title="Replay typing animation"
            >
              <RotateCcw size={13} /> Replay
            </button>
          )}

          {/* Speed Toggle */}
          <div className="hidden items-center rounded bg-[#1e1e1e] p-0.5 sm:flex">
            {([1, 2, 4] as const).map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`rounded px-1.5 py-0.5 text-[10px] font-mono transition ${
                  speedMultiplier === spd ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center rounded bg-[#1e1e1e] p-0.5">
            <button
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] transition ${
                viewMode === "code" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
              }`}
            >
              <Code size={13} /> <span className="hidden md:inline">Code</span>
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`hidden md:flex items-center gap-1 rounded px-2 py-1 text-[11px] transition ${
                viewMode === "split" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
              }`}
            >
              <span>Split</span>
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] transition ${
                viewMode === "preview" ? "bg-[#007acc] text-white" : "text-[#858585] hover:text-white"
              }`}
            >
              <Eye size={13} /> <span className="hidden md:inline">Live Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code Editor Pane */}
        {(viewMode === "code" || viewMode === "split") && (
          <div
            ref={codeContainerRef}
            className={`flex-1 overflow-auto font-mono text-[13px] leading-6 scrollbar-thin ${
              viewMode === "split" ? "border-r border-[#2d2d2d]" : ""
            }`}
          >
            <div className="flex min-w-[580px] p-4">
              {/* Line Numbers Gutter */}
              <div className="select-none pr-4 text-right font-mono text-xs text-[#858585]">
                {lines.map((_, i) => (
                  <div key={i} className="h-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Code Tokens */}
              <div className="flex-1 whitespace-pre font-mono">
                {lines.map((line, idx) => (
                  <div key={idx} className="h-6 hover:bg-[#282828]/50">
                    {renderSyntaxHighlightedLine(line)}
                    {idx === lines.length - 1 && isTyping && (
                      <span className="inline-block h-4 w-2 animate-pulse bg-[#007acc] align-middle" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Component Preview Pane */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className="flex-1 overflow-auto bg-[#181818] p-5 lg:p-7">
            <div className="mx-auto max-w-2xl space-y-6">
              {/* Profile Card Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-[#2d2d2d] bg-[#1e1e1e] p-6 shadow-xl">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#007acc]/15 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#ff003c]/15 blur-3xl pointer-events-none" />

                <div className="relative flex flex-col items-center gap-5 sm:flex-row">
                  {/* Avatar / Workstation image */}
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[#007acc]/50 shadow-[0_0_20px_rgba(0,122,204,0.3)]">
                    <img
                      src="/workstation.jpg"
                      alt={profile.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-[#1e1e1e] bg-emerald-500" />
                  </div>

                  {/* Intro info */}
                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-display">
                      {profile.name}
                    </h1>

                    <p className="font-mono text-sm font-semibold text-[#38bdf8]">
                      {profile.role} · Full-Stack &amp; AI Builder
                    </p>

                    <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-[#9d9d9d] sm:justify-start">
                      <span className="flex items-center gap-1">
                        <GraduationCap size={13} className="text-[#38bdf8]" /> JNTUA (2023–2026)
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={13} className="text-[#ff003c]" /> Andhra Pradesh, India
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio paragraph */}
                <div className="mt-5 border-t border-[#2d2d2d] pt-4 text-xs sm:text-sm leading-relaxed text-[#cccccc]">
                  {professionalSummary}
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigateTab("projects")}
                    className="flex items-center gap-1.5 rounded-lg bg-[#007acc] px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#0098ff]"
                  >
                    View Projects <ExternalLink size={13} />
                  </button>

                  <button
                    onClick={() => onNavigateTab("contact")}
                    className="flex items-center gap-1.5 rounded-lg border border-[#3d3d3d] bg-[#252526] px-4 py-2 text-xs font-semibold text-white transition hover:border-[#007acc]"
                  >
                    Contact Me
                  </button>

                  <a
                    href={profile.resume}
                    download
                    className="flex items-center gap-1.5 rounded-lg border border-[#3d3d3d] bg-[#252526] px-4 py-2 text-xs font-semibold text-[#cccccc] transition hover:text-white"
                  >
                    <Download size={13} /> Resume (PDF)
                  </a>
                </div>
              </div>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Engineering Focus", value: "3+ Years", color: "text-[#38bdf8]" },
                  { label: "Projects Completed", value: "15+", color: "text-[#ff003c]" },
                  { label: "ML Recognition Accuracy", value: "90%", color: "text-[#38bdf8]" },
                  { label: "API Cloud Uptime", value: "99%", color: "text-[#ff003c]" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#2d2d2d] bg-[#1e1e1e] p-3 text-center"
                  >
                    <div className={`font-display text-xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[11px] text-[#858585]">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Education & Core Focus Card */}
              <div className="rounded-xl border border-[#2d2d2d] bg-[#1e1e1e] p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                  <ShieldCheck size={16} className="text-[#38bdf8]" /> Education &amp; Credentials
                </h3>
                <div className="mt-3 space-y-3 text-xs text-[#cccccc]">
                  <div className="flex items-start justify-between border-b border-[#2d2d2d] pb-2.5">
                    <div>
                      <div className="font-semibold text-white">B.Tech in Information Technology</div>
                      <div className="text-[#858585]">Sri Venkateswara College of Engg &amp; Tech (JNTUA)</div>
                    </div>
                    <span className="font-mono text-[#38bdf8]">2023 – 2026</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-white">Diploma in Electrical &amp; Electronics</div>
                      <div className="text-[#858585]">Sri Venkateswara Govt Polytechnic, Tirupati</div>
                    </div>
                    <span className="font-mono text-[#858585]">2020 – 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Lightweight syntax highlighter for TypeScript code
function renderSyntaxHighlightedLine(line: string) {
  // Comments
  if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
    return <span className="text-[#6a9955]">{line}</span>;
  }

  // Keywords & types pattern
  const tokens = line.split(/(\s+|[{}()[\],:;=<>"])/g);

  return (
    <span>
      {tokens.map((token, i) => {
        if (!token) return null;

        // Keywords
        if (
          ["import", "from", "export", "const", "default", "function", "return", "type", "interface"].includes(
            token
          )
        ) {
          return (
            <span key={i} className="text-[#c586c0] font-semibold">
              {token}
            </span>
          );
        }

        // Builtin Types
        if (["DeveloperProfile", "SoftwareEngineer", "string", "number", "boolean"].includes(token)) {
          return (
            <span key={i} className="text-[#4ec9b0]">
              {token}
            </span>
          );
        }

        // Functions / tags
        if (["renderProfile", "SasikumarProductionReady"].includes(token)) {
          return (
            <span key={i} className="text-[#dcdcaa]">
              {token}
            </span>
          );
        }

        // Strings
        if (token.startsWith('"') || token.endsWith('"') || token.includes('"')) {
          return (
            <span key={i} className="text-[#ce9178]">
              {token}
            </span>
          );
        }

        // Numbers
        if (/^\d+$/.test(token)) {
          return (
            <span key={i} className="text-[#b5cea8]">
              {token}
            </span>
          );
        }

        // Identifiers
        if (["name", "role", "education", "status", "location", "summary", "coreSkills", "languages", "web", "databases", "ai_ml", "tools", "internships", "passions"].includes(token)) {
          return (
            <span key={i} className="text-[#9cdcfe]">
              {token}
            </span>
          );
        }

        return <span key={i}>{token}</span>;
      })}
    </span>
  );
}
