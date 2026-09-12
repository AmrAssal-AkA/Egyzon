"use client";
import Link from "next/link";
import Image from "next/image";

import type { User } from "@/types/auth";
import {  ChevronRight, BadgeCheck, Plus, LogOut, Store} from "lucide-react"


export interface NavItem {
  id: number;
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}
export interface MenuContentProps {
  user: User | null;
  displayStoreName: string;
  dashboardList: NavItem[];
  pathname: string;
  onLinkClick?: () => void;
  onAddProducts: () => void;
  onLogout: () => Promise<void>;
}

export function MenuContent({
  user,
  displayStoreName,
  dashboardList,
  pathname,
  onLinkClick,
  onAddProducts,
  onLogout,
}: MenuContentProps) {
  return (
    <>
      {/* Store Header Info */}
      <div className="flex items-center gap-3 p-3 bg-slate-50/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/50 shrink-0">
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center shrink-0 overflow-hidden">
          {user?.storeManagement?.storeLogo ? (
            <Image
              src={user.storeManagement.storeLogo}
              alt="Store Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-semibold truncate text-slate-900 dark:text-slate-100">
              {displayStoreName}
            </h2>
            <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {user?.email || "No email provided"}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto pr-1 space-y-1.5 max-h-[50vh] md:max-h-none" aria-label="Seller Main Menu">
        <div className="px-2 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Main Menu
        </div>
        <ul className="space-y-1.5">
          {dashboardList.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === "/sellerDashboard"
                ? pathname === "/sellerDashboard"
                : pathname.startsWith(item.path);

            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  onClick={onLinkClick}
                  aria-label={item.name}
                  className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 opacity-80" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Action Links */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-2.5 shrink-0">
        <div className="px-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Actions
        </div>
        <button
          type="button"
          onClick={onAddProducts}
          className="group relative w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
          aria-label="Add Product"
        >
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
            <Plus className="w-3.5 h-3.5 text-white group-hover:rotate-90 transition-transform duration-300" aria-hidden="true" />
          </div>
          <span>Add Product</span>
        </button>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Log out of seller account"
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all active:scale-[0.98] cursor-pointer"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
