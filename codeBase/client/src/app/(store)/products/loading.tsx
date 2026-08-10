import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductPaginationSkeleton from "@/components/products/ProductPaginationSkeleton";

export default function ProductsLoading() {
  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
      <div className="w-full max-w-10xl px-4 md:px-20 mt-30">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <Skeleton className="h-12 w-64 md:w-80 rounded-lg" />
          <Skeleton className="h-4 w-44 md:w-60 rounded-md" />
        </div>

        {/* Main Grid: Filters Sidebar + Product Grid */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar Skeleton */}
          <aside aria-label="Filters loading" className="hidden lg:block space-y-6 rounded-xl border border-border/60 bg-card p-5 shadow-xs h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <Skeleton className="h-6 w-24 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>

            {/* Search Filter Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Price Filter Skeleton */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-2 w-full rounded-full" />
              <div className="flex items-center justify-between gap-2 pt-1">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>

            {/* Rating Filter Skeleton */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Filter Skeleton */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-28 rounded" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
              </div>
            </div>

            {/* Discount Filter Skeleton */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid & Pagination Section Skeleton */}
          <section aria-label="Product content loading" className="min-w-0 flex flex-col gap-6">
            {/* Top Bar Skeleton (Active Filters / Sort Bar) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border/60 bg-card/50">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-32 rounded-md" />
                <Skeleton className="h-9 w-28 rounded-md lg:hidden" />
              </div>
            </div>

            {/* Product Grid Skeleton (12 items matching PRODUCTS_PER_PAGE = 12) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden border border-border flex flex-col justify-between"
                >
                  <div>
                    {/* Image Skeleton */}
                    <div className="relative w-full h-64 bg-muted/60 dark:bg-muted/40 animate-pulse">
                      <div className="absolute top-2 left-2">
                        <Skeleton className="h-6 w-20 rounded" />
                      </div>
                    </div>

                    {/* Card Content Skeleton */}
                    <div className="p-4 pb-0 space-y-2">
                      <Skeleton className="h-5 w-3/4 rounded" />
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-2/3 rounded" />

                      <div className="mt-3 flex items-center justify-between gap-2 pt-2">
                        <Skeleton className="h-6 w-14 rounded" />
                        <Skeleton className="h-6 w-20 rounded-lg" />
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Skeleton */}
                  <div className="p-4 pt-0 mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <Skeleton className="h-6 w-20 rounded" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                        <Skeleton className="h-9 w-24 rounded shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dedicated Loading Pagination for Product Page */}
            <div className="mt-6 pt-4 border-t border-border/40">
              <ProductPaginationSkeleton itemCount={5} showSummary={true} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
