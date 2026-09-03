"use client";

import React from "react";
import AnalyticCard from "./AnalyticCard";
import { useAverageOrderValue } from "@/hooks/useSeller";

interface AverageOrderValueCardProps {
  change?: string;
  description?: string;
}

export default function AverageOrderValueCard({
  change,
  description = "Improvement in average order value",
}: AverageOrderValueCardProps) {
  const { avgOrderValue, changePercent, isLoading } = useAverageOrderValue();

  const formattedChange =
    change ??
    (changePercent !== undefined
      ? `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(1)}%`
      : "+0.0%");

  return (
    <AnalyticCard
      title="AvgOrderValue"
      value={`${avgOrderValue.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })} EGP`}
      change={formattedChange}
      description={description}
      isLoading={isLoading}
    />
  );
}
