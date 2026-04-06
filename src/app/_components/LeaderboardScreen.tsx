"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

type LBTab = "toured" | "influence" | "notes" | "photos";

const LB_TABS: { id: LBTab; label: string }[] = [
  { id: "toured", label: "Toured" },
  { id: "influence", label: "Influence" },
  { id: "notes", label: "Notes" },
  { id: "photos", label: "Photos" },
];

const LEADERBOARD_DATA: Record<LBTab, { rank: number; name: string; handle: string; avatar: string; initials: string; count: number; badge?: string }[]> = {
  toured: [
    { rank: 1, name: "Emma Rose", handle: "@emmarose", avatar: "av-1", initials: "ER", count: 47, badge: "🥇" },
    { rank: 2, name: "Marcus Torres", handle: "@marcust", avatar: "av-4", initials: "MT", count: 38, badge: "🥈" },
    { rank: 3, name: "Sophie Laurent", handle: "@sophiela", avatar: "av-3", initials: "SL", count: 29, badge: "🥉" },
    { rank: 4, name: "James Kay", handle: "@jameskay", avatar: "av-2", initials: "JK", count: 22 },
    { rank: 5, name: "Priya Mehta", handle: "@priyam", avatar: "av-5", initials: "PM", count: 18 },
    { rank: 6, name: "Alex Chen", handle: "@alexc", avatar: "av-1", initials: "AC", count: 15 },
    { rank: 7, name: "Jordan Rivera", handle: "@jrivera", avatar: "av-2", initials: "JR", count: 14 },
    { rank: 8, name: "Morgan Blake", handle: "@mblake", avatar: "av-3", initials: "MB", count: 11 },
    { rank: 9, name: "Taylor Nguyen", handle: "@tnguyen", avatar: "av-4", initials: "TN", count: 9 },
    { rank: 10, name: "Casey Park", handle: "@cpark", avatar: "av-5", initials: "CP", count: 7 },
  ],
  influence: [
    { rank: 1, name: "Sophie Laurent", handle: "@sophiela", avatar: "av-3", initials: "SL", count: 1240, badge: "🥇" },
    { rank: 2, name: "Emma Rose", handle: "@emmarose", avatar: "av-1", initials: "ER", count: 987, badge: "🥈" },
    { rank: 3, name: "Priya Mehta", handle: "@priyam", avatar: "av-5", initials: "PM", count: 754, badge: "🥉" },
    { rank: 4, name: "Marcus Torres", handle: "@marcust", avatar: "av-4", initials: "MT", count: 621 },
    { rank: 5, name: "James Kay", handle: "@jameskay", avatar: "av-2", initials: "JK", count: 498 },
  ],
  notes: [
    { rank: 1, name: "James Kay", handle: "@jameskay", avatar: "av-2", initials: "JK", count: 83, badge: "🥇" },
    { rank: 2, name: "Emma Rose", handle: "@emmarose", avatar: "av-1", initials: "ER", count: 71, badge: "🥈" },
    { rank: 3, name: "Sophie Laurent", handle: "@sophiela", avatar: "av-3", initials: "SL", count: 58, badge: "🥉" },
    { rank: 4, name: "Priya Mehta", handle: "@priyam", avatar: "av-5", initials: "PM", count: 44 },
    { rank: 5, name: "Alex Chen", handle: "@alexc", avatar: "av-1", initials: "AC", count: 37 },
  ],
  photos: [
    { rank: 1, name: "Priya Mehta", handle: "@priyam", avatar: "av-5", initials: "PM", count: 214, badge: "🥇" },
    { rank: 2, name: "Marcus Torres", handle: "@marcust", avatar: "av-4", initials: "MT", count: 189, badge: "🥈" },
    { rank: 3, name: "Sophie Laurent", handle: "@sophiela", avatar: "av-3", initials: "SL", count: 162, badge: "🥉" },
    { rank: 4, name: "Emma Rose", handle: "@emmarose", avatar: "av-1", initials: "ER", count: 138 },
    { rank: 5, name: "Jordan Rivera", handle: "@jrivera", avatar: "av-2", initials: "JR", count: 97 },
  ],
};

const TAB_UNITS: Record<LBTab, string> = {
  toured: "venues",
  influence: "followers",
  notes: "notes",
  photos: "photos",
};

