import React from "react";

import {TrendingUp, TrendingDown} from "lucide-react"

export interface AnalyticCardProps {
  title: string;
  value: string;
  change?: string;
  description: string;
  isLoading?: boolean;
}

export default function AnalyticCard({
  title,
  value,
  change = "+0.0%",
  description,
  isLoading = false,
}: AnalyticCardProps) {
  const isNegative = (change || "").startsWith("-");

  return (
    <div className="w-full h-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </h3>
        <p
          className={`text-sm font-medium ${
            isNegative
              ? "text-red-500 dark:text-red-400"
              : "text-green-500 dark:text-green-400"
          }`}
        >
          {isNegative ? (
            <TrendingDown className="inline-block w-4 h-4 mr-1" />
          ) : (
            <TrendingUp className="inline-block w-4 h-4 mr-1" />
          )}
          {change}
        </p>
      </div>
      {isLoading ? (
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md my-0.5" />
      ) : (
        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {value}
        </p>
      )}
      <p className={`text-md font-medium text-slate-700 dark:text-slate-500 `}>
        {description}
      </p>
    </div>
  );
}
