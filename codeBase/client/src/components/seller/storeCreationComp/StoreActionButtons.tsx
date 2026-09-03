"use client";

import React from "react";
import { Loader2, ArrowRight, XCircle } from "lucide-react";
import Button from "@/components/ui/button";

interface StoreActionButtonsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function StoreActionButtons({
  isSubmitting,
  onCancel,
}: StoreActionButtonsProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex flex-col-reverse sm:flex-row items-center justify-between gap-3.5">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 h-11 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-2"
      >
        <XCircle className="w-4 h-4 text-slate-400" />
        <span>Cancel</span>
      </Button>

      <div className="w-full sm:w-auto flex items-center gap-3">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-50 h-12 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-600/25 transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer text-sm sm:text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Storefront...</span>
            </>
          ) : (
            <>
              <span>Create Store</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
