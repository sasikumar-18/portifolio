import { useState } from "react";
import { ChevronDown, ChevronRight, FileCode, FileJson, FileText, Folder, FolderOpen, MoreHorizontal, Sparkles, GitCommit, Search, Blocks, ShieldCheck } from "lucide-react";
import { vscodeFiles, VSCodeFileId } from "../../data/vscodeFiles";
import { ActivityBarTab } from "./VSCodeActivityBar";

interface VSCodeSidebarProps {
  activityTab: ActivityBarTab;
  activeFileId: VSCodeFileId;
  onOpenFile: (fileId: VSCodeFileId) => void;
  openFiles: VSCodeFileId[];
}

export default function VSCodeSidebar({
  activityTab,
  activeFileId,
  onOpenFile,
  openFiles,
}: VSCodeSidebarProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const [isSrcOpen, setIsSrcOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="flex h-full w-60 shrink-0 select-none flex-col border-r border-[#2d2d2d] bg-[#252526] text-xs text-[#cccccc]">
      {activityTab === "explorer" && (
        <>
          {/* Header */}
          <div className="flex h-9 items-center justify-between px-4 text-[11px] font-semibold tracking-wider text-[#bbbbbb] uppercase">
            <span>Explorer</span>
            <button className="text-[#858585] hover:text-white">
              <MoreHorizontal size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto font-mono text-xs scrollbar-thin">
            {/* Open Editors Section */}
            <div className="border-b border-[#2d2d2d] pb-2">
              <div className="flex items-center gap-1 px-3 py-1 text-[11px] font-bold text-[#858585] uppercase">
                <ChevronDown size={14} /> Open Editors ({openFiles.length})
              </div>
              <div className="mt-1 space-y-0.5">
                {openFiles.map((fileId) => {
                  const file = vscodeFiles.find((f) => f.id === fileId);
                  if (!file) return null;
                  const isActive = activeFileId === file.id;

                  return (
                    <button
                      key={file.id}
                      onClick={() => onOpenFile(file.id)}
                      className={`flex w-full items-center gap-2 px-6 py-1 text-left text-xs transition ${
                        isActive
                          ? "bg-[#37373d] text-white font-medium"
                          : "text-[#cccccc] hover:bg-[#2a2d2e]"
                      }`}
                    >
                      {getFileIcon(file.extension)}
                      <span className="truncate">{file.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Workspace Project Tree */}
            <div className="pt-2">
              {/* Root Project */}
              <button
                onClick={() => setIsFolderOpen(!isFolderOpen)}
                className="flex w-full items-center gap-1.5 px-3 py-1 font-bold text-[#cccccc] hover:text-white"
              >
                {isFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span className="tracking-wide">SASIKUMAR-WORKSPACE</span>
              </button>

              {isFolderOpen && (
                <div className="mt-1 space-y-0.5">
                  {/* src folder */}
                  <button
                    onClick={() => setIsSrcOpen(!isSrcOpen)}
                    className="flex w-full items-center gap-1.5 pl-6 pr-3 py-1 text-[#cccccc] hover:text-white"
                  >
                    {isSrcOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    {isSrcOpen ? (
                      <FolderOpen size={14} className="text-[#dcb67a]" />
                    ) : (
                      <Folder size={14} className="text-[#dcb67a]" />
                    )}
                    <span>src</span>
                  </button>

                  {/* Files inside src */}
                  {isSrcOpen && (
                    <div className="space-y-0.5">
                      {vscodeFiles.map((file) => {
                        const isActive = activeFileId === file.id;

                        return (
                          <button
                            key={file.id}
                            onClick={() => onOpenFile(file.id)}
                            className={`flex w-full items-center gap-2 pl-10 pr-3 py-1 text-left transition ${
                              isActive
                                ? "bg-[#37373d] text-white font-semibold"
                                : "text-[#cccccc] hover:bg-[#2a2d2e]"
                            }`}
                          >
                            {getFileIcon(file.extension)}
                            <span className="truncate">{file.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Root config files */}
                  <div className="pl-6 pt-1 space-y-0.5 text-[#9d9d9d]">
                    <div className="flex items-center gap-2 px-3 py-1">
                      <FileJson size={13} className="text-[#f59e0b]" /> package.json
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1">
                      <FileCode size={13} className="text-[#38bdf8]" /> tsconfig.json
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1">
                      <FileText size={13} className="text-[#858585]" /> README.md
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activityTab === "search" && (
        <div className="p-3 space-y-3">
          <div className="text-[11px] font-semibold text-[#bbbbbb] uppercase">Search</div>
          <input
            type="text"
            placeholder="Search in files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded border border-[#3d3d3d] bg-[#1e1e1e] p-1.5 text-xs text-white placeholder-[#858585] focus:border-[#007acc] focus:outline-none font-mono"
          />
          <div className="text-[11px] text-[#858585]">
            Quickly jump between components or use <span className="text-[#38bdf8]">Ctrl+P</span>.
          </div>
        </div>
      )}

      {activityTab === "git" && (
        <div className="p-3 space-y-3 font-mono text-xs">
          <div className="text-[11px] font-semibold text-[#bbbbbb] uppercase">Source Control: Git</div>
          <div className="flex items-center gap-2 text-emerald-400">
            <GitCommit size={14} /> Branch: <span className="font-bold text-white">main</span>
          </div>
          <div className="rounded border border-[#3d3d3d] bg-[#1e1e1e] p-2 text-[11px] text-[#858585]">
            ✓ Working tree clean. All portfolio systems deployed and synchronized with remote GitHub origin.
          </div>
        </div>
      )}

      {activityTab === "extensions" && (
        <div className="p-3 space-y-3 font-mono text-xs">
          <div className="text-[11px] font-semibold text-[#bbbbbb] uppercase">Extensions Installed</div>
          <div className="space-y-2">
            {[
              { name: "Tailwind CSS IntelliSense", author: "Tailwind Labs", ver: "v0.12" },
              { name: "Prettier - Code Formatter", author: "Prettier", ver: "v10.4" },
              { name: "ESLint", author: "Microsoft", ver: "v3.0" },
              { name: "GitHub Theme", author: "GitHub", ver: "v6.3" },
            ].map((ext) => (
              <div key={ext.name} className="rounded border border-[#383838] bg-[#1e1e1e] p-2">
                <div className="font-semibold text-white">{ext.name}</div>
                <div className="text-[10px] text-[#858585]">{ext.author} · {ext.ver}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
