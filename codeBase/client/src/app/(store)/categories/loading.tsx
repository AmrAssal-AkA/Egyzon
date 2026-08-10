import React from "react";
import { ChevronRight } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex flex-col gap-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap mb-4" aria-label="Breadcrumb">
        <div className="h-4 w-12 bg-muted rounded" />
        <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
        <div className="h-4 w-20 bg-muted rounded" />
      </nav>

      {/* Grid of Category Sections */}
      <div className="grid grid-cols-1 gap-8">
        {[...Array(2)].map((_, sectionIdx) => (
          <div
            key={sectionIdx}
            className="w-full rounded-lg shadow-md p-6 border border-border bg-card"
          >
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
              <div className="border-r-2 border-blue-500 pr-4">
                <div className="h-7 w-40 bg-muted rounded mb-2" />
                <div className="h-4 w-72 bg-muted rounded" />
              </div>
              <div className="h-5 w-16 bg-muted rounded" />
            </div>

            {/* Layout Grid: 1/3 separator column + 2/3 products column */}
            <div className="flex flex-col md:flex-row items-start gap-4">
              {/* Left Empty Separator Space (matches w-1/3 border-r-2 of real page) */}
              <div className="hidden md:block md:w-1/3 border-r-2 border-blue-500 min-h-100 pr-4"></div>
              
              {/* Right Products Space (matches w-2/3 of real page) */}
              <div className="w-full md:w-2/3 md:pl-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, cardIdx) => (
                    <ProductCardSkeleton key={cardIdx} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden border border-border flex flex-col h-full">
      {/* Image Placeholder */}
      <div className="relative w-full h-64 bg-muted">
        {/* Brand label placeholder */}
        <div className="absolute top-2 left-2 bg-muted-foreground/20 h-6 w-16 rounded" />
      </div>

      {/* Product Content placeholders */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        {/* Product Title */}
        <div className="h-5 bg-muted rounded w-3/4" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-3.5 bg-muted rounded w-full" />
          <div className="h-3.5 bg-muted rounded w-5/6" />
        </div>

        {/* Category Label */}
        <div className="h-3 bg-muted rounded w-1/4 mt-1" />

        {/* Rating and Stock badges */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="bg-muted h-6 w-12 rounded" />
          <div className="bg-muted h-6 w-20 rounded-lg" />
        </div>

        {/* Price and Add to Cart action bar */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-border/50">
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-9 bg-muted rounded w-24" />
        </div>
      </div>
    </div>
  );
}
