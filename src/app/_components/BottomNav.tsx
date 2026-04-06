"use client";

import { HomeIcon, BookmarkListIcon, PlusCircleIcon, TrophyIcon, UserCircleIcon } from "./icons";

type Tab = "feed" | "lists" | "search" | "leaderboard" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "feed", label: "Feed", Icon: HomeIcon },
  { id: "lists", label: "Lists", Icon: BookmarkListIcon },
  { id: "search", label: "Search", Icon: PlusCircleIcon },
  { id: "leaderboard", label: "Ranks", Icon: TrophyIcon },
  { id: "profile", label: "Profile", Icon: UserCircleIcon },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="flex items-end justify-around px-2 pt-2 pb-6"
      style={{ background: "#FFFDF9", borderTop: "1px solid #E8DDD0" }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        const isSearch = id === "search";

        if (isSearch) {
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="flex flex-col items-center gap-0.5 -mt-5"
              aria-label="Search"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: isActive ? "#8B6F4E" : "#FAF7F2",
                  border: "2px solid #E8DDD0",
                  color: isActive ? "#FFFDF9" : "#8B6F4E",
                }}
              >
                <Icon size={22} />
              </div>
              <span
                className="text-[10px] font-medium tracking-wide"
                style={{ color: isActive ? "#8B6F4E" : "#9A8B7A" }}
              >
                {label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex flex-col items-center gap-0.5 min-w-[52px]"
            aria-label={label}
          >
            <div style={{ color: isActive ? "#8B6F4E" : "#9A8B7A" }}>
              <Icon size={22} />
            </div>
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ color: isActive ? "#8B6F4E" : "#9A8B7A" }}
            >
              {label}
            </span>
            {isActive && (
              <div
                className="w-1 h-1 rounded-full mt-0.5"
                style={{ background: "#8B6F4E" }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
