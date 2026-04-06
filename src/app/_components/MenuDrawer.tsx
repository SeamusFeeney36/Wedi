"use client";

import { useEffect } from "react";
import {
  XIcon,
  UsersIcon,
  LockIcon,
  SchoolIcon,
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
} from "./icons";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  chevron?: boolean;
  divider?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { icon: <GiftIcon size={18} />, label: "Invites", badge: "3 left", chevron: true },
  { icon: <SparkleIcon size={18} />, label: "Unlock Features", chevron: true },
  { icon: <SchoolIcon size={18} />, label: "Add Your School", chevron: true, divider: true },

  { icon: <SettingsIcon size={18} />, label: "Settings", chevron: true },
  { icon: <CalendarIcon size={18} />, label: "Your Tours", chevron: true },
  { icon: <LockIcon size={18} />, label: "Your Subscriptions", chevron: true },
  { icon: <TargetIcon size={18} />, label: "Your Venue Goal", badge: "5/12", chevron: true, divider: true },

  { icon: <GlobeIcon size={18} />, label: "Home City", badge: "New York, NY", chevron: true },
  { icon: <HeartIcon size={18} />, label: "Wedding Style Preferences", chevron: true },
  { icon: <EyeOffIcon size={18} />, label: "Disliked Venue Types", chevron: true },
  { icon: <ImportIcon size={18} />, label: "Import Existing List", chevron: true, divider: true },

  { icon: <KeyIcon size={18} />, label: "Change Password", chevron: true },
  { icon: <ShieldIcon size={18} />, label: "Privacy Policy", chevron: true },
  { icon: <HelpCircleIcon size={18} />, label: "FAQ", chevron: true, divider: true },

  { icon: <LogOutIcon size={18} />, label: "Log Out" },
];

export default function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 fade-in"
        style={{ background: "rgba(45, 36, 23, 0.45)", backdropFilter: "blur(2px)" }}
        onClick={onClose}
      />

      {/* Drawer panel (slides from right) */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[82%] slide-in-right overflow-y-auto no-scroll"
        style={{ background: "#FAF7F2" }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 pt-12 pb-4"
          style={{ borderBottom: "1px solid #E8DDD0" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="av-1 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <span
                className="text-sm font-bold"
                style={{ color: "#FFFDF9", fontFamily: "var(--font-playfair)" }}
              >
                A
              </span>
            </div>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "#2D2417", fontFamily: "var(--font-playfair)" }}
              >
                Alex Chen
              </p>
              <p className="text-[11px]" style={{ color: "#9A8B7A" }}>
                @alexc
              </p>
            </div>
          </div>
          <button
            className="p-2 rounded-full"
            style={{ background: "#F0E8DC", color: "#5A4A37" }}
            onClick={onClose}
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* App title */}
        <div
          className="px-5 py-3"
          style={{ borderBottom: "1px solid #E8DDD0" }}
        >
          <span
            className="text-2xl font-bold italic"
            style={{ fontFamily: "var(--font-playfair)", color: "#8B6F4E" }}
          >
            Wedi
          </span>
          <p className="text-[11px] mt-0.5" style={{ color: "#9A8B7A" }}>
            Wedding venue discovery & ranking
          </p>
        </div>

        {/* Menu items */}
        <nav className="py-2">
          {MENU_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gold-pale transition-colors"
                style={{ background: "transparent" }}
              >
                <span style={{ color: "#8B6F4E" }}>{item.icon}</span>
                <span
                  className="flex-1 text-sm"
                  style={{
                    color: item.label === "Log Out" ? "#B04040" : "#2D2417",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#F0E8DC", color: "#8B6F4E" }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.chevron && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C4A882"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
              {item.divider && (
                <div
                  className="mx-5 my-1 h-px"
                  style={{ background: "#E8DDD0" }}
                />
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 mt-2" style={{ borderTop: "1px solid #E8DDD0" }}>
          <p className="text-[10px]" style={{ color: "#C4A882" }}>
            Wedi v1.0.0 · Made with love for weddings
          </p>
        </div>
      </div>
    </div>
  );
}
