"use client";

import { useState } from "react";
import { SearchIcon, MapPinIcon, ChevronRightIcon, XIcon } from "./icons";

const VENUE_TYPES = ["Estate", "Garden", "Barn & Rustic", "Waterfront", "Industrial Loft", "Rooftop", "Historic Mansion", "Farm", "Beach"];

const RECENT_SEARCHES = [
  "The Foundry, NYC",
  "Barn venues in upstate NY",
  "Waterfront under $$$",
];

const TRENDING = [
  { name: "Liberty Warehouse", city: "Red Hook, NY", score: 9.6, pattern: "vp-5" },
  { name: "Blue Hill at Stone Barns", city: "Tarrytown, NY", score: 9.0, pattern: "vp-2" },
  { name: "Prospect Park Boathouse", city: "Brooklyn, NY", score: 8.7, pattern: "vp-4" },
  { name: "Terrain at Styers", city: "Glen Mills, PA", score: null, pattern: "vp-6" },
];

const MEMBERS = [
  { name: "Emma Rose", handle: "@emmarose", tours: 14, avatar: "av-1", initials: "ER" },
  { name: "James Kay", handle: "@jameskay", tours: 11, avatar: "av-2", initials: "JK" },
  { name: "Sophie Laurent", handle: "@sophiela", tours: 8, avatar: "av-3", initials: "SL" },
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  return (
    <div className="h-full overflow-y-auto no-scroll" style={{ background: "#FAF7F2" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 sticky top-0 z-10" style={{ background: "#FAF7F2" }}>
        <h1
          className="text-xl font-bold mb-3"
          style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
        >
          Discover
        </h1>
        {/* Search input */}
        <div
          className="flex items-center gap-2.5 px-4 py-3 rounded-full"
          style={{ background: "#FFFDF9", border: "1.5px solid #8B6F4E" }}
        >
          <SearchIcon size={17} style={{ color: "#8B6F4E" } as React.CSSProperties} />
          <input
            type="text"
            placeholder="Search venues, members, lists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#2D2417" }}
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <XIcon size={15} style={{ color: "#9A8B7A" } as React.CSSProperties} />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 space-y-6">
        {/* Venue types */}
        <section>
          <h2
            className="text-sm font-semibold mb-2.5"
            style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
          >
            Browse by Type
          </h2>
          <div className="flex flex-wrap gap-2">
            {VENUE_TYPES.map((type) => (
              <button
                key={type}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{ border: "1px solid #E8DDD0", background: "#FFFDF9", color: "#5A4A37" }}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Recent searches */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold" style={{ color: "#2D2417" }}>
              Recent Searches
            </h2>
            <button className="text-xs" style={{ color: "#8B6F4E" }}>
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {RECENT_SEARCHES.map((s) => (
              <button
                key={s}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left"
                style={{ background: "#FFFDF9", border: "1px solid #F0E8DC" }}
              >
                <SearchIcon size={14} style={{ color: "#9A8B7A" } as React.CSSProperties} />
                <span className="text-sm flex-1" style={{ color: "#5A4A37" }}>
                  {s}
                </span>
                <ChevronRightIcon size={14} style={{ color: "#C4A882" } as React.CSSProperties} />
              </button>
            ))}
          </div>
        </section>

        {/* Trending venues */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h2
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
            >
              Trending Now
            </h2>
            <button className="text-xs font-medium" style={{ color: "#8B6F4E" }}>
              See all
            </button>
          </div>
          <div className="space-y-2">
            {TRENDING.map((v) => (
              <div
                key={v.name}
                className="flex items-center gap-3 p-3 rounded-xl"
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
                {v.score !== null ? (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                    style={
                      v.score >= 9.5
                        ? { background: "#8B6F4E", color: "#FFFDF9" }
                        : { border: "2px solid #8B6F4E", color: "#8B6F4E" }
                    }
                  >
                    {v.score.toFixed(1)}
                  </div>
                ) : (
                  <ChevronRightIcon size={16} style={{ color: "#C4A882" } as React.CSSProperties} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Members */}
        <section>
          <h2
            className="text-sm font-semibold mb-2.5"
            style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
          >
            Members to Follow
          </h2>
          <div className="space-y-2">
            {MEMBERS.map((m) => (
              <div
                key={m.handle}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "#FFFDF9", border: "1px solid #E8DDD0" }}
              >
                <div
                  className={`${m.avatar} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
                >
                  <span className="text-xs font-bold text-white">{m.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: "#2D2417" }}>
                    {m.name}
                  </p>
                  <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
                    {m.handle} · {m.tours} venues toured
                  </p>
                </div>
                <button
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "#8B6F4E", color: "#FFFDF9" }}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Nearby */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <h2
              className="text-sm font-semibold"
              style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}
            >
              Venues Nearby
            </h2>
            <span className="text-[11px]" style={{ color: "#9A8B7A" }}>
              New York, NY
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "501 Union", dist: "5.6 mi", pattern: "vp-5" },
              { name: "The Green Building", dist: "4.2 mi", pattern: "vp-9" },
              { name: "Dumbo Loft", dist: "5.1 mi", pattern: "vp-1" },
              { name: "The Skylark", dist: "7.8 mi", pattern: "vp-8" },
            ].map((v) => (
              <div
                key={v.name}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid #E8DDD0" }}
              >
                <div className="h-20 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${v.pattern}/300/160`} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="px-2.5 py-2" style={{ background: "#FFFDF9" }}>
                  <p className="text-xs font-semibold truncate" style={{ color: "#2D2417" }}>
                    {v.name}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#9A8B7A" }}>
                    {v.dist} away
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-4" />
      </div>
    </div>
  );
}
