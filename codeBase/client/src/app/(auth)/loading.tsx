import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div
      className="mx-auto max-w-md space-y-6"
      aria-busy="true"
      aria-label="Loading authentication page"
    >
      {/* Title & Subtitle Skeleton */}
      <div className="space-y-2 text-center sm:text-left">
        <Skeleton className="h-8 w-36 rounded-lg" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>

      {/* Social Buttons Skeleton */}
      <div className="space-y-3 pt-2">
        <Skeleton className="h-11 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Divider Skeleton */}
      <div className="relative flex items-center py-1">
        <div className="h-px flex-1 bg-border/60" />
        <Skeleton className="mx-3 h-3 w-8 rounded-full" />
        <div className="h-px flex-1 bg-border/60" />
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-5">
        {/* Email Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-14 rounded-md" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* Password Field Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>

        {/* Forgot Password Link Skeleton */}
        <div className="flex justify-end pt-1">
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>

        {/* Submit Button Skeleton */}
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>

      {/* Footer Link Skeleton */}
      <div className="flex justify-center pt-2">
        <Skeleton className="h-4 w-52 rounded-md" />
      </div>
    </div>
  );
}
