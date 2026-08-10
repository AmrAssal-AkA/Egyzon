import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function ProductPaginationSkeleton({
  itemCount = 5,
  showSummary = true,
}: {
  itemCount?: number;
  showSummary?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6 w-full animate-fade-in">
      {/* Pagination Controls */}
      <nav
        aria-label="Pagination Loading"
        className="mx-auto flex w-full justify-center"
      >
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Previous Button Skeleton */}
          <div className="flex items-center gap-1.5 px-3 py-2 h-9 rounded-md border border-border/50 bg-card/50 text-muted-foreground/40">
            <ChevronLeft className="h-4 w-4 text-muted-foreground/40 animate-pulse" />
            <Skeleton className="h-4 w-16 hidden sm:block" />
          </div>

          {/* Page Number Item Skeletons */}
          {/* Active Page 1 */}
          <div className="relative flex items-center justify-center h-9 w-9 rounded-md border border-primary/20 bg-primary/10 shadow-xs">
            <Skeleton className="h-4 w-3 bg-primary/30" />
            <span className="sr-only">Loading active page</span>
          </div>

          {/* Page 2 */}
          <div className="flex items-center justify-center h-9 w-9 rounded-md border border-border/40 bg-card/40">
            <Skeleton className="h-4 w-3" />
          </div>

          {/* Page 3 */}
          <div className="flex items-center justify-center h-9 w-9 rounded-md border border-border/40 bg-card/40">
            <Skeleton className="h-4 w-3" />
          </div>

          {/* Ellipsis */}
          <div className="flex items-center justify-center h-9 w-8 text-muted-foreground/30">
            <MoreHorizontal className="h-4 w-4 animate-pulse" />
          </div>

          {/* Last Page */}
          <div className="flex items-center justify-center h-9 w-9 rounded-md border border-border/40 bg-card/40">
            <Skeleton className="h-4 w-4" />
          </div>

          {/* Next Button Skeleton */}
          <div className="flex items-center gap-1.5 px-3 py-2 h-9 rounded-md border border-border/50 bg-card/50 text-muted-foreground/40">
            <Skeleton className="h-4 w-12 hidden sm:block" />
            <ChevronRight className="h-4 w-4 text-muted-foreground/40 animate-pulse" />
          </div>
        </div>
      </nav>

      {/* Summary Skeleton text (e.g. "Showing 1-12 of 48 products") */}
      {showSummary && (
        <div className="flex items-center gap-2 mt-1">
          <Skeleton className="h-3.5 w-36 rounded-full" />
        </div>
      )}
    </div>
  );
}

export default ProductPaginationSkeleton;
