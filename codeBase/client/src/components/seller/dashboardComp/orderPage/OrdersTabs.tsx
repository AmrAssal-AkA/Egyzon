"use client";

import React from "react";

export type OrderStatusTab =
  | "all"
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

interface OrdersTabsProps {
  activeTab: OrderStatusTab;
  onTabChange: (tab: OrderStatusTab) => void;
  counts: Record<OrderStatusTab, number>;
}

export default function OrdersTabs({
  activeTab,
  onTabChange,
  counts,
}: OrdersTabsProps) {
  const tabs: { id: OrderStatusTab; label: string; showCount?: boolean }[] = [
    { id: "all", label: "All Orders" },
    { id: "pending", label: "Pending", showCount: true },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
    { id: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
      <nav className="flex items-center gap-6 sm:gap-8 min-w-max pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = counts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-3 text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <span>{tab.label}</span>

              {tab.showCount && count > 0 && (
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              )}

              {/* Active Tab Underline Indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-in fade-in" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
