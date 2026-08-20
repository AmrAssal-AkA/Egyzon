"use client";

import React from "react";
import AnalyticCard from "./AnalyticCard";
import { useTotalOrders } from "@/hooks/useSeller";

interface TotalOrdersCardProps {
  change?: string;
  description?: string;
}

export default function TotalOrdersCard({
  change = "+0.0%",
  description = "Total orders received",
}: TotalOrdersCardProps) {
  const { totalOrders, isLoading } = useTotalOrders();

  return (
    <AnalyticCard
      title="Total Orders"
      value={totalOrders.toLocaleString()}
      change={change}
      description={description}
      isLoading={isLoading}
    />
  );
}
