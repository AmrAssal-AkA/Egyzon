"use client";

import React, { useMemo, useState } from "react";
import { Search, X, FolderTree, RefreshCw } from "lucide-react";
import { useCategories } from "@/hooks/useCategory";
import { Category } from "@/types/category.type";
import CategoryGrid from "./category-grid";


interface CategoriesClientProps {
  initialCategories?: Category[];
}

export default function CategoriesClient({
  initialCategories = [],
}: CategoriesClientProps) {
  const { categories, isLoading, error, mutate } = useCategories(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories;
    }
    const query = searchQuery.toLowerCase().trim();
    return categories.filter((cat) => {
      const name = (cat.categoryName || cat.name || "").toLowerCase();
      const desc = (cat.description || "").toLowerCase();
      return name.includes(query) || desc.includes(query);
    });
  }, [categories, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-card/60 backdrop-blur border border-border p-4 rounded-xl shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name or keyword..."
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {filteredCategories.length}{" "}
            <span className="text-muted-foreground font-normal">
              {filteredCategories.length === 1 ? "category" : "categories"} found
            </span>
          </span>
          <button
            onClick={() => mutate()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-muted text-xs font-medium text-foreground transition-colors cursor-pointer"
            title="Refresh categories"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && categories.length === 0 && (
        <div className="w-full rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="text-destructive font-semibold text-base mb-1">
            Failed to load categories
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            An error occurred while fetching category data. Please try again.
          </p>
          <button
            onClick={() => mutate()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
            aria-label="try Again"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading Skeletons (if no initial data) */}
      {isLoading && categories.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 sm:h-72 rounded-xl bg-muted/60 border border-border"
            />
          ))}
        </div>
      )}

      {/* Categories Grid */}
      {filteredCategories.length > 0 && (
        <CategoryGrid categories={filteredCategories} />
      )}

      {/* Empty Search / Empty Data State */}
      {!isLoading && filteredCategories.length === 0 && (
        <div className="w-full rounded-xl border border-dashed border-border bg-card/40 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <FolderTree className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {searchQuery ? "No matching categories" : "No categories found"}
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-4">
            {searchQuery
              ? `No categories matched "${searchQuery}". Try searching with different keywords.`
              : "There are currently no categories available to browse."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors cursor-pointer"
              aria-label="Clear Search"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
