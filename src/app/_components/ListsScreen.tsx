"use client";

import { useState } from "react";
import { MapIcon, ListIcon, FilterIcon, MapPinIcon, ChevronRightIcon } from "./icons";

type ListTab = "toured" | "want" | "recs" | "guides";

const LIST_TABS: { id: ListTab; label: string }[] = [
  { id: "toured", label: "Toured" },
  { id: "want", label: "Want to Tour" },
  { id: "recs", label: "Recs" },
  { id: "guides", label: "Guides" },
];

const FILTER_PILLS = ["City", "Reservable", "Available Now", "Venue Type"];

interface Venue {
  id: number;
  rank: number;
  name: string;
  price: string;
  tags: string[];
  city: string;
  distance: string;
  tourStatus: string;
  score: number | null;
  reviewCount: number;
  pattern: string;
}

const TOURED_VENUES: Venue[] = [
  { id: 1, rank: 1, name: "Liberty Warehouse", price: "$$$$", tags: ["Waterfront", "Industrial"], city: "Red Hook, NY", distance: "6 mi", tourStatus: "Toured Mar 15", score: 9.6, reviewCount: 12, pattern: "vp-5" },
  { id: 2, rank: 2, name: "The Foundry", price: "$$$$", tags: ["Industrial", "Loft"], city: "Long Island City, NY", distance: "3 mi", tourStatus: "Toured Mar 22", score: 9.2, reviewCount: 18, pattern: "vp-1" },
  { id: 3, rank: 3, name: "Prospect Park Boathouse", price: "$$$", tags: ["Waterfront", "Garden"], city: "Brooklyn, NY", distance: "5 mi", tourStatus: "Toured Apr 1", score: 8.7, reviewCount: 9, pattern: "vp-4" },
  { id: 4, rank: 4, name: "The Wythe Hotel", price: "$$$", tags: ["Rooftop", "Modern"], city: "Williamsburg, NY", distance: "4 mi", tourStatus: "Toured Apr 5", score: 8.4, reviewCount: 7, pattern: "vp-8" },
  { id: 5, rank: 5, name: "Blue Hill at Stone Barns", price: "$$$$", tags: ["Farm", "Estate"], city: "Tarrytown, NY", distance: "28 mi", tourStatus: "Toured Apr 12", score: 9.0, reviewCount: 5, pattern: "vp-2" },
];

const WANT_VENUES: Venue[] = [
  { id: 6, rank: 1, name: "Terrain at Styers", price: "$$$", tags: ["Garden", "Rustic"], city: "Glen Mills, PA", distance: "95 mi", tourStatus: "Book tour", score: null, reviewCount: 0, pattern: "vp-6" },
  { id: 7, rank: 2, name: "The Barn at Fallingwater", price: "$$$", tags: ["Barn", "Historic"], city: "Mill Run, PA", distance: "310 mi", tourStatus: "Book tour", score: null, reviewCount: 0, pattern: "vp-7" },
  { id: 8, rank: 3, name: "The Fig House", price: "$$", tags: ["Garden", "Bohemian"], city: "Los Angeles, CA", distance: "2,450 mi", tourStatus: "Book tour", score: null, reviewCount: 0, pattern: "vp-3" },
];

const REC_VENUES = [
  {
    id: 101,
    name: "The Green Building",
    price: "$$$",
    tags: ["Industrial", "Loft"],
    city: "Brooklyn, NY",
    distance: "4.2 mi",
    score: 9.1,
    reviewCount: 24,
    slots: ["10:00 AM TOUR", "2:00 PM TOUR"],
    pattern: "vp-9",
  },
  {
    id: 102,
    name: "Dumbo Loft",
    price: "$$$$",
    tags: ["Loft", "Waterfront"],
    city: "DUMBO, Brooklyn",
    distance: "5.1 mi",
    score: 8.9,
    reviewCount: 31,
    slots: ["11:00 AM TOUR", "3:30 PM TOUR"],
    pattern: "vp-1",
  },
  {
    id: 103,
    name: "The Skylark",
    price: "$$$$",
    tags: ["Rooftop", "Modern"],
    city: "Midtown, NY",
    distance: "7.8 mi",
    score: 9.4,
    reviewCount: 19,
    slots: ["9:30 AM TOUR"],
    pattern: "vp-8",
  },
  {
    id: 104,
    name: "501 Union",
    price: "$$$",
    tags: ["Industrial", "Garden"],
    city: "Gowanus, Brooklyn",
    distance: "5.6 mi",
    score: 8.6,
    reviewCount: 42,
    slots: ["1:00 PM TOUR", "4:00 PM TOUR", "5:30 PM TOUR"],
    pattern: "vp-5",
  },
];

