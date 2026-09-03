"use client";

import React from "react";
import { PackageOpen, SearchX, RotateCcw } from "lucide-react";

interface StoreEmptyStateProps {
  type: "no-products" | "no-search-results";
  searchQuery?: string;
  onResetFilters?: () => void;
}

export default function StoreEmptyState({
  type,
  searchQuery,
  onResetFilters,
}: StoreEmptyStateProps) {
  if (type === "no-search-results") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card rounded-2xl border border-dashed border-border my-6">
        <div className="w-14 h-14 rounded-2xl bg-muted/80 flex items-center justify-center text-muted-foreground mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-foreground">
          No matching products found
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mt-1 mb-6">
          {searchQuery
            ? `We couldn't find any products matching "${searchQuery}" in this store.`
            : "No products match your selected filters. Try changing your search keywords or categories."}
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Search & Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-2xl border border-dashed border-border my-6">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        <PackageOpen className="w-8 h-8" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-foreground">
        No products available
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mt-1.5">
        This store hasn&apos;t added any products yet. Check back later to discover new products.
      </p>
    </div>
  );
}
