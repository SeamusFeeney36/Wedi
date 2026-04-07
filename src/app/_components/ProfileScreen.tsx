"use client";

import { useState } from "react";
import { FireIcon, MapPinIcon, LockIcon } from "./icons";

const TOURED_VENUES = [
  { name: "Liberty Warehouse", score: 9.6, pattern: "vp-5" },
  { name: "The Foundry", score: 9.2, pattern: "vp-1" },
  { name: "Prospect Park Boathouse", score: 8.7, pattern: "vp-4" },
];

const WANT_VENUES = [
  { name: "Terrain at Styers", pattern: "vp-6" },
  { name: "The Barn at Fallingwater", pattern: "vp-7" },
  { name: "The Fig House", pattern: "vp-3" },
];

export default function ProfileScreen() {
  const touredCount = 3;
  const streakDays = 4;

  return (
    <div className="h-full overflow-y-auto no-scroll" style={{ background: "#FAF7F2" }}>
      {/* Header */}
      <div
        className="pt-12 pb-5 px-5"
        style={{
          background: "linear-gradient(180deg, #EDD9C5 0%, #FAF7F2 100%)",
        }}
      >
        {/* Avatar + main info */}
        <div className="flex items-end gap-4 mb-4">
          <div
            className="av-1 w-20 h-20 rounded-full flex items-center justify-center border-4 shrink-0"
            style={{ borderColor: "#FFFDF9" }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: "#FFFDF9", fontFamily: "var(--font-playfair)" }}
            >
              A
            </span>
          </div>
          <div className="pb-1">
            <h1
              className="text-lg font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
            >
              Alex Chen
            </h1>
            <p className="text-sm" style={{ color: "#8A7968" }}>
              @alexc
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#9A8B7A" }}>
              Member since January 2026
            </p>
          </div>
        </div>

        {/* Followers row */}
        <div className="flex items-center gap-5 mb-4">
          <div className="text-center">
            <p className="text-base font-bold" style={{ color: "#2D2417" }}>
              3
            </p>
            <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
              Toured
            </p>
          </div>
          <div className="h-6 w-px" style={{ background: "#E8DDD0" }} />
          <div className="text-center">
            <p className="text-base font-bold" style={{ color: "#2D2417" }}>
              3
            </p>
            <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
              Want to Tour
            </p>
          </div>
          <div className="h-6 w-px" style={{ background: "#E8DDD0" }} />
          <div className="text-center">
            <p className="text-base font-bold" style={{ color: "#2D2417" }}>
              24
            </p>
            <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
              Followers
            </p>
          </div>
          <div className="h-6 w-px" style={{ background: "#E8DDD0" }} />
          <div className="text-center">
            <p className="text-base font-bold" style={{ color: "#2D2417" }}>
              17
            </p>
            <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
              Following
            </p>
          </div>
        </div>

        {/* Rank badge */}
        <div
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
          style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
        >
          <LockIcon size={16} style={{ color: "#C4A882" } as React.CSSProperties} />
          <div>
            <p className="text-xs font-semibold" style={{ color: "#2D2417" }}>
              Wedi Rank: <span style={{ color: "#C4A882" }}>Locked</span>
            </p>
            <p className="text-[10px]" style={{ color: "#9A8B7A" }}>
              Tour 5 venues to unlock your rank
            </p>
          </div>
          <div
            className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ background: "#F0E8DC", color: "#8B6F4E" }}
          >
            3/5
          </div>
        </div>
      </div>

      <div className="px-4 pb-6 space-y-5">
        {/* Streak */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl"
          style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#FFF3E0" }}
          >
            <FireIcon size={20} style={{ color: "#E87722" } as React.CSSProperties} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#2D2417" }}>
              {streakDays}-day streak 🔥
            </p>
            <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
              Keep exploring to maintain your streak
            </p>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "#E87722", color: "#FFFDF9" }}
          >
            {streakDays}
          </div>
        </div>

        {/* Annual goal */}
        {/* Toured venues */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h2
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
            >
              Toured ({touredCount})
            </h2>
            <button className="text-xs font-medium" style={{ color: "#8B6F4E" }}>
              See all
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scroll pb-1">
            {TOURED_VENUES.map((v) => (
              <div key={v.name} className="shrink-0 w-28">
                <div className="w-28 h-28 rounded-xl relative overflow-hidden">
                  <img src={`https://picsum.photos/seed/${v.pattern}/280/280`} alt={v.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(45,36,23,0.6) 0%, transparent 50%)" }}
                  />
                  <div
                    className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={
                      v.score >= 9.5
                        ? { background: "#8B6F4E", color: "#FFFDF9" }
                        : { background: "rgba(255,253,249,0.9)", color: "#8B6F4E", border: "1.5px solid #8B6F4E" }
                    }
                  >
                    {v.score.toFixed(1)}
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 right-1.5">
                    <p className="text-[10px] font-semibold text-white leading-tight">
                      {v.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Want to tour */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h2
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
            >
              Want to Tour ({WANT_VENUES.length})
            </h2>
            <button className="text-xs font-medium" style={{ color: "#8B6F4E" }}>
              See all
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scroll pb-1">
            {WANT_VENUES.map((v) => (
              <div key={v.name} className="shrink-0 w-28">
                <div className="w-28 h-28 rounded-xl relative overflow-hidden">
                  <img src={`https://picsum.photos/seed/${v.pattern}/280/280`} alt={v.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(45,36,23,0.6) 0%, transparent 50%)" }}
                  />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5">
                    <p className="text-[10px] font-semibold text-white leading-tight">
                      {v.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recs for You */}
        <section>
          <h2
            className="text-sm font-semibold mb-2.5"
            style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
          >
            Recs for You
          </h2>
          {[
            { name: "The Green Building", city: "Brooklyn, NY", score: 9.1, pattern: "vp-9" },
            { name: "501 Union", city: "Gowanus, NY", score: 8.6, pattern: "vp-5" },
          ].map((v) => (
            <div
              key={v.name}
              className="flex items-center gap-3 p-3 rounded-xl mb-2"
              style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
            >
              <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden">
                <img src={`https://picsum.photos/seed/${v.pattern}/100/100`} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#2D2417" }}>
                  {v.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPinIcon size={10} style={{ color: "#9A8B7A" } as React.CSSProperties} />
                  <span className="text-[11px]" style={{ color: "#9A8B7A" }}>
                    {v.city}
                  </span>
                </div>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                style={{ border: "2px solid #8B6F4E", color: "#8B6F4E" }}
              >
                {v.score.toFixed(1)}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
