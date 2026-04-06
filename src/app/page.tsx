"use client";

import { useState } from "react";
import BottomNav from "./_components/BottomNav";
import FeedScreen from "./_components/FeedScreen";
import ListsScreen from "./_components/ListsScreen";
import SearchScreen from "./_components/SearchScreen";
import LeaderboardScreen from "./_components/LeaderboardScreen";
import ProfileScreen from "./_components/ProfileScreen";
import MenuDrawer from "./_components/MenuDrawer";

type Tab = "feed" | "lists" | "search" | "leaderboard" | "profile";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Desktop outer wrapper — dark leather-textured bg */}
      <div
        className="w-full min-h-screen flex items-center justify-center py-8 px-4"
        style={{ background: "#1a1209" }}
      >
        {/* Phone frame */}
        <div
          className="relative overflow-hidden shadow-2xl"
          style={{
            width: "min(390px, 100vw)",
            height: "min(844px, calc(100dvh - 32px))",
            borderRadius: "clamp(0px, 4vw, 44px)",
            background: "#FAF7F2",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          {/* Screen content — fills above the bottom nav */}
          <div
            className="absolute inset-0"
            style={{ bottom: 0 }}
          >
            {/* Tab screens */}
            <div className="absolute inset-0" style={{ bottom: "88px" }}>
              {activeTab === "feed" && (
                <FeedScreen
                  onOpenDrawer={() => setDrawerOpen(true)}
                  onNavigateToSearch={() => setActiveTab("search")}
                />
              )}
              {activeTab === "lists" && <ListsScreen />}
              {activeTab === "search" && <SearchScreen />}
              {activeTab === "leaderboard" && <LeaderboardScreen />}
              {activeTab === "profile" && <ProfileScreen />}
            </div>

            {/* Bottom nav — fixed at bottom of phone frame */}
            <div className="absolute bottom-0 left-0 right-0">
              <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>

          {/* Menu drawer — rendered within phone frame */}
          <MenuDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />
        </div>
      </div>

      {/* Desktop hint */}
      <style>{`
        @media (min-width: 480px) {
          .desktop-hint { display: block; }
        }
      `}</style>
    </>
  );
}
