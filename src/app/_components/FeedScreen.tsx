"use client";

import { useState } from "react";
import { CalendarIcon, BellIcon, MenuIcon, SearchIcon, SparkleIcon, LockIcon, ChevronRightIcon, MapPinIcon, HeartIcon, StarIcon } from "./icons";

interface FeedScreenProps {
  onOpenDrawer: () => void;
  onNavigateToSearch: () => void;
}

const QUICK_FILTERS = ["Book tour", "Venues Nearby", "Trending"];

const UNLOCK_FEATURES = [
  { name: "Average Scores", threshold: 1, icon: "⭐" },
  { name: "Venue Search", threshold: 2, icon: "🔍" },
  { name: "Tour Sharing", threshold: 3, icon: "📤" },
  { name: "Stealth Mode", threshold: 4, icon: "👁" },
  { name: "Social Links", threshold: 5, icon: "🔗" },
];

const FEATURED_LISTS = [
  { title: "Top 10 NYC Estate Venues", count: 10, toured: 2, pattern: "vp-1" },
  { title: "Top 20 Barn & Rustic", count: 20, toured: 5, pattern: "vp-3" },
  { title: "Best Waterfront Venues", count: 15, toured: 1, pattern: "vp-4" },
  { title: "Hidden Gems Under $$$", count: 12, toured: 0, pattern: "vp-5" },
  { title: "Iconic Historic Estates", count: 8, toured: 3, pattern: "vp-2" },
];

const FEED_ITEMS = [
  {
    id: 1,
    user: "Emma R.",
    handle: "@emmarose",
    avatar: "av-1",
    initials: "ER",
    action: "toured",
    venue: "The Foundry",
    city: "Long Island City, NY",
    score: 9.2,
    time: "2h ago",
    note: "Absolutely stunning industrial space — the light at golden hour is unreal.",
    pattern: "vp-1",
  },
  {
    id: 2,
    user: "James K.",
    handle: "@jameskay",
    avatar: "av-2",
    initials: "JK",
    action: "bookmarked",
    venue: "Blue Hill at Stone Barns",
    city: "Tarrytown, NY",
    score: null,
    time: "4h ago",
    note: null,
    pattern: "vp-2",
  },
  {
    id: 3,
    user: "Sophie L.",
    handle: "@sophiela",
    avatar: "av-3",
    initials: "SL",
    action: "ranked",
    venue: "Prospect Park Boathouse",
    city: "Brooklyn, NY",
    score: 8.7,
    time: "Yesterday",
    note: "Garden ceremony area is magical in spring. Highly recommend!",
    pattern: "vp-4",
  },
  {
    id: 4,
    user: "Marcus T.",
    handle: "@marcust",
    avatar: "av-4",
    initials: "MT",
    action: "toured",
    venue: "Liberty Warehouse",
    city: "Red Hook, NY",
    score: 9.6,
    time: "Yesterday",
    note: null,
    pattern: "vp-5",
  },
  {
    id: 5,
    user: "Priya M.",
    handle: "@priyam",
    avatar: "av-5",
    initials: "PM",
    action: "bookmarked",
    venue: "Terrain at Styers",
    city: "Glen Mills, PA",
    score: null,
    time: "2 days ago",
    note: null,
    pattern: "vp-6",
  },
];

function ScoreBadge({ score }: { score: number }) {
  const isGold = score >= 9.5;
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
      style={
        isGold
          ? { background: "#8B6F4E", color: "#FFFDF9", border: "none" }
          : { background: "transparent", color: "#8B6F4E", border: "2px solid #8B6F4E" }
      }
    >
      {score.toFixed(1)}
    </div>
  );
}

function ActionBadge({ action }: { action: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    toured: { label: "Toured", color: "#4A9FA5", bg: "#E6F4F5" },
    bookmarked: { label: "Saved", color: "#8B6F4E", bg: "#F0E8DC" },
    ranked: { label: "Ranked", color: "#7A5FA5", bg: "#EDE8F5" },
  };
  const s = map[action] ?? { label: action, color: "#9A8B7A", bg: "#F5F2EE" };
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}

