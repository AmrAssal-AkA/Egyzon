"use client";

import React from "react";
import AnalyticCard from "./AnalyticCard";
import { useTotalRevenue } from "@/hooks/useSeller";

interface TotalRevenueCardProps {
  change?: string;
  description?: string;
}

export default function TotalRevenueCard({
  change = "+0.0%",
  description = "Total revenue earned across all sales",
}: TotalRevenueCardProps) {
  const { totalRevenue, isLoading } = useTotalRevenue();

  return (
    <AnalyticCard
      title="Total Revenue"
      value={`${totalRevenue.toLocaleString()} EGP`}
      change={change}
      description={description}
      isLoading={isLoading}
    />
  );
}
