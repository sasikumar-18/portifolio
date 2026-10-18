import { useState, useMemo } from "react";
import { GitCommit, GitPullRequest, GitFork, Star, Flame, Trophy, Calendar, Github, ExternalLink } from "lucide-react";
import { profile } from "../../../data/profile";

interface DayContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function ContributionsTab() {
  const [hoveredDay, setHoveredDay] = useState<{ day: DayContribution; x: number; y: number } | null>(null);

  // Generate 52 weeks (364 days) of realistic git activity data
  const { weeks, totalContributions, currentStreak, longestStreak } = useMemo(() => {
    const today = new Date(2026, 9, 17); // current date Oct 17, 2026
    const days: DayContribution[] = [];

    let total = 0;
    let currStrk = 24;
    let longStrk = 68;

    // 52 weeks * 7 days = 364 days
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);

      const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Realistic random seed for commit activity
      const pseudoRand = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const frac = pseudoRand - Math.floor(pseudoRand);

      let count = 0;
      if (!isWeekend) {
        if (frac > 0.82) count = Math.floor(frac * 8) + 4; // heavy coding day: 4-11 commits
        else if (frac > 0.45) count = Math.floor(frac * 4) + 1; // regular day: 1-4 commits
        else if (frac > 0.25) count = 1;
      } else {
        if (frac > 0.7) count = Math.floor(frac * 5) + 1; // weekend hobby commits
      }

      total += count;

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count === 0) level = 0;
      else if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 7) level = 3;
      else level = 4;

      const dateStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      days.push({
        date: dateStr,
        count,
        level,
      });
    }

    // Split into 52 columns of 7 days
    const cols: DayContribution[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      cols.push(days.slice(i, i + 7));
    }

    return {
      weeks: cols,
      totalContributions: total,
      currentStreak: currStrk,
      longestStreak: longStrk,
    };
  }, []);

  const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  // Level color map
  const levelColors = {
    0: "bg-[#161b22] border-[#21262d]",
    1: "bg-[#0e4429] border-[#003820]",
    2: "bg-[#006d32] border-[#005a2b]",
    3: "bg-[#26a641] border-[#10983d]",
    4: "bg-[#39d353] border-[#22c55e]",
  };

  const pinnedRepos = [
    {
      name: "ecommerce-fullstack",
      desc: "Full-Stack E-Commerce platform with user authentication, cart, payment simulation, and REST APIs.",
      lang: "TypeScript",
      langColor: "bg-[#3178c6]",
      stars: 18,
      forks: 5,
    },
    {
      name: "face-recognition-attendance",
      desc: "Real-time automated face detection and recognition using Haar cascades, OpenCV, and SQL database.",
      lang: "Python",
      langColor: "bg-[#3572A5]",
      stars: 34,
      forks: 9,
    },
    {
      name: "house-price-prediction",
      desc: "Machine learning regression model predicting real-estate prices with 85% accuracy deployed on AWS.",
      lang: "Python",
      langColor: "bg-[#3572A5]",
      stars: 22,
      forks: 4,
    },
    {
      name: "sasikumar-portfolio",
      desc: "High-performance interactive developer portfolio styled as an authentic VS Code development environment.",
      lang: "TypeScript",
      langColor: "bg-[#3178c6]",
      stars: 45,
      forks: 12,
    },
  ];

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-[#d4d4d4] select-text">
      {/* Tab Control Bar */}
      <div className="flex items-center justify-between border-b border-[#2d2d2d] bg-[#252526] px-4 py-2 text-xs">
        <span className="font-mono text-[#858585]">&gt; sasikumar-portfolio / src / contributions.tsx</span>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded bg-[#333333] px-2.5 py-1 text-[11px] font-medium text-white transition hover:bg-[#007acc]"
        >
          <Github size={13} /> View on GitHub <ExternalLink size={11} />
        </a>
      </div>

      {/* Main Heatmap Section */}
      <div className="flex-1 overflow-auto p-5 lg:p-7">
        <div className="mx-auto max-w-5xl space-y-7">
          {/* GitHub Telemetry Stats Header */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-4">
              <div className="flex items-center gap-2 text-xs text-[#858585]">
                <GitCommit size={14} className="text-emerald-400" /> Total Commits (1Y)
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-white">
                {totalContributions}
              </div>
            </div>

            <div className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-4">
              <div className="flex items-center gap-2 text-xs text-[#858585]">
                <Flame size={14} className="text-[#ff003c]" /> Current Streak
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-white">
                {currentStreak} Days
              </div>
            </div>

            <div className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-4">
              <div className="flex items-center gap-2 text-xs text-[#858585]">
                <Trophy size={14} className="text-amber-400" /> Longest Streak
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-white">
                {longestStreak} Days
              </div>
            </div>

            <div className="rounded-2xl border border-[#2d2d2d] bg-[#252526] p-4">
              <div className="flex items-center gap-2 text-xs text-[#858585]">
                <Calendar size={14} className="text-[#38bdf8]" /> Coding Activity
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-white">
                Top 5%
              </div>
            </div>
          </div>

          {/* GitHub Heatmap Calendar Card */}
          <div className="relative rounded-2xl border border-[#2d2d2d] bg-[#252526] p-5 sm:p-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#333333] pb-4">
              <div className="flex items-center gap-2.5">
                <Github size={18} className="text-white" />
                <h3 className="font-display text-sm font-bold text-white">
                  GitHub Contribution Activity
                </h3>
                <span className="font-mono text-xs text-[#858585]">
                  @sasikumar-18
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-[#858585]">
                <span>Less</span>
                <span className="h-3 w-3 rounded-sm bg-[#161b22] border border-[#21262d]" />
                <span className="h-3 w-3 rounded-sm bg-[#0e4429]" />
                <span className="h-3 w-3 rounded-sm bg-[#006d32]" />
                <span className="h-3 w-3 rounded-sm bg-[#26a641]" />
                <span className="h-3 w-3 rounded-sm bg-[#39d353]" />
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid Container */}
            <div className="mt-4 overflow-x-auto pb-2">
              <div className="min-w-[720px]">
                {/* Month Headers */}
                <div className="mb-2 flex pl-8 text-[11px] font-mono text-[#858585]">
                  {months.map((m, i) => (
                    <span key={i} className="flex-1">
                      {m}
                    </span>
                  ))}
                </div>

                {/* Day Labels + 52-Week Grid */}
                <div className="flex items-start gap-2">
                  {/* Day labels (Mon, Wed, Fri) */}
                  <div className="flex flex-col justify-between py-1 text-[10px] font-mono text-[#858585] h-[98px]">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* 52 columns of 7 squares */}
                  <div className="flex flex-1 gap-[3px]">
                    {weeks.map((week, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-[3px]">
                        {week.map((day, rowIdx) => (
                          <div
                            key={rowIdx}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredDay({
                                day,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 8,
                              });
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer border ${levelColors[day.level]}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Tooltip */}
            {hoveredDay && (
              <div
                style={{
                  position: "fixed",
                  left: `${hoveredDay.x}px`,
                  top: `${hoveredDay.y}px`,
                  transform: "translate(-50%, -100%)",
                }}
                className="pointer-events-none z-50 rounded-lg border border-[#383838] bg-[#1a1a1a] px-3 py-1.5 font-mono text-xs text-white shadow-xl backdrop-blur-md"
              >
                <div className="font-semibold text-emerald-400">
                  {hoveredDay.day.count} {hoveredDay.day.count === 1 ? "contribution" : "contributions"}
                </div>
                <div className="text-[10px] text-[#858585]">{hoveredDay.day.date}</div>
              </div>
            )}
          </div>

          {/* Featured Pinned Repositories */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold tracking-wide text-white uppercase">
              Pinned Repositories
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {pinnedRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={`https://github.com/sasikumar-18/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-xl border border-[#2d2d2d] bg-[#252526] p-4 transition-all hover:border-[#007acc] hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#38bdf8] group-hover:underline">
                        {repo.name}
                      </span>
                      <span className="rounded-full border border-[#383838] px-2 py-0.5 text-[10px] text-[#858585]">
                        Public
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-[#9d9d9d]">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-xs font-mono text-[#858585]">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${repo.langColor}`} />
                      {repo.lang}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
