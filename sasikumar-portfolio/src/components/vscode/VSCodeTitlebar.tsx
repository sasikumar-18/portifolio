import { Search, Minus, Square, X, Terminal, SplitSquareVertical, Sparkles } from "lucide-react";

interface VSCodeTitlebarProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
  isTerminalOpen: boolean;
  onSwitchTo3DView?: () => void;
}

export default function VSCodeTitlebar({
  onOpenCommandPalette,
  onToggleTerminal,
  isTerminalOpen,
  onSwitchTo3DView,
}: VSCodeTitlebarProps) {
  const menus = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

  return (
    <header className="flex h-9 select-none items-center justify-between border-b border-[#2d2d2d] bg-[#323233] px-3 text-xs text-[#cccccc]">
      {/* Left: Window Controls + Menu bar */}
      <div className="flex items-center gap-3">
        {/* Mac-style traffic lights */}
        <div className="flex items-center gap-1.5 pr-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] transition hover:opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] transition hover:opacity-80" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] transition hover:opacity-80" />
        </div>

        {/* Menu Items */}
        <nav aria-label="Editor Menu" className="hidden items-center gap-2 md:flex text-[#cccccc]">
          {menus.map((m) => (
            <button
              key={m}
              onClick={onOpenCommandPalette}
              className="rounded px-1.5 py-0.5 transition hover:bg-[#454545] hover:text-white"
            >
              {m}
            </button>
          ))}
        </nav>
      </div>

      {/* Center: Command Palette Search Bar */}
      <div className="flex-1 max-w-sm px-2">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[#454545] bg-[#1e1e1e] py-1 px-3 text-[11px] text-[#858585] transition hover:border-[#007acc] hover:text-[#cccccc]"
        >
          <Search size={12} />
          <span className="truncate">sasikumar-portfolio — Visual Studio Code</span>
          <kbd className="hidden sm:inline-block rounded border border-[#454545] bg-[#2d2d2d] px-1 text-[9px] text-[#cccccc]">
            Ctrl+P
          </kbd>
        </button>
      </div>

      {/* Right: Quick Actions & Windows Controls */}
      <div className="flex items-center gap-2">
        {/* Toggle Terminal Button */}
        <button
          onClick={onToggleTerminal}
          className={`rounded p-1 text-[#cccccc] transition hover:bg-[#454545] hover:text-white ${
            isTerminalOpen ? "bg-[#454545] text-white" : ""
          }`}
          title="Toggle Integrated Terminal"
        >
          <Terminal size={14} />
        </button>

        {/* 3D View Switcher */}
        {onSwitchTo3DView && (
          <button
            onClick={onSwitchTo3DView}
            className="hidden sm:flex items-center gap-1 rounded bg-[#007acc]/20 px-2 py-0.5 text-[10px] font-semibold text-[#38bdf8] border border-[#007acc]/40 hover:bg-[#007acc] hover:text-white transition"
            title="Toggle between VS Code mode and 3D Studio mode"
          >
            <Sparkles size={11} /> 3D View
          </button>
        )}

        {/* Windows style minimize/maximize/close icons for completeness */}
        <div className="hidden sm:flex items-center gap-1 pl-2 text-[#858585]">
          <span className="p-1 hover:text-white cursor-pointer">
            <Minus size={11} />
          </span>
          <span className="p-1 hover:text-white cursor-pointer">
            <Square size={10} />
          </span>
          <span className="p-1 hover:text-[#ff5f56] cursor-pointer">
            <X size={12} />
          </span>
        </div>
      </div>
    </header>
  );
}
