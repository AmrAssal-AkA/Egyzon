"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  MapPin,
  Globe,
  Star,
  Package,
  Clock,
  ThumbsUp,
  Share2,
  MessageSquare,
  Bookmark,
  Store as StoreIcon,
} from "lucide-react";
import { toast } from "sonner";
import { StorefrontDetails } from "@/types/storefront";

interface StoreHeroProps {
  store: StorefrontDetails;
  onViewLocation?: () => void;
  onContactClick?: () => void;
}

export default function StoreHero({
  store,
  onViewLocation,
  onContactClick,
}: StoreHeroProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Store link copied to clipboard!");
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing((prev) => {
      const next = !prev;
      toast.success(
        next
          ? `You are now following ${store.name}`
          : `Unfollowed ${store.name}`,
      );
      return next;
    });
  };

  const locationDisplay = store.address
    ? `${store.address.city}, ${store.address.governorate || "Egypt"}`
    : "Egypt";

  return (
    <div className="relative w-full bg-background border-b border-border/70">
      {/* Banner Container */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-muted">
        <Image
          src={store.banner}
          alt={`${store.name} Banner`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Subtle Dark Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badges Floating Over Banner */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={handleShare}
            aria-label="Share Store"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-medium border border-white/20 transition-colors cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Store Identity Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-14 sm:-mt-20 md:-mt-24 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            {/* Logo + Core Details */}
            <div className="flex items-end gap-4 sm:gap-6">
              {/* Overlapping Logo */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-background bg-card shadow-lg shrink-0">
                <Image
                  src={store.logo}
                  alt={`${store.name} Logo`}
                  fill
                  sizes="(max-width: 640px) 96px, 144px"
                  className="object-cover"
                />
              </div>

              {/* Store Title & Verification */}
              <div className="min-w-0 pb-1">
                <div className="flex items-center flex-wrap gap-2">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                    {store.name}
                  </h1>
                  {store.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-blue-600 text-white dark:fill-blue-400 dark:text-gray-900" />
                      <span>Verified Seller</span>
                    </span>
                  )}
                </div>

                {store.tagline && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-1">
                    {store.tagline}
                  </p>
                )}

                {/* Store Type & Location Meta */}
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                  {store.storeType === "physical" ? (
                    <div className="inline-flex items-center gap-1 font-medium text-foreground/80">
                      <StoreIcon className="w-3.5 h-3.5 text-primary" />
                      <span>Physical Store</span>
                      <span className="text-muted-foreground/50">·</span>
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{locationDisplay}</span>
                      {onViewLocation && (
                        <button
                          onClick={onViewLocation}
                          className="ml-1 text-primary hover:underline font-semibold cursor-pointer"
                        >
                          View Map
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 font-medium text-foreground/80">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Online Store</span>
                      <span className="text-muted-foreground/50">·</span>
                      <span>Nationwide Shipping (Egypt)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex items-center gap-2.5 sm:self-end pt-2 md:pt-0">
              <button
                type="button"
                onClick={onContactClick}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-border bg-card hover:bg-muted text-foreground transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span>Contact</span>
              </button>

              <button
                type="button"
                onClick={handleFollowToggle}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-95 cursor-pointer shadow-xs ${
                  isFollowing
                    ? "bg-muted text-foreground border border-border hover:bg-muted/80"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isFollowing ? "fill-primary text-primary" : ""}`}
                />
                <span>{isFollowing ? "Following" : "Follow Store"}</span>
              </button>
            </div>
          </div>

          {/* Quick Credibility Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border/60">
            {/* Rating */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border/40">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base font-bold text-foreground">
                    {store.rating.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    ({store.reviewCount})
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">Store Rating</p>
              </div>
            </div>

            {/* Products Count */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border/40">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Package className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold text-foreground">
                  {store.products.length}+
                </p>
                <p className="text-[11px] text-muted-foreground">Products</p>
              </div>
            </div>

            {/* Positive Feedback */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border/40">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold text-foreground">
                  {store.positiveFeedbackRate || 98}%
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Positive Feedback
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-card border border-border/40">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold text-foreground truncate">
                  {store.responseTime || "< 1 hr"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Response Time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
