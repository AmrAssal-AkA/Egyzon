"use client";

import React from "react";
import { Store, Sparkles, ShieldCheck } from "lucide-react";

export default function StoreHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-8 text-white shadow-lg shadow-blue-500/10">
      {/* Background ambient shapes */}
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide text-white border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Storefront Setup</span>
            <span className="text-white/40">•</span>
            <span className="text-blue-100">Step 1 of 1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Store className="w-7 h-7 sm:w-8 sm:h-8 text-blue-200" />
            Create Your Store
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Set up your storefront so customers across Egypt can discover your business, browse your products, and connect with your brand.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="hidden lg:flex flex-col gap-2 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-blue-100 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Verified Egyptian Seller Badge</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 ml-1.5 mr-0.5" />
            <span>Custom Branding (Logo & Banner)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 ml-1.5 mr-0.5" />
            <span>Physical Location or Online-Only</span>
          </div>
        </div>
      </div>
    </div>
  );
}
