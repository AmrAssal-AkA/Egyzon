"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Store, RotateCcw, Home } from "lucide-react";

export default function StorefrontError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log non-sensitive error internally
    console.error("Storefront error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-card p-8 sm:p-10 rounded-3xl border border-border/80 shadow-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center shadow-xs">
          <Store className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Store unavailable
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            We couldn&apos;t load this storefront. Please try again or return to the marketplace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-border bg-card hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Marketplace</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
