import { X, ChevronRight, FileCode, Play, SplitSquareVertical } from "lucide-react";
import { vscodeFiles, VSCodeFileId } from "../../data/vscodeFiles";

interface VSCodeTabsProps {
  openFiles: VSCodeFileId[];
  activeFileId: VSCodeFileId;
  onSelectTab: (fileId: VSCodeFileId) => void;
  onCloseTab: (fileId: VSCodeFileId) => void;
}

export default function VSCodeTabs({
  openFiles,
  activeFileId,
  onSelectTab,
  onCloseTab,
}: VSCodeTabsProps) {
  const getFileIcon = (ext: string) => {
    switch (ext) {
      case "tsx":
        return <span className="font-mono text-[11px] font-bold text-[#38bdf8]">⚛</span>;
      case "ts":
        return <span className="font-mono text-[10px] font-bold text-[#3178c6]">TS</span>;
      case "json":
        return <span className="font-mono text-[10px] font-bold text-[#f59e0b]">{"{}"}</span>;
      case "env":
        return <span className="font-mono text-[11px] font-bold text-[#10b981]">⚙</span>;
      default:
        return <FileCode size={13} className="text-[#858585]" />;
    }
  };

  const currentFile = vscodeFiles.find((f) => f.id === activeFileId);

  return (
    <div className="flex select-none flex-col border-b border-[#2d2d2d] bg-[#252526]">
      {/* Tab strip */}
      <div className="flex items-center overflow-x-auto scrollbar-none">
        {openFiles.map((fileId) => {
          const file = vscodeFiles.find((f) => f.id === fileId);
          if (!file) return null;
          const isActive = activeFileId === file.id;

          return (
            <div
              key={file.id}
              onClick={() => onSelectTab(file.id)}
              className={`group flex h-9 shrink-0 cursor-pointer items-center gap-2 border-r border-[#2d2d2d] px-3.5 text-xs font-mono transition ${
                isActive
                  ? "relative bg-[#1e1e1e] text-white font-medium before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-[#007acc]"
                  : "bg-[#2d2d2d]/60 text-[#969696] hover:bg-[#2d2d2d] hover:text-[#cccccc]"
              }`}
            >
              {getFileIcon(file.extension)}
              <span className="truncate max-w-[140px]">{file.name}</span>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(file.id);
                }}
                className="ml-1 rounded p-0.5 text-[#858585] opacity-0 group-hover:opacity-100 hover:bg-[#383838] hover:text-white transition"
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Breadcrumbs Row */}
      <div className="flex h-6 items-center gap-1 bg-[#1e1e1e] px-4 font-mono text-[11px] text-[#858585]">
        <span>sasikumar-portfolio</span>
        <ChevronRight size={12} />
        <span>src</span>
        {currentFile && (
          <>
            <ChevronRight size={12} />
            <span className="flex items-center gap-1 text-[#cccccc]">
              {getFileIcon(currentFile.extension)}
              {currentFile.name}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