export default function FeedScreen({ onOpenDrawer, onNavigateToSearch }: FeedScreenProps) {
  const [activeFilter, setActiveFilter] = useState("Book tour");
  const [friendsInvited] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());
  const [bellActive, setBellActive] = useState(false);
  const [calActive, setCalActive] = useState(false);

  function toggleLike(id: number) {
    setLikedItems(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function toggleSave(id: number) {
    setSavedItems(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  return (
    <div
      className="h-full overflow-y-auto no-scroll"
      style={{ background: "#FAF7F2" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 pt-12 pb-3 sticky top-0 z-10"
        style={{ background: "#FAF7F2", borderBottom: "1px solid #E8DDD0" }}
      >
        <span
          className="text-2xl font-bold italic tracking-tight"
          style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
        >
          Wedi
        </span>
        <div className="flex items-center gap-3" style={{ color: "#5A4A37" }}>
          <button
            className="p-1.5 rounded-full transition-colors"
            style={{ background: calActive ? "#F0E8DC" : "transparent" }}
            onClick={() => setCalActive(v => !v)}
          >
            <CalendarIcon size={20} style={{ color: calActive ? "#8B6F4E" : undefined }} />
          </button>
          <button
            className="p-1.5 rounded-full transition-colors relative"
            style={{ background: bellActive ? "#F0E8DC" : "transparent" }}
            onClick={() => setBellActive(v => !v)}
          >
            <BellIcon size={20} style={{ color: bellActive ? "#8B6F4E" : undefined }} />
            {!bellActive && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#C4A882" }} />
            )}
          </button>
          <button
            className="p-1.5 rounded-full hover:bg-gold-pale transition-colors"
            onClick={onOpenDrawer}
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 space-y-5">
        {/* Search bar — tapping navigates to Search tab */}
        <button
          onClick={onNavigateToSearch}
          className="w-full flex items-center gap-2.5 px-4 py-3 rounded-full text-left"
          style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
        >
          <SearchIcon size={17} className="shrink-0" style={{ color: "#9A8B7A" }} />
          <span className="text-sm" style={{ color: "#9A8B7A" }}>
            Search a venue, member, etc.
          </span>
        </button>

        {/* Quick filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scroll pb-1">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={
                activeFilter === f
                  ? { background: "#8B6F4E", color: "#FFFDF9", border: "1.5px solid #8B6F4E" }
                  : { background: "#FFFDF9", color: "#5A4A37", border: "1.5px solid #E8DDD0" }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Invite card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8DDD0", background: "#FFFDF9" }}
        >
          <div
            className="px-4 pt-4 pb-3"
            style={{
              background: "linear-gradient(135deg, #F5EDE0 0%, #EDD9C5 100%)",
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "#8B6F4E" }}
                >
                  Invite Friends
                </p>
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
                >
                  Unlock Premium Features
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#8A7968" }}>
                  {friendsInvited} of 5 friends invited
                </p>
              </div>
              <SparkleIcon size={28} style={{ color: "#C4A882" } as React.CSSProperties} />
            </div>

            {/* Progress bar */}
            <div
              className="mt-3 h-1.5 rounded-full overflow-hidden"
              style={{ background: "#E8DDD0" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(friendsInvited / 5) * 100}%`,
                  background: "#8B6F4E",
                }}
              />
            </div>
          </div>

          <div className="divide-y" style={{ borderColor: "#F0E8DC" }}>
            {UNLOCK_FEATURES.map((feat) => {
              const unlocked = friendsInvited >= feat.threshold;
              return (
                <div
                  key={feat.name}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <span className="text-base">{feat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium"
                      style={{ color: unlocked ? "#2D2417" : "#9A8B7A" }}
                    >
                      {feat.name}
                    </p>
                    {!unlocked && (
                      <p className="text-[11px]" style={{ color: "#C4A882" }}>
                        Invite {feat.threshold} friend{feat.threshold > 1 ? "s" : ""} to unlock
                      </p>
                    )}
                  </div>
                  {unlocked ? (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "#8B6F4E" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : (
                    <LockIcon size={14} style={{ color: "#C4A882" } as React.CSSProperties} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-4 py-3" style={{ borderTop: "1px solid #F0E8DC" }}>
            <button
              className="w-full py-2.5 rounded-full text-sm font-semibold"
              style={{ background: "#8B6F4E", color: "#FFFDF9" }}
            >
              Invite Friends
            </button>
          </div>
        </div>

        {/* Featured Lists */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-base font-semibold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
            >
              Featured Lists
            </h2>
            <button className="text-xs font-medium" style={{ color: "#8B6F4E" }}>
              See all
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scroll pb-1">
            {FEATURED_LISTS.map((list) => (
              <div
                key={list.title}
                className="shrink-0 w-44 rounded-xl overflow-hidden cursor-pointer"
                style={{ border: "1px solid #E8DDD0" }}
              >
                <div className="h-24 relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/seed/${list.pattern}/400/200`}
                    alt={list.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(45,36,23,0.65) 0%, transparent 60%)" }}
                  />
                  <div className="absolute bottom-2 left-2.5 right-2">
                    <p className="text-white text-xs font-semibold leading-tight drop-shadow">
                      {list.title}
                    </p>
                  </div>
                </div>
                <div
                  className="px-2.5 py-2"
                  style={{ background: "#FFFDF9" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px]" style={{ color: "#9A8B7A" }}>
                      {list.count} venues
                    </span>
                    <span
                      className="text-[11px] font-medium"
                      style={{ color: "#8B6F4E" }}
                    >
                      {list.toured}/{list.count} toured
                    </span>
                  </div>
                  <div
                    className="mt-1.5 h-1 rounded-full overflow-hidden"
                    style={{ background: "#F0E8DC" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${list.count > 0 ? (list.toured / list.count) * 100 : 0}%`,
                        background: "#8B6F4E",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Feed */}
        <section>
          <h2
            className="text-base font-semibold mb-3"
            style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
          >
            Friend Activity
          </h2>
          <div className="space-y-3">
            {FEED_ITEMS.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden"
                style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
              >
                <div className="p-3.5">
                  {/* User row */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div
                      className={`${item.avatar} w-9 h-9 rounded-full flex items-center justify-center shrink-0`}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#FFFDF9" }}
                      >
                        {item.initials}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#2D2417" }}
                        >
                          {item.user}
                        </span>
                        <ActionBadge action={item.action} />
                      </div>
                      <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
                        {item.time}
                      </p>
                    </div>
                  </div>

                  {/* Venue card */}
                  <div
                    className="flex gap-3 rounded-xl overflow-hidden p-2.5"
                    style={{ background: "#FAF7F2", border: "1px solid #F0E8DC" }}
                  >
                    <div className="w-14 h-14 rounded-lg shrink-0 overflow-hidden">
                      <img
                        src={`https://picsum.photos/seed/${item.pattern}/120/120`}
                        alt={item.venue}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold leading-tight truncate"
                        style={{ color: "#2D2417" }}
                      >
                        {item.venue}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPinIcon size={11} style={{ color: "#9A8B7A" } as React.CSSProperties} />
                        <span className="text-[11px] truncate" style={{ color: "#9A8B7A" }}>
                          {item.city}
                        </span>
                      </div>
                    </div>
                    {item.score !== null && <ScoreBadge score={item.score} />}
                  </div>

                  {/* Note */}
                  {item.note && (
                    <p
                      className="mt-2 text-[12px] leading-relaxed italic"
                      style={{ color: "#5A4A37" }}
                    >
                      &ldquo;{item.note}&rdquo;
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div
                  className="flex items-center gap-4 px-3.5 py-2"
                  style={{ borderTop: "1px solid #F0E8DC" }}
                >
                  <button
                    onClick={() => toggleLike(item.id)}
                    className="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
                    style={{ color: likedItems.has(item.id) ? "#C44B4B" : "#9A8B7A" }}
                  >
                    <HeartIcon size={14} />
                    {likedItems.has(item.id) ? "Liked" : "Like"}
                  </button>
                  <button
                    onClick={() => toggleSave(item.id)}
                    className="flex items-center gap-1.5 text-[11px] font-medium transition-colors"
                    style={{ color: savedItems.has(item.id) ? "#8B6F4E" : "#9A8B7A" }}
                  >
                    <StarIcon size={14} />
                    {savedItems.has(item.id) ? "Saved ✓" : "Save venue"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  );
}
