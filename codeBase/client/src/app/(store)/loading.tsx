import React from "react";

export default function HomeSkeleton() {
  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
      {/* Hero Carousel Skeleton */}
      <section className="w-full max-w-10xl mx-auto px-4 md:px-20 mt-24 mb-10">
        <div className="relative w-full h-[620px] sm:h-[550px] md:h-[480px] lg:h-[540px] rounded-[24px] md:rounded-[32px] bg-muted/60 dark:bg-muted/40 animate-pulse p-6 md:p-12 flex flex-col justify-end overflow-hidden border border-border/50">
          <div className="max-w-xl space-y-4">
            <div className="h-6 w-32 bg-muted-foreground/20 rounded-full" />
            <div className="space-y-2">
              <div className="h-10 md:h-12 w-4/5 bg-muted-foreground/20 rounded-lg" />
              <div className="h-10 md:h-12 w-3/5 bg-muted-foreground/20 rounded-lg" />
            </div>
            <div className="space-y-1 pt-2">
              <div className="h-4 w-full bg-muted-foreground/15 rounded" />
              <div className="h-4 w-2/3 bg-muted-foreground/15 rounded" />
            </div>
            <div className="pt-4">
              <div className="h-12 w-40 bg-muted-foreground/25 rounded-xl" />
            </div>
          </div>
          {/* Pagination Indicators Skeleton */}
          <div className="flex justify-center items-center gap-2 mt-8">
            <div className="h-2 w-8 bg-muted-foreground/40 rounded-full" />
            <div className="h-2 w-2 bg-muted-foreground/20 rounded-full" />
            <div className="h-2 w-2 bg-muted-foreground/20 rounded-full" />
          </div>
        </div>
      </section>

      {/* Featured Products Section Skeleton */}
      <section className="w-full max-w-10xl px-4 md:px-20">
        <div className="h-8 w-60 bg-muted rounded-md mt-10 mb-3 animate-pulse" />
        <div className="h-4 w-full max-w-md bg-muted/70 rounded-md mb-10 animate-pulse" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden border border-border animate-pulse"
            >
              <div className="relative w-full h-64 bg-muted">
                <div className="absolute top-2 left-2 h-6 w-16 bg-muted-foreground/20 rounded" />
              </div>
              <div className="p-4 pb-0">
                <div className="h-5 w-3/4 bg-muted rounded mb-2" />
                <div className="h-4 w-full bg-muted/70 rounded mb-1" />
                <div className="h-4 w-2/3 bg-muted/70 rounded mb-2" />
                <div className="h-3 w-1/3 bg-muted/50 rounded mb-3" />
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="h-6 w-14 bg-muted rounded" />
                  <div className="h-6 w-20 bg-muted rounded-lg" />
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="flex items-center justify-between gap-2 mt-4">
                  <div className="h-6 w-24 bg-muted rounded" />
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
                    <div className="h-9 w-28 bg-muted rounded shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section Skeleton */}
      <section className="w-full max-w-10xl px-4 md:px-20 mt-10">
        <div className="h-8 w-64 bg-muted rounded-md mt-10 mb-3 animate-pulse" />
        <div className="h-4 w-full max-w-md bg-muted/70 rounded-md mb-10 animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-150">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden bg-muted animate-pulse h-full min-h-[260px] p-6 flex flex-col justify-end border border-border"
            >
              <div className="space-y-2">
                <div className="h-6 w-1/2 bg-muted-foreground/25 rounded" />
                <div className="h-4 w-3/4 bg-muted-foreground/15 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products Section Skeleton */}
      <section className="w-full max-w-10xl px-4 md:px-20 mt-10">
        <div className="h-8 w-60 bg-muted rounded-md mt-10 mb-3 animate-pulse" />
        <div className="h-4 w-full max-w-md bg-muted/70 rounded-md mb-10 animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden border border-border animate-pulse"
            >
              <div className="relative w-full h-64 bg-muted">
                <div className="absolute top-2 left-2 h-6 w-16 bg-muted-foreground/20 rounded" />
              </div>
              <div className="p-4 pb-0">
                <div className="h-5 w-3/4 bg-muted rounded mb-2" />
                <div className="h-4 w-full bg-muted/70 rounded mb-1" />
                <div className="h-4 w-2/3 bg-muted/70 rounded mb-2" />
                <div className="h-3 w-1/3 bg-muted/50 rounded mb-3" />
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="h-6 w-14 bg-muted rounded" />
                  <div className="h-6 w-20 bg-muted rounded-lg" />
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="flex items-center justify-between gap-2 mt-4">
                  <div className="h-6 w-24 bg-muted rounded" />
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
                    <div className="h-9 w-28 bg-muted rounded shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section Skeleton */}
      <section className="w-full max-w-10xl px-4 md:px-20 mt-10">
        <div className="w-full bg-muted/40 text-foreground py-10 px-6 rounded-lg flex flex-col items-center justify-center animate-pulse border border-border">
          <div className="w-12 h-12 rounded-full bg-muted-foreground/20 mb-4" />
          <div className="h-8 w-64 bg-muted-foreground/20 rounded mb-3" />
          <div className="h-4 w-full max-w-md bg-muted-foreground/15 rounded mb-2" />
          <div className="h-4 w-3/4 max-w-md bg-muted-foreground/15 rounded mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <div className="w-full sm:w-auto flex-1 h-10 rounded-md bg-muted-foreground/15" />
            <div className="w-full sm:w-28 h-10 rounded-md bg-muted-foreground/25 shrink-0" />
          </div>
        </div>
      </section>
    </main>
  );
}