const MAP_VENUES = [
  { id: 1, name: "Liberty Warehouse", score: 9.6, x: 25, y: 55, pattern: "vp-5" },
  { id: 2, name: "The Foundry", score: 9.2, x: 48, y: 32, pattern: "vp-1" },
  { id: 3, name: "Boathouse", score: 8.7, x: 35, y: 65, pattern: "vp-4" },
  { id: 4, name: "Wythe Hotel", score: 8.4, x: 55, y: 28, pattern: "vp-8" },
  { id: 5, name: "Blue Hill", score: 9.0, x: 72, y: 18, pattern: "vp-2" },
];

function ScoreBadge({ score }: { score: number }) {
  const isGold = score >= 9.5;
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
      style={
        isGold
          ? { background: "#8B6F4E", color: "#FFFDF9" }
          : { background: "transparent", color: "#8B6F4E", border: "2px solid #8B6F4E" }
      }
    >
      {score.toFixed(1)}
    </div>
  );
}

function TouredList() {
  const [view, setView] = useState<"list" | "map">("list");

  return (
    <>
      {/* Filter row */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scroll">
        <button
          className="shrink-0 p-2 rounded-full"
          style={{ border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }}
        >
          <FilterIcon size={15} />
        </button>
        {FILTER_PILLS.map((p) => (
          <button
            key={p}
            className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium"
            style={{ border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* View toggle */}
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-xs" style={{ color: "#9A8B7A" }}>
          {TOURED_VENUES.length} venues
        </span>
        <div
          className="flex rounded-full overflow-hidden"
          style={{ border: "1px solid #E8DDD0" }}
        >
          {(["list", "map"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium"
              style={
                view === v
                  ? { background: "#8B6F4E", color: "#FFFDF9" }
                  : { background: "#FFFDF9", color: "#5A4A37" }
              }
            >
              {v === "list" ? <ListIcon size={13} /> : <MapIcon size={13} />}
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div className="px-4 space-y-2 pb-4">
          {TOURED_VENUES.map((venue) => (
            <div
              key={venue.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
            >
              <span
                className="text-sm font-bold w-5 text-center shrink-0"
                style={{ color: "#C4A882" }}
              >
                {venue.rank}
              </span>
              <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden">
                <img src={`https://picsum.photos/seed/${venue.pattern}/100/100`} alt={venue.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#2D2417" }}>
                  {venue.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-xs font-medium" style={{ color: "#8B6F4E" }}>
                    {venue.price}
                  </span>
                  {venue.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "#F0E8DC", color: "#8B6F4E" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPinIcon size={10} style={{ color: "#9A8B7A" } as React.CSSProperties} />
                  <span className="text-[10px]" style={{ color: "#9A8B7A" }}>
                    {venue.city} · {venue.distance}
                  </span>
                </div>
                <p className="text-[10px] mt-0.5" style={{ color: "#4A9FA5" }}>
                  {venue.tourStatus}
                </p>
              </div>
              {venue.score !== null && <ScoreBadge score={venue.score} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="px-4 pb-4">
          <div
            className="relative w-full h-64 rounded-2xl overflow-hidden"
            style={{ background: "#E8DDD0" }}
          >
            {/* Map grid lines */}
            <div className="absolute inset-0 opacity-20">
              {[20, 40, 60, 80].map((x) => (
                <div key={x} className="absolute top-0 bottom-0 w-px bg-ink-mid" style={{ left: `${x}%` }} />
              ))}
              {[25, 50, 75].map((y) => (
                <div key={y} className="absolute left-0 right-0 h-px bg-ink-mid" style={{ top: `${y}%` }} />
              ))}
            </div>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 40% 50%, #8B6F4E 0%, transparent 60%)",
              }}
            />
            <p
              className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded"
              style={{ background: "rgba(45,36,23,0.7)", color: "#F0E8DC" }}
            >
              New York Area
            </p>

            {MAP_VENUES.map((v) => (
              <button
                key={v.id}
                className="absolute flex flex-col items-center"
                style={{ left: `${v.x}%`, top: `${v.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg"
                  style={
                    v.score >= 9.5
                      ? { background: "#8B6F4E", color: "#FFFDF9" }
                      : { background: "#FFFDF9", color: "#8B6F4E", border: "2px solid #8B6F4E" }
                  }
                >
                  {v.score.toFixed(1)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function WantList() {
  return (
    <div className="px-4 py-3 space-y-2 pb-4">
      {WANT_VENUES.map((venue) => (
        <div
          key={venue.id}
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
        >
          <span className="text-sm font-bold w-5 text-center shrink-0" style={{ color: "#C4A882" }}>
            {venue.rank}
          </span>
          <div className={`${venue.pattern} w-12 h-12 rounded-lg shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: "#2D2417" }}>
              {venue.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-medium" style={{ color: "#8B6F4E" }}>
                {venue.price}
              </span>
              {venue.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{ background: "#F0E8DC", color: "#8B6F4E" }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPinIcon size={10} style={{ color: "#9A8B7A" } as React.CSSProperties} />
              <span className="text-[10px]" style={{ color: "#9A8B7A" }}>
                {venue.city} · {venue.distance}
              </span>
            </div>
          </div>
          <button
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#4A9FA5", color: "#FFFDF9" }}
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
}

function RecsList() {
  return (
    <div className="px-4 py-3 space-y-3 pb-4">
      {/* Location + date filter */}
      <div className="flex gap-2">
        <button
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
          style={{ border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }}
        >
          <MapPinIcon size={13} />
          New York, NY
          <ChevronRightIcon size={13} className="ml-auto rotate-90" />
        </button>
        <button
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
          style={{ border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }}
        >
          🗓 Apr 2026
          <ChevronRightIcon size={13} className="ml-auto rotate-90" />
        </button>
      </div>

      {/* Party size */}
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: "#9A8B7A" }}>Guests:</span>
        {[50, 100, 150, 200, "200+"].map((n) => (
          <button
            key={n}
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={
              n === 100
                ? { background: "#8B6F4E", color: "#FFFDF9" }
                : { border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }
            }
          >
            {n}
          </button>
        ))}
      </div>

      {/* Rec venue cards */}
      {REC_VENUES.map((venue) => (
        <div
          key={venue.id}
          className="rounded-2xl overflow-hidden"
          style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
        >
          <div className="flex gap-3 p-3">
            <div className="w-16 h-16 rounded-xl shrink-0 overflow-hidden">
              <img src={`https://picsum.photos/seed/${venue.pattern}/140/140`} alt={venue.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: "#2D2417" }}>
                {venue.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-medium" style={{ color: "#8B6F4E" }}>
                  {venue.price}
                </span>
                {venue.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: "#F0E8DC", color: "#8B6F4E" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPinIcon size={10} style={{ color: "#9A8B7A" } as React.CSSProperties} />
                <span className="text-[10px]" style={{ color: "#9A8B7A" }}>
                  {venue.city} · {venue.distance}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold"
                style={
                  venue.score >= 9.5
                    ? { background: "#8B6F4E", color: "#FFFDF9" }
                    : { border: "2px solid #8B6F4E", color: "#8B6F4E" }
                }
              >
                {venue.score.toFixed(1)}
              </div>
              <span className="text-[10px]" style={{ color: "#9A8B7A" }}>
                {venue.reviewCount} reviews
              </span>
            </div>
          </div>

          {/* Tour slots */}
          <div
            className="flex items-center gap-2 px-3 pb-3 flex-wrap"
          >
            {venue.slots.map((slot) => (
              <button
                key={slot}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "#4A9FA5", color: "#FFFDF9" }}
              >
                <span className="w-3.5 h-3.5 rounded-sm bg-white/20 inline-flex items-center justify-center text-[8px]">
                  ⌚
                </span>
                {slot}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GuidesList() {
  const guides = [
    { title: "The Complete NYC Venue Guide 2026", author: "vœux Editors", venues: 45, cover: "vp-1" },
    { title: "Barn & Rustic Wedding Venues", author: "Sophie L.", venues: 28, cover: "vp-3" },
    { title: "Waterfront Ceremonies in the NE", author: "vœux Editors", venues: 19, cover: "vp-4" },
  ];
  return (
    <div className="px-4 py-3 space-y-3 pb-4">
      {guides.map((g) => (
        <div
          key={g.title}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8DDD0" }}
        >
          <div className="h-28 relative overflow-hidden">
            <img src={`https://picsum.photos/seed/${g.cover}/500/220`} alt={g.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(45,36,23,0.65) 0%, transparent 50%)",
              }}
            />
            <div className="absolute bottom-3 left-3 right-3">
              <p
                className="text-white text-sm font-semibold leading-snug drop-shadow"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {g.title}
              </p>
              <p className="text-white/70 text-[11px] mt-0.5">
                by {g.author} · {g.venues} venues
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ListsScreen() {
  const [activeTab, setActiveTab] = useState<ListTab>("toured");

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
          Your Lists
        </h1>

        {/* Sub-tabs */}
        <div
          className="flex border-b"
          style={{ borderColor: "#E8DDD0" }}
        >
          {LIST_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex-1 pb-2.5 text-xs font-semibold text-center transition-colors relative"
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

      {/* Screen content */}
      {activeTab === "toured" && <TouredList />}
      {activeTab === "want" && <WantList />}
      {activeTab === "recs" && <RecsList />}
      {activeTab === "guides" && <GuidesList />}
    </div>
  );
}