const MY_RANK = { toured: 12, influence: 8, notes: 6, photos: 14 };

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState<LBTab>("toured");
  const [cityFilter, setCityFilter] = useState("All Cities");

  const data = LEADERBOARD_DATA[activeTab];
  const unit = TAB_UNITS[activeTab];

  return (
    <div className="h-full overflow-y-auto no-scroll" style={{ background: "#FAF7F2" }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-0 sticky top-0 z-10"
        style={{ background: "#FAF7F2" }}
      >
        <h1
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
        >
          Leaderboard
        </h1>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "#E8DDD0" }}>
          {LB_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex-1 pb-2.5 text-xs font-semibold text-center relative"
              style={{ color: activeTab === id ? "#8B6F4E" : "#9A8B7A" }}
            >
              {label}
              {activeTab === id && (
                <div
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ background: "#8B6F4E" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3 pb-6 space-y-3">
        {/* Filters */}
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }}
          >
            Friends & Me
            <ChevronDownIcon size={12} />
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }}
            onClick={() => setCityFilter(cityFilter === "All Cities" ? "New York" : "All Cities")}
          >
            {cityFilter}
            <ChevronDownIcon size={12} />
          </button>
        </div>

        {/* My rank card */}
        <div
          className="flex items-center gap-3 p-3.5 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #F5EDE0 0%, #EDD9C5 100%)",
            border: "1.5px solid #C4A882",
          }}
        >
          <div
            className="av-1 w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          >
            <span className="text-xs font-bold text-white">You</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#2D2417" }}>
              Your Rank
            </p>
            <p className="text-xs" style={{ color: "#8A7968" }}>
              @yourusername
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: "#8B6F4E", fontFamily: "var(--font-playfair)" }}>
              #{MY_RANK[activeTab]}
            </p>
            <p className="text-[10px]" style={{ color: "#9A8B7A" }}>
              overall
            </p>
          </div>
        </div>

        {/* Top 3 podium */}
        {data.length >= 3 && (
          <div className="flex items-end justify-center gap-2 py-4">
            {/* 2nd */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`${data[1].avatar} w-12 h-12 rounded-full flex items-center justify-center`}
              >
                <span className="text-sm font-bold text-white">{data[1].initials}</span>
              </div>
              <span className="text-[10px] font-medium" style={{ color: "#2D2417" }}>
                {data[1].name.split(" ")[0]}
              </span>
              <div
                className="w-16 h-12 rounded-t-lg flex items-center justify-center"
                style={{ background: "#C4A882" }}
              >
                <span className="text-lg">🥈</span>
              </div>
            </div>
            {/* 1st */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-xl">👑</div>
              <div
                className={`${data[0].avatar} w-14 h-14 rounded-full flex items-center justify-center border-2`}
                style={{ borderColor: "#8B6F4E" }}
              >
                <span className="text-sm font-bold text-white">{data[0].initials}</span>
              </div>
              <span className="text-[11px] font-semibold" style={{ color: "#2D2417" }}>
                {data[0].name.split(" ")[0]}
              </span>
              <div
                className="w-16 h-16 rounded-t-lg flex items-center justify-center"
                style={{ background: "#8B6F4E" }}
              >
                <span className="text-lg">🥇</span>
              </div>
            </div>
            {/* 3rd */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`${data[2].avatar} w-11 h-11 rounded-full flex items-center justify-center`}
              >
                <span className="text-xs font-bold text-white">{data[2].initials}</span>
              </div>
              <span className="text-[10px] font-medium" style={{ color: "#2D2417" }}>
                {data[2].name.split(" ")[0]}
              </span>
              <div
                className="w-16 h-9 rounded-t-lg flex items-center justify-center"
                style={{ background: "#D4B896" }}
              >
                <span className="text-base">🥉</span>
              </div>
            </div>
          </div>
        )}

        {/* Full list */}
        <div className="space-y-2">
          {data.map((user) => (
            <div
              key={user.handle}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
            >
              <span
                className="text-sm font-bold w-5 text-center shrink-0"
                style={{ color: user.rank <= 3 ? "#8B6F4E" : "#9A8B7A" }}
              >
                {user.rank}
              </span>
              <div
                className={`${user.avatar} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
              >
                <span className="text-xs font-bold text-white">{user.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: "#2D2417" }}>
                  {user.name}
                </p>
                <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
                  {user.handle}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold" style={{ color: "#8B6F4E" }}>
                  {user.count.toLocaleString()}
                </p>
                <p className="text-[10px]" style={{ color: "#9A8B7A" }}>
                  {unit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
