import { useState, useEffect, useRef } from "react";
import { Search, FileCode, ExternalLink, Download, Terminal, Sparkles, X } from "lucide-react";
import { vscodeFiles, VSCodeFileId } from "../../data/vscodeFiles";
import { profile } from "../../data/profile";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (fileId: VSCodeFileId) => void;
  onToggleTerminal: () => void;
  onSwitchTo3DView?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenFile,
  onToggleTerminal,
  onSwitchTo3DView,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Combine files and system commands
  const allActions = [
    ...vscodeFiles.map((f) => ({
      id: f.id,
      title: f.name,
      subtitle: f.description,
      type: "file" as const,
      action: () => onOpenFile(f.id),
    })),
    {
      id: "resume",
      title: "Download Resume (PDF)",
      subtitle: "Official resume of Singanaboyina Sasikumar",
      type: "action" as const,
      action: () => window.open(profile.resume, "_blank"),
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      subtitle: profile.github,
      type: "action" as const,
      action: () => window.open(profile.github, "_blank"),
    },
    {
      id: "linkedin",
      title: "Open LinkedIn Profile",
      subtitle: profile.linkedin,
      type: "action" as const,
      action: () => window.open(profile.linkedin, "_blank"),
    },
    {
      id: "terminal",
      title: "Toggle Integrated Terminal",
      subtitle: "Open interactive CLI shell",
      type: "action" as const,
      action: () => onToggleTerminal(),
    },
  ];

  const filtered = allActions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-16 backdrop-blur-sm select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[#3d3d3d] bg-[#252526] shadow-2xl font-mono text-xs text-[#cccccc]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 border-b border-[#333333] bg-[#1e1e1e] px-3 py-2.5">
          <Search size={14} className="text-[#858585]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a file name or command to execute..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-[#858585]"
          />
          <button onClick={onClose} className="text-[#858585] hover:text-white">
            <X size={14} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-1 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-[#858585]">
              No matching files or commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition ${
                    isSelected ? "bg-[#007acc] text-white" : "hover:bg-[#2d2d2d]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.type === "file" ? (
                      <FileCode size={14} className={isSelected ? "text-white" : "text-[#38bdf8]"} />
                    ) : (
                      <Terminal size={14} className={isSelected ? "text-white" : "text-emerald-400"} />
                    )}
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div
                        className={`text-[10px] ${
                          isSelected ? "text-white/80" : "text-[#858585]"
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] ${isSelected ? "text-white" : "text-[#858585]"}`}>
                    ↵ Enter
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
