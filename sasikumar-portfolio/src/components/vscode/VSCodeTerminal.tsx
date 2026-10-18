import { useState, useRef, useEffect } from "react";
import { Terminal, X, ChevronUp, ChevronDown, Check, Trash2 } from "lucide-react";
import { VSCodeFileId } from "../../data/vscodeFiles";
import { profile } from "../../data/profile";

interface VSCodeTerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenFile: (fileId: VSCodeFileId) => void;
}

interface CommandHistoryItem {
  command: string;
  output: string | JSX.Element;
}

export default function VSCodeTerminal({
  isOpen,
  onToggle,
  onOpenFile,
}: VSCodeTerminalProps) {
  const [activeTab, setActiveTab] = useState<"problems" | "output" | "debug" | "terminal">("terminal");
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "npm run start:portfolio",
      output: (
        <div className="space-y-1 text-xs">
          <div className="text-emerald-400">✓ Compiled successfully in 142ms.</div>
          <div className="text-[#858585]">
            Type <span className="text-[#38bdf8] font-bold">help</span> to view available interactive CLI commands.
          </div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && activeTab === "terminal") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen, activeTab]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let res: string | JSX.Element = "";

    switch (lower) {
      case "help":
        res = (
          <div className="space-y-1 text-xs text-[#cccccc]">
            <div>Available Commands:</div>
            <div>
              <span className="text-[#38bdf8] font-bold">about</span> - Open About Me &amp; Typed Bio
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">projects</span> - View Projects, Live Demos &amp; Repos
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">skills</span> - Explore Technical Skills Matrix
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">contributions</span> - Open GitHub Contributions Heatmap
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">contact</span> - Transmit message or copy contact info
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">resume</span> - Download Sasikumar's official Resume PDF
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">whoami</span> - Display developer title and credentials
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">git status</span> - Check Git repository status
            </div>
            <div>
              <span className="text-[#38bdf8] font-bold">clear</span> (or cls) - Clear terminal screen
            </div>
          </div>
        );
        break;

      case "about":
        onOpenFile("about");
        res = "Switching to src/about.tsx...";
        break;

      case "projects":
        onOpenFile("projects");
        res = "Switching to src/projects.tsx...";
        break;

      case "skills":
        onOpenFile("skills");
        res = "Switching to src/data/skills.ts...";
        break;

      case "contributions":
        onOpenFile("contributions");
        res = "Switching to src/contributions.tsx...";
        break;

      case "contact":
        onOpenFile("contact");
        res = "Switching to .env.production...";
        break;

      case "resume":
        window.open(profile.resume, "_blank");
        res = "Opening official Resume PDF in new tab...";
        break;

      case "whoami":
        res = `${profile.name} - ${profile.role} (B.Tech IT, JNTUA 2023-2026)`;
        break;

      case "git status":
        res = "On branch main. Your branch is up to date with 'origin/main'. Nothing to commit, working tree clean.";
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        res = `command not found: "${cmd}". Type "help" for a list of available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div className="flex h-56 shrink-0 select-text flex-col border-t border-[#2d2d2d] bg-[#1e1e1e] font-mono text-xs text-[#cccccc]">
      {/* Panel Tab Header */}
      <div className="flex h-8 select-none items-center justify-between border-b border-[#2d2d2d] bg-[#252526] px-4">
        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => setActiveTab("problems")}
            className={`transition ${activeTab === "problems" ? "text-white font-bold border-b-2 border-[#007acc] pb-1" : "text-[#858585] hover:text-[#cccccc]"}`}
          >
            PROBLEMS <span className="rounded bg-[#333333] px-1.5 py-0.2 text-[10px]">0</span>
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`transition ${activeTab === "output" ? "text-white font-bold border-b-2 border-[#007acc] pb-1" : "text-[#858585] hover:text-[#cccccc]"}`}
          >
            OUTPUT
          </button>
          <button
            onClick={() => setActiveTab("debug")}
            className={`transition ${activeTab === "debug" ? "text-white font-bold border-b-2 border-[#007acc] pb-1" : "text-[#858585] hover:text-[#cccccc]"}`}
          >
            DEBUG CONSOLE
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-1 transition ${activeTab === "terminal" ? "text-white font-bold border-b-2 border-[#007acc] pb-1" : "text-[#858585] hover:text-[#cccccc]"}`}
          >
            <Terminal size={12} /> TERMINAL
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#858585]">
          <button
            onClick={() => setHistory([])}
            className="hover:text-white"
            title="Clear Terminal"
          >
            <Trash2 size={13} />
          </button>
          <button onClick={onToggle} className="hover:text-white" title="Close Panel">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal View Content */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        {activeTab === "terminal" && (
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-[#38bdf8]">
                  <span className="text-emerald-400">sasikumar@workstation:~$</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="pl-4 text-[#cccccc]">{item.output}</div>
              </div>
            ))}

            {/* Live Command Prompt Input */}
            <form onSubmit={handleCommand} className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold shrink-0">sasikumar@workstation:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type a command (e.g. help, about, projects)..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder-[#555555]"
                autoFocus
              />
            </form>
            <div ref={bottomRef} />
          </div>
        )}

        {activeTab === "problems" && (
          <div className="flex h-full items-center justify-center text-[#858585]">
            No problems have been detected in the workspace.
          </div>
        )}

        {activeTab === "output" && (
          <div className="space-y-1 text-[#858585]">
            <div>[info] Vite development server running on port 5173.</div>
            <div>[info] React 18 and TypeScript transpilation active.</div>
            <div>[ready] All components initialized in 0.2s.</div>
          </div>
        )}

        {activeTab === "debug" && (
          <div className="text-[#858585]">
            Debugger connected to JNTUA runtime environment. Ready to inspect.
          </div>
        )}
      </div>
    </div>
  );
}
