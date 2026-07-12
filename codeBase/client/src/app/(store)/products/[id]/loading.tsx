import React from "react";

export default function Loading() {
  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center py-20 px-4 md:px-20 mt-10 animate-pulse">
      <div className="w-full max-w-7xl flex flex-col gap-12">
        {/* Top Product Details Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column: Gallery Skeleton */}
          <div className="w-full flex flex-col gap-4">
            <div className="aspect-square w-full rounded-2xl bg-muted" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square w-16 md:w-20 rounded-lg bg-muted shrink-0" />
              ))}
            </div>
          </div>

          {/* Right Column: Info Skeleton */}
          <div className="w-full flex flex-col gap-6">
            {/* Breadcrumb Skeleton */}
            <div className="h-4 w-48 bg-muted rounded" />

            {/* Title Skeleton */}
            <div className="flex flex-col gap-2">
              <div className="h-8 md:h-10 w-3/4 bg-muted rounded" />
              <div className="h-8 md:h-10 w-1/2 bg-muted rounded" />
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-3 mt-1">
              <div className="h-5 w-12 bg-muted rounded" />
              <div className="h-5 w-24 bg-muted rounded" />
              <div className="h-5 w-16 bg-muted rounded-full" />
            </div>

            {/* Price Skeleton */}
            <div className="border-t border-border pt-4">
              <div className="h-8 w-36 bg-muted rounded" />
            </div>

            {/* Selector & Actions Skeleton */}
            <div className="flex flex-col gap-6 border-t border-border pt-6">
              {/* Quantity */}
              <div className="flex flex-col gap-2">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-11 w-32 bg-muted rounded-lg" />
              </div>
              {/* Actions */}
              <div className="flex items-center gap-4 w-full">
                <div className="flex-1 h-12 bg-muted rounded-lg" />
                <div className="w-12 h-12 bg-muted rounded-lg" />
              </div>
            </div>

            {/* Seller Skeleton */}
            <div className="border-t border-border pt-6 mt-2">
              <div className="h-20 w-full bg-muted rounded-xl" />
            </div>
          </div>
        </div>

        {/* Middle Area: Tabs Skeleton */}
        <div className="w-full mt-12 border-t border-border pt-10">
          <div className="h-10 w-full border-b border-border flex gap-6 px-0 mb-8">
            <div className="h-full w-24 border-b-2 border-transparent bg-muted/20" />
            <div className="h-full w-28 border-b-2 border-transparent bg-muted/20" />
            <div className="h-full w-20 border-b-2 border-transparent bg-muted/20" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/5 bg-muted rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
