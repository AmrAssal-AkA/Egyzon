"use client";

import React from "react";
import { Building2, Globe, CheckCircle2, Navigation, ShoppingBag } from "lucide-react";
import { StoreType } from "@/types/store";

interface StoreTypeSectionProps {
  selectedType: StoreType;
  onSelectType: (type: StoreType) => void;
}

export default function StoreTypeSection({
  selectedType,
  onSelectType,
}: StoreTypeSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Store Type
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Choose how you plan to serve your customers
            </p>
          </div>
        </div>
      </div>

      {/* Selectable Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Physical Store Card */}
        <button
          type="button"
          onClick={() => onSelectType("physical")}
          className={`relative p-4 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            selectedType === "physical"
              ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20"
              : "border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className={`p-2.5 rounded-xl ${
              selectedType === "physical"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}>
              <Building2 className="w-5 h-5" />
            </div>

            {selectedType === "physical" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selected
              </span>
            ) : (
              <span className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
            )}
          </div>

          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Physical Store
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Customers can visit your business at a physical location, pickup orders, or explore items in person.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
            <Navigation className="w-3 h-3 text-blue-500" />
            <span>Requires a storefront address</span>
          </div>
        </button>

        {/* Online Store Card */}
        <button
          type="button"
          onClick={() => onSelectType("online")}
          className={`relative p-4 rounded-xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
            selectedType === "online"
              ? "border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20"
              : "border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className={`p-2.5 rounded-xl ${
              selectedType === "online"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}>
              <Globe className="w-5 h-5" />
            </div>

            {selectedType === "online" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selected
              </span>
            ) : (
              <span className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
            )}
          </div>

          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Online Store
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              The business operates 100% online across Egypt without a customer-facing physical retail location.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
            <ShoppingBag className="w-3 h-3 text-emerald-500" />
            <span>Digital orders & nationwide delivery</span>
          </div>
        </button>
      </div>
    </div>
  );
}
