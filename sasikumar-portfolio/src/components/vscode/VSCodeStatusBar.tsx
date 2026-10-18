import { GitBranch, RefreshCw, AlertCircle, AlertTriangle, Check, Bell, Radio } from "lucide-react";
import { VSCodeFileId, vscodeFiles } from "../../data/vscodeFiles";

interface VSCodeStatusBarProps {
  activeFileId: VSCodeFileId;
  onToggleTerminal: () => void;
}

export default function VSCodeStatusBar({
  activeFileId,
  onToggleTerminal,
}: VSCodeStatusBarProps) {
  const file = vscodeFiles.find((f) => f.id === activeFileId);

  const getLanguageMode = (ext?: string) => {
    switch (ext) {
      case "tsx":
        return "TypeScript JSX";
      case "ts":
        return "TypeScript";
      case "json":
        return "JSON";
      case "env":
        return "Properties";
      default:
        return "Plain Text";
    }
  };

  return (
    <footer className="flex h-6 select-none items-center justify-between bg-[#007acc] px-3 font-mono text-[11px] text-white">
      {/* Left side items */}
      <div className="flex items-center gap-3">
        {/* Remote & Branch */}
        <button
          onClick={onToggleTerminal}
          className="flex items-center gap-1 transition hover:bg-[#005a9e] px-1.5 py-0.5 rounded"
          title="Git: main (synchronized)"
        >
          <GitBranch size={12} />
          <span>main*</span>
        </button>

        <button
          onClick={onToggleTerminal}
          className="hidden sm:flex items-center gap-1 transition hover:bg-[#005a9e] px-1 rounded"
          title="Synchronize Changes"
        >
          <RefreshCw size={11} />
        </button>

        {/* Problems count */}
        <button
          onClick={onToggleTerminal}
          className="flex items-center gap-1.5 transition hover:bg-[#005a9e] px-1.5 py-0.5 rounded"
          title="0 Errors, 0 Warnings"
        >
          <span className="flex items-center gap-0.5">
            <AlertCircle size={12} /> 0
          </span>
          <span className="flex items-center gap-0.5">
            <AlertTriangle size={12} /> 0
          </span>
        </button>

        <span className="hidden md:inline text-white/80">
          Singanaboyina Sasikumar · Software Engineer
        </span>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">Ln 24, Col 12</span>
        <span className="hidden sm:inline">Spaces: 2</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden md:inline">LF</span>
        <span className="rounded bg-[#005a9e] px-1.5 py-0.2 font-semibold">
          {getLanguageMode(file?.extension)}
        </span>
        <span className="flex items-center gap-1 text-emerald-200" title="Prettier Formatter">
          <Check size={12} /> Prettier
        </span>
        <button className="hover:text-white" title="Notifications">
          <Bell size={12} />
        </button>
      </div>
    </footer>
  );
}
