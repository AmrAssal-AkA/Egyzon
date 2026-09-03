"use client";

import React from "react";
import { StorefrontTab } from "@/types/storefront";
import { Sparkles, Grid3X3, Layers, Info } from "lucide-react";

interface StoreNavProps {
  activeTab: StorefrontTab;
  onSelectTab: (tab: StorefrontTab) => void;
  productCount: number;
  categoryCount: number;
}

export default function StoreNav({
  activeTab,
  onSelectTab,
  productCount,
  categoryCount,
}: StoreNavProps) {
  const tabs: { id: StorefrontTab; label: string; count?: number; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "home", label: "Home", icon: Sparkles },
    { id: "products", label: "Products", count: productCount, icon: Grid3X3 },
    { id: "categories", label: "Categories", count: categoryCount, icon: Layers },
    { id: "about", label: "About Store", icon: Info },
  ];

  return (
    <div className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur-md border-b border-border/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          aria-label="Store Navigation"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "text-primary bg-primary/10 shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold leading-none ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
