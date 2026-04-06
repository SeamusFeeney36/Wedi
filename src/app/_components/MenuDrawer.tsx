"use client";

import { useState } from "react";
import {
  XIcon,
  SettingsIcon,
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  EyeOffIcon,
  ImportIcon,
  KeyIcon,
  ShieldIcon,
  LogOutIcon,
  HelpCircleIcon,
  SparkleIcon,
  GiftIcon,
  TargetIcon,
  SchoolIcon,
  LockIcon,
  ChevronRightIcon,
} from "./icons";

type Tab = "feed" | "lists" | "search" | "leaderboard" | "profile";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: Tab) => void;
}

const CITIES = ["New York, NY", "Brooklyn, NY", "Los Angeles, CA", "Chicago, IL", "Austin, TX"];
const STYLES = ["Romantic & Classic", "Modern & Minimalist", "Rustic & Bohemian", "Garden & Outdoor", "Black Tie Formal"];

export default function MenuDrawer({ open, onClose, onNavigate }: MenuDrawerProps) {
  const [cityIdx, setCityIdx] = useState(0);
  const [logOutPrompt, setLogOutPrompt] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [weddingStyle, setWeddingStyle] = useState(0);

  if (!open) return null;

  function navigate(tab: Tab) {
    onNavigate(tab);
    onClose();
  }

  function handleItem(label: string) {
    setActiveItem(label);
    setTimeout(() => setActiveItem(null), 300);

    switch (label) {
      case "Your Tours":
        navigate("lists");
        break;
      case "Your Venue Goal":
        navigate("profile");
        break;
      case "Unlock Features":
        navigate("feed");
        break;
      case "Home City":
        setCityIdx(i => (i + 1) % CITIES.length);
        break;
      case "Wedding Style Preferences":
        setWeddingStyle(i => (i + 1) % STYLES.length);
        break;
      case "Log Out":
        setLogOutPrompt(true);
        break;
      default:
        break;
    }
  }

  type MenuRow = {
    icon: React.ReactNode;
    label: string;
    badge?: string;
    chevron?: boolean;
    divider?: boolean;
    danger?: boolean;
    sublabel?: string;
  };

  const MENU_ITEMS: MenuRow[] = [
    { icon: <GiftIcon size={18} />, label: "Invites", badge: "3 left", chevron: true },
    { icon: <SparkleIcon size={18} />, label: "Unlock Features", chevron: true },
    { icon: <SchoolIcon size={18} />, label: "Add Your School", chevron: true, divider: true },

    { icon: <SettingsIcon size={18} />, label: "Settings", chevron: true },
    { icon: <CalendarIcon size={18} />, label: "Your Tours", chevron: true },
    { icon: <LockIcon size={18} />, label: "Your Subscriptions", chevron: true },
    { icon: <TargetIcon size={18} />, label: "Your Venue Goal", badge: "5/12", chevron: true, divider: true },

    { icon: <GlobeIcon size={18} />, label: "Home City", badge: CITIES[cityIdx], chevron: true },
    {
      icon: <HeartIcon size={18} />,
      label: "Wedding Style Preferences",
      sublabel: STYLES[weddingStyle],
      chevron: true,
    },
    { icon: <EyeOffIcon size={18} />, label: "Disliked Venue Types", chevron: true },
    { icon: <ImportIcon size={18} />, label: "Import Existing List", chevron: true, divider: true },

    { icon: <KeyIcon size={18} />, label: "Change Password", chevron: true },
    { icon: <ShieldIcon size={18} />, label: "Privacy Policy", chevron: true },
    { icon: <HelpCircleIcon size={18} />, label: "FAQ", chevron: true, divider: true },

    { icon: <LogOutIcon size={18} />, label: "Log Out", danger: true },
  ];

  return (
    <div className="absolute inset-0 z-50">
      {/* Backdrop — only the exposed left strip closes the drawer */}
      <div
        className="absolute inset-0 fade-in"
        style={{ background: "rgba(45, 36, 23, 0.45)", backdropFilter: "blur(2px)" }}
        onClick={onClose}
      />

      {/* Drawer panel — stopPropagation keeps taps inside from hitting backdrop */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[82%] slide-in-right overflow-y-auto no-scroll"
        style={{ background: "#FAF7F2" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 pt-12 pb-4"
          style={{ borderBottom: "1px solid #E8DDD0" }}
        >
          <div className="flex items-center gap-3">
            <div className="av-1 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: "#FFFDF9", fontFamily: "var(--font-playfair)" }}>
                A
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#2D2417", fontFamily: "var(--font-playfair)" }}>
                Alex Chen
              </p>
              <p className="text-[11px]" style={{ color: "#9A8B7A" }}>@alexc</p>
            </div>
          </div>
          <button
            className="p-2 rounded-full active:scale-95 transition-transform"
            style={{ background: "#F0E8DC", color: "#5A4A37" }}
            onClick={onClose}
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* App brand */}
        <div className="px-5 py-3" style={{ borderBottom: "1px solid #E8DDD0" }}>
          <span className="text-2xl font-bold italic" style={{ fontFamily: "var(--font-playfair)", color: "#8B6F4E" }}>
            Wedi
          </span>
          <p className="text-[11px] mt-0.5" style={{ color: "#9A8B7A" }}>
            Wedding venue discovery & ranking
          </p>
        </div>

        {/* Log out confirmation overlay */}
        {logOutPrompt && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 gap-4 fade-in"
            style={{ background: "rgba(250,247,242,0.97)" }}
          >
            <p className="text-lg font-semibold text-center" style={{ fontFamily: "var(--font-playfair)", color: "#2D2417" }}>
              Log out of Wedi?
            </p>
            <p className="text-sm text-center" style={{ color: "#9A8B7A" }}>
              You can always log back in with your email.
            </p>
            <button
              className="w-full py-3 rounded-full text-sm font-semibold"
              style={{ background: "#B04040", color: "#FFFDF9" }}
              onClick={onClose}
            >
              Log Out
            </button>
            <button
              className="w-full py-3 rounded-full text-sm font-semibold"
              style={{ background: "#F0E8DC", color: "#5A4A37" }}
              onClick={() => setLogOutPrompt(false)}
            >
              Cancel
            </button>
          </div>
        )}

        {/* Menu items */}
        <nav className="py-2">
          {MENU_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors active:opacity-70"
                style={{
                  background: activeItem === item.label ? "#F0E8DC" : "transparent",
                }}
                onClick={() => handleItem(item.label)}
              >
                <span style={{ color: item.danger ? "#B04040" : "#8B6F4E" }}>{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <span
                    className="text-sm block"
                    style={{ color: item.danger ? "#B04040" : "#2D2417", fontWeight: 500 }}
                  >
                    {item.label}
                  </span>
                  {item.sublabel && (
                    <span className="text-[10px]" style={{ color: "#9A8B7A" }}>
                      {item.sublabel}
                    </span>
                  )}
                </div>
                {item.badge && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: "#F0E8DC", color: "#8B6F4E" }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.chevron && (
                  <ChevronRightIcon size={14} style={{ color: "#C4A882", flexShrink: 0 } as React.CSSProperties} />
                )}
              </button>
              {item.divider && (
                <div className="mx-5 my-1 h-px" style={{ background: "#E8DDD0" }} />
              )}
            </div>
          ))}
        </nav>

        <div className="px-5 py-4 mt-2" style={{ borderTop: "1px solid #E8DDD0" }}>
          <p className="text-[10px]" style={{ color: "#C4A882" }}>
            Wedi v1.0.0 · Made with love for weddings
          </p>
        </div>
      </div>
    </div>
  );
}
