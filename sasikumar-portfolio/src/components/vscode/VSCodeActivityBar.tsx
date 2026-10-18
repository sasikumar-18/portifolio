import { Files, Search, GitBranch, PlayCircle, Blocks, Settings, User } from "lucide-react";

export type ActivityBarTab = "explorer" | "search" | "git" | "debug" | "extensions";

interface VSCodeActivityBarProps {
  activeTab: ActivityBarTab;
  onSelectTab: (tab: ActivityBarTab) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function VSCodeActivityBar({
  activeTab,
  onSelectTab,
  isSidebarOpen,
  onToggleSidebar,
}: VSCodeActivityBarProps) {
  const topItems: { id: ActivityBarTab; icon: any; title: string; badge?: string }[] = [
    { id: "explorer", icon: Files, title: "Explorer (Ctrl+Shift+E)" },
    { id: "search", icon: Search, title: "Search (Ctrl+Shift+F)" },
    { id: "git", icon: GitBranch, title: "Source Control (Ctrl+Shift+G)", badge: "3" },
    { id: "debug", icon: PlayCircle, title: "Run and Debug (Ctrl+Shift+D)" },
    { id: "extensions", icon: Blocks, title: "Extensions (Ctrl+Shift+X)" },
  ];

  const handleClick = (tab: ActivityBarTab) => {
    if (activeTab === tab && isSidebarOpen) {
      onToggleSidebar();
    } else {
      onSelectTab(tab);
      if (!isSidebarOpen) onToggleSidebar();
    }
  };

  return (
    <aside aria-label="Activity Bar" className="flex w-12 shrink-0 select-none flex-col justify-between border-r border-[#2d2d2d] bg-[#333333] py-2 text-[#858585]">
      {/* Top Main Tools */}
      <div className="flex flex-col items-center gap-1">
        {topItems.map(({ id, icon: Icon, title, badge }) => {
          const isActive = activeTab === id && isSidebarOpen;

          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg transition ${
                isActive
                  ? "text-white before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#007acc]"
                  : "hover:text-[#cccccc]"
              }`}
              title={title}
            >
              <Icon size={20} strokeWidth={1.75} />
              {badge && (
                <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#007acc] text-[9px] font-bold text-white">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Profile & Settings */}
      <div className="flex flex-col items-center gap-1">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#858585] transition hover:text-white"
          title="Singanaboyina Sasikumar (Software Engineer)"
        >
          <User size={19} strokeWidth={1.75} />
        </button>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#858585] transition hover:text-white"
          title="Settings (Ctrl+,)"
        >
          <Settings size={19} strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}
