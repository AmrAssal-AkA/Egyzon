"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, Package, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export interface DashboardLinkItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const Links: DashboardLinkItem[] = [
  { name: "Profile", href: "/dashboard", icon: User },
  { name: "My Orders", href: "/dashboard/myOrder", icon: Package },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
];

export default function SideMenu() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileOpen]);

  const isLinkActive = (targetHref: string) => {
    const cleanTarget = targetHref.replace(/\/$/, "");
    const cleanPath = pathname ? pathname.replace(/\/$/, "") : "";
    if (cleanTarget === "/dashboard") {
      return cleanPath === "/dashboard";
    }
    return cleanPath === cleanTarget || cleanPath.startsWith(cleanTarget + "/");
  };

  const renderNavList = (isMobile = false) => (
    <nav aria-label={isMobile ? "Mobile account navigation" : "Account navigation"} className="w-full">
      <ul className="space-y-1.5">
        {Links.map((link) => {
          const Icon = link.icon;
          const active = isLinkActive(link.href);
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      active ? "text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                )}
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on small/mobile screen, visible on md and up) */}
      <aside className="hidden md:flex md:w-64 h-fit bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-col gap-4 shrink-0 md:sticky top-24">
        <div className="flex flex-col gap-0.5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Account</h2>
          {user?.FirstName && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user.FirstName} {user.LastName || ""}
            </p>
          )}
        </div>
        {renderNavList(false)}
      </aside>

      {/* Mobile Top Trigger Button on the Left (visible only on small/mobile screens) */}
      <div className="md:hidden w-full flex items-center justify-start">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open account navigation menu"
          className="inline-flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xs hover:bg-gray-50 dark:hover:bg-gray-700/60 transition-all cursor-pointer"
        >
          <Menu className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <span>Account Menu</span>
        </button>
      </div>

      {/* Mobile Floating Trigger Icon on the Left (visible only on small/mobile screens) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open account navigation menu"
        title="Open account menu"
        className="md:hidden fixed bottom-6 left-6 z-40 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/40 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20 focus:outline-hidden flex items-center justify-center min-h-12 min-w-12"
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Mobile Drawer (Slides in from the left) */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel on the Left */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Account navigation menu"
            className="relative z-50 w-[80%] max-w-xs sm:max-w-sm h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-5 flex flex-col gap-4 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300"
          >
            {/* Drawer Header with Title & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Account</h2>
                {user?.FirstName && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.FirstName} {user.LastName || ""}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close navigation menu"
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer min-h-9 min-w-9 flex items-center justify-center"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1">
              {renderNavList(true)}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
