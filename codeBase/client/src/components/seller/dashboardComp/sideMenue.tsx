"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Wallet2,
  Store,
  ChevronRight,
  BadgeCheck,
  Plus,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import AddProductModel from "./productPage/_components/AddProductModel";

type Props = {
  storeName?: string;
};

interface NavItem {
  id: number;
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function SellerSideMenue({ storeName }: Props = {}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const displayStoreName =
    storeName ||
    user?.storeName ||
    (user?.FirstName ? `${user.FirstName}'s Store` : "Seller Store");

  const dashboardList: NavItem[] = [
    {
      id: 1,
      name: "Dashboard",
      path: "/sellerDashboard",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "Inventory",
      path: "/sellerDashboard/Inventory",
      icon: Package,
    },
    {
      id: 3,
      name: "Analytics",
      path: "/sellerDashboard/analytics",
      icon: BarChart3,
    },
    {
      id: 4,
      name: "Wallet",
      path: "/sellerDashboard/wallet",
      icon: Wallet2,
    },
  ];

  const handleAddProducts = () => {
    setIsAddModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <aside className="w-full md:w-90 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 flex flex-col gap-6 shrink-0 md:max-h-full md:sticky top-4">
        {/* Store Header Info */}
        <div className="flex items-center gap-3 p-3 bg-slate-50/60 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/50 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center shrink-0">
            <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-semibold truncate text-slate-900 dark:text-slate-100">
                {displayStoreName}
              </h2>
              <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {user?.email || "No email provided"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto pr-1 space-y-1.5 max-h-[50vh] md:max-h-none">
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
                      />
                      <span>{item.name}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 opacity-80" />
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
            onClick={handleAddProducts}
            className="group relative w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-semibold text-sm text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <Plus className="w-3.5 h-3.5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </div>
            <span>Add Product</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all active:scale-[0.98] cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <AddProductModel
          onClose={() => setIsAddModalOpen(false)}
          onSave={(data) => {
            toast.success(`Product "${data.name}" added successfully!`);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </>
  );
}
