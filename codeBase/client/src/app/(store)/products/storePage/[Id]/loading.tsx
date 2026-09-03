import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function StorefrontLoading() {
  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Banner Skeleton */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-muted animate-pulse border-b border-border/70">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Hero Store Info Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-14 sm:-mt-20 md:-mt-24 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <div className="flex items-end gap-4 sm:gap-6">
              {/* Overlapping Logo */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl border-4 border-background bg-card shadow-lg shrink-0 overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Title & info */}
              <div className="min-w-0 space-y-2 pb-1">
                <Skeleton className="h-7 w-48 sm:w-64" />
                <Skeleton className="h-4 w-60 sm:w-80" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex items-center gap-2.5 sm:self-end pt-2 md:pt-0">
              <Skeleton className="h-9 w-24 rounded-xl" />
              <Skeleton className="h-9 w-28 rounded-xl" />
            </div>
          </div>

          {/* Stats strip skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border/60">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border/40"
              >
                <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nav Tabs Skeleton */}
      <div className="w-full bg-background border-b border-border/80 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Skeleton className="h-8 w-20 rounded-xl" />
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-8 w-28 rounded-xl" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Search bar & filter skeleton */}
        <div className="bg-card p-3 rounded-2xl border border-border/80 flex items-center gap-3">
          <Skeleton className="h-9 flex-1 rounded-xl" />
          <Skeleton className="h-9 w-40 rounded-xl hidden sm:block" />
          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border/80 overflow-hidden flex flex-col h-full"
            >
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2.5 flex-1">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="pt-3 mt-auto flex items-center justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-7 w-16 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
