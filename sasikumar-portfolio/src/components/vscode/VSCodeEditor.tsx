import { useState, useEffect } from "react";
import VSCodeTitlebar from "./VSCodeTitlebar";
import VSCodeActivityBar, { ActivityBarTab } from "./VSCodeActivityBar";
import VSCodeSidebar from "./VSCodeSidebar";
import VSCodeTabs from "./VSCodeTabs";
import VSCodeStatusBar from "./VSCodeStatusBar";
import VSCodeTerminal from "./VSCodeTerminal";
import CommandPalette from "./CommandPalette";

// Tab Components
import AboutTab from "./tabs/AboutTab";
import ProjectsTab from "./tabs/ProjectsTab";
import SkillsTab from "./tabs/SkillsTab";
import ContributionsTab from "./tabs/ContributionsTab";
import ContactTab from "./tabs/ContactTab";
import ExperienceTab from "./tabs/ExperienceTab";

import { VSCodeFileId, vscodeFiles } from "../../data/vscodeFiles";

interface VSCodeEditorProps {
  onSwitchTo3DView?: () => void;
}

export default function VSCodeEditor({ onSwitchTo3DView }: VSCodeEditorProps) {
  const [openFiles, setOpenFiles] = useState<VSCodeFileId[]>([
    "about",
    "projects",
    "skills",
    "contributions",
    "contact",
  ]);
  const [activeFileId, setActiveFileId] = useState<VSCodeFileId>("about");
  const [activityTab, setActivityTab] = useState<ActivityBarTab>("explorer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global hotkeys (Ctrl+P for command palette, Ctrl+` for terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenFile = (fileId: VSCodeFileId) => {
    if (!openFiles.includes(fileId)) {
      setOpenFiles((prev) => [...prev, fileId]);
    }
    setActiveFileId(fileId);
  };

  const handleCloseTab = (fileId: VSCodeFileId) => {
    const newOpenFiles = openFiles.filter((id) => id !== fileId);
    setOpenFiles(newOpenFiles);

    if (activeFileId === fileId) {
      if (newOpenFiles.length > 0) {
        setActiveFileId(newOpenFiles[newOpenFiles.length - 1]);
      } else {
        // Default back to about if all tabs closed
        setOpenFiles(["about"]);
        setActiveFileId("about");
      }
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#1e1e1e] font-sans text-[#d4d4d4]">
      {/* 1. Titlebar */}
      <VSCodeTitlebar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        isTerminalOpen={isTerminalOpen}
        onSwitchTo3DView={onSwitchTo3DView}
      />

      {/* 2. Main Work Area (Activity Bar + Sidebar + Editor + Terminal) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar (leftmost icon strip) */}
        <VSCodeActivityBar
          activeTab={activityTab}
          onSelectTab={setActivityTab}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Sidebar (File Explorer / Search / Git) */}
        {isSidebarOpen && (
          <VSCodeSidebar
            activityTab={activityTab}
            activeFileId={activeFileId}
            onOpenFile={handleOpenFile}
            openFiles={openFiles}
          />
        )}

        {/* Editor Main Canvas */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[#1e1e1e]">
          {/* File Tabs Strip & Breadcrumbs */}
          <VSCodeTabs
            openFiles={openFiles}
            activeFileId={activeFileId}
            onSelectTab={setActiveFileId}
            onCloseTab={handleCloseTab}
          />

          {/* Active Tab Component Container */}
          <div className="flex-1 overflow-hidden">
            {activeFileId === "about" && (
              <AboutTab onNavigateTab={(tab) => handleOpenFile(tab as VSCodeFileId)} />
            )}
            {activeFileId === "projects" && <ProjectsTab />}
            {activeFileId === "skills" && <SkillsTab />}
            {activeFileId === "contributions" && <ContributionsTab />}
            {activeFileId === "contact" && <ContactTab />}
            {activeFileId === "experience" && <ExperienceTab />}
          </div>

          {/* Integrated Terminal Panel */}
          <VSCodeTerminal
            isOpen={isTerminalOpen}
            onToggle={() => setIsTerminalOpen(false)}
            onOpenFile={handleOpenFile}
          />
        </div>
      </div>

      {/* 3. Bottom Status Bar */}
      <VSCodeStatusBar
        activeFileId={activeFileId}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
      />

      {/* 4. Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenFile={handleOpenFile}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        onSwitchTo3DView={onSwitchTo3DView}
      />
    </div>
  );
}
