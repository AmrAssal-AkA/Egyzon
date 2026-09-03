"use client";

import React from "react";
import Image from "next/image";
import {
  Eye,
  Store,
  MapPin,
  Globe,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";
import { StorefrontFormData } from "@/types/store";

interface StoreVisualPreviewProps {
  formData: StorefrontFormData;
}

export default function StoreVisualPreview({ formData }: StoreVisualPreviewProps) {
  const displayName = formData.storeName.trim() || "Your Store Name";
  const displayDescription =
    formData.description.trim() ||
    "Your store description will appear here so customers can learn about your business, specialty items, and service.";

  const isPhysical = formData.storeType === "physical";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-0">
      {/* Preview Header Bar */}
      <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Customer View Preview
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Preview</span>
        </div>
      </div>

      {/* Mock Storefront Hero Card */}
      <div className="p-4 sm:p-5">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/40 dark:bg-slate-900/60 shadow-sm">
          {/* Banner Container */}
          <div className="relative w-full h-32 sm:h-40 bg-linear-to-r from-blue-700 via-indigo-700 to-slate-900">
            {formData.bannerPreview ? (
              <Image
                src={formData.bannerPreview}
                alt="Store Banner"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs font-medium tracking-wide">
                <span>[Store Banner Area]</span>
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Quick Tag on Banner */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-semibold text-white border border-white/20">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Egyzon Verified Merchant</span>
            </div>
          </div>

          {/* Store Info & Logo Avatar Overlap */}
          <div className="p-4 sm:p-5 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 -mt-10 sm:-mt-12 mb-3">
              {/* Square Logo Avatar */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl bg-white dark:bg-slate-800 shrink-0 flex items-center justify-center">
                {formData.logoPreview ? (
                  <Image
                    src={formData.logoPreview}
                    alt="Store Logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <Store className="w-8 h-8 text-blue-500" />
                    <span className="text-[9px] font-bold mt-1 text-slate-500">LOGO</span>
                  </div>
                )}
              </div>

              {/* Status / Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Store
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5.0 (New)
                </span>
              </div>
            </div>

            {/* Store Name & Type */}
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {displayName}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                {isPhysical ? (
                  <div className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{formData.address || "Physical Location • Egypt"}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Online Store • Nationwide Delivery Across Egypt</span>
                  </div>
                )}
              </div>
            </div>

            {/* Store Description Preview */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {displayDescription}
              </p>
            </div>

            {/* Mock Storefront Badges */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                📦 <strong>0</strong> Products Listed
              </span>
              <span className="flex items-center gap-1">
                🚚 Standard Shipping Available
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                Egyzon Protection Included
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
