"use client";

import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Wallet2,
  Store,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import AddProductModel from "./productPage/_components/AddProductModel";
import { NavItem, MenuContent } from "./_components/MenuContent";

type Props = {
  storeName?: string;
};

export default function SellerSideMenue({ storeName }: Props = {}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const displayStoreName =
    storeName ||
    user?.storeName ||
    (user?.FirstName ? `${user.FirstName}'s Store` : "Seller Store");

  // Close mobile drawer on route navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll and handle Escape key while mobile menu is open
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

  const dashboardList: NavItem[] = [
    {
      id: 1,
      name: "Dashboard",
      path: "/sellerDashboard",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "Storefront Setup",
      path: "/settupStore",
      icon: Store,
    },
    {
      id: 3,
      name: "Inventory",
      path: "/sellerDashboard/Inventory",
      icon: Package,
    },
    {
      id: 4,
      name: "Orders",
      path: "/sellerDashboard/orders",
      icon: Package,
    },
    {
      id: 5,
      name: "Analytics",
      path: "/sellerDashboard/analytics",
      icon: BarChart3,
    },
    {
      id: 6,
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
      {/* Desktop Sidebar (hidden on small screens, shown on md and larger) */}
      <aside className="hidden md:flex md:w-90 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 flex-col gap-6 shrink-0 md:max-h-full md:sticky top-4">
        <MenuContent
          user={user}
          displayStoreName={displayStoreName}
          dashboardList={dashboardList}
          pathname={pathname}
          onAddProducts={handleAddProducts}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile Floating Trigger Icon (visible only on small screens) */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open seller navigation menu"
        title="Open menu"
        className="md:hidden fixed bottom-6 left-6 z-40 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/40 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20 focus:outline-hidden flex items-center justify-center min-h-12 min-w-12"
      >
        <Menu className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Mobile Drawer (Slide-over navigation on mobile screens) */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Seller navigation menu"
            className="relative z-50 w-[85%] max-w-xs sm:max-w-sm h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-5 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300"
          >
            {/* Drawer Header with Close Button */}
            <div className="flex items-center justify-between pb-1 shrink-0 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Seller Navigation
              </span>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
                className="p-1.5 -mr-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-h-9 min-w-9 flex items-center justify-center"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <MenuContent
              user={user}
              displayStoreName={displayStoreName}
              dashboardList={dashboardList}
              pathname={pathname}
              onLinkClick={() => setIsMobileOpen(false)}
              onAddProducts={() => {
                setIsMobileOpen(false);
                setIsAddModalOpen(true);
              }}
              onLogout={async () => {
                setIsMobileOpen(false);
                await handleLogout();
              }}
            />
          </aside>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <AddProductModel
          onClose={() => setIsAddModalOpen(false)}
          onSave={(data) => {
            toast.success(
              `Product "${data?.name || "New Product"}" added successfully!`,
            );
            setIsAddModalOpen(false);
          }}
        />
      )}
    </>
  );
}
