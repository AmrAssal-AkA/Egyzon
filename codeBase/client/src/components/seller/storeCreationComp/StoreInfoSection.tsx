"use client";

import React from "react";
import { Store, AlignLeft, AlertCircle, HelpCircle } from "lucide-react";
import { StorefrontFormData, StoreValidationErrors } from "@/types/store";

interface StoreInfoSectionProps {
  formData: StorefrontFormData;
  errors: StoreValidationErrors;
  onChange: (field: keyof StorefrontFormData, value: string) => void;
  onBlur?: (field: keyof StorefrontFormData) => void;
}

const MAX_DESCRIPTION_LENGTH = 500;

export default function StoreInfoSection({
  formData,
  errors,
  onChange,
  onBlur,
}: StoreInfoSectionProps) {
  const currentLength = formData.description.length;
  const isNearLimit = currentLength >= MAX_DESCRIPTION_LENGTH - 50;
  const isOverLimit = currentLength > MAX_DESCRIPTION_LENGTH;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Store Information
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Define your basic store identity and customer-facing description
            </p>
          </div>
        </div>
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          Required Fields *
        </span>
      </div>

      <div className="space-y-5">
        {/* Store Name Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="storeName"
              className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
            >
              <span>Store / Business Name</span>
              <span className="text-red-500 font-bold">*</span>
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Unique identifier
            </span>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Store className="w-4 h-4" />
            </div>
            <input
              id="storeName"
              type="text"
              name="storeName"
              placeholder="e.g. Cairo Artisan Leather, Alexandria Gadgets"
              value={formData.storeName}
              onChange={(e) => onChange("storeName", e.target.value)}
              onBlur={() => onBlur?.("storeName")}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-900/50 transition-all focus:outline-none focus:ring-2 ${
                errors.storeName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:text-red-200"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100"
              }`}
              disabled={formData.storeName.length > 0}
            />
          </div>

          {errors.storeName ? (
            <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.storeName}</span>
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              This name will be displayed at the top of your storefront and product listings.
            </p>
          )}
        </div>

        {/* Store Description Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="storeDescription"
              className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
            >
              <AlignLeft className="w-4 h-4 text-slate-400" />
              <span>Store Description</span>
              <span className="text-red-500 font-bold">*</span>
            </label>

            {/* Live Character Counter */}
            <span
              className={`text-xs font-medium tabular-nums ${
                isOverLimit
                  ? "text-red-500 font-bold"
                  : isNearLimit
                  ? "text-amber-500 font-semibold"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {currentLength} / {MAX_DESCRIPTION_LENGTH} characters
            </span>
          </div>

          <div className="relative">
            <textarea
              id="storeDescription"
              rows={5}
              maxLength={MAX_DESCRIPTION_LENGTH}
              name="description"
              placeholder="Tell customers about your brand story, what makes your products special, your return policy, or the categories you specialize in..."
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
              onBlur={() => onBlur?.("description")}
              className={`w-full p-3.5 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-900/50 transition-all focus:outline-none focus:ring-2 resize-y min-h-30 max-h-65 leading-relaxed ${
                errors.description
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-red-900 dark:text-red-200"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100"
              }`}
            />
          </div>

          {errors.description ? (
            <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.description}</span>
            </p>
          ) : (
            <div className="flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <HelpCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>
                A clear, friendly description helps shoppers understand your shop and build trust before purchasing.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
