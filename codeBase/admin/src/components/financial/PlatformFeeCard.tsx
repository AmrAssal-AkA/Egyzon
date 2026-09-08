import React from "react";
import { Link } from "react-router-dom";
import {
  Percent,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Settings,
  HelpCircle,
} from "lucide-react";

import type { PlatformFeeData } from "../../types/financial";
import type { IPlatformConfig } from "../../types/platformConfig";

interface PlatformFeeCardProps {
  data: IPlatformConfig | PlatformFeeData | null;
  isLoading?: boolean;
  className?: string;
}

export function PlatformFeeCard({
  data,
  isLoading = false,
  className = "",
}: PlatformFeeCardProps): React.ReactElement {
  const feePercentage =
    data?.feePercentage ??
    (data as IPlatformConfig)?.PlatformFeePercentage ??
    (data as IPlatformConfig)?.platformFeePercentage ??
    5;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-blue-200/80 bg-gradient-to-b from-blue-900 via-gray-900 to-slate-950 text-white p-6 shadow-md flex flex-col justify-between ${className}`}
      role="region"
      aria-label="Marketplace Platform Fee"
    >
      {/* Subtle ambient lighting accent */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 rounded-full bg-blue-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-indigo-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Primary Revenue Engine</span>
          </div>

          <Link
            to="/storeSetting"
            title="Configure platform commission in Settings"
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-blue-200">
              Platform Fee
            </h3>
            <span
              title="Platform fee is the percentage Egyzon automatically retains from all completed vendor transactions."
              className="cursor-help text-gray-400 hover:text-gray-200"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Primary Big Percentage Value */}
          <div className="mt-2 flex items-baseline gap-3">
            {isLoading ? (
              <div className="h-16 w-32 bg-white/10 animate-pulse rounded-lg" />
            ) : (
              <div className="flex items-center">
                <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white font-mono">
                  {feePercentage}
                </span>
                <span className="text-3xl sm:text-4xl font-bold text-blue-400 ml-1">
                  %
                </span>
              </div>
            )}

            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/20 ml-auto shrink-0">
              <Percent className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Narrative Explanation */}
        <p className="mt-3 text-xs leading-relaxed text-blue-100/80 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
          This percentage represents the fixed marketplace commission Egyzon takes
          from every completed customer order across all stores and transactions.
        </p>
      </div>

      {/* Security / Governance Badge */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1.5 text-gray-300">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          Automatic escrow fee deduction
        </span>
        <Link
          to="/storeSetting"
          className="text-blue-300 hover:text-white inline-flex items-center gap-0.5 hover:underline font-medium"
        >
          Adjust Rate
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default PlatformFeeCard;
