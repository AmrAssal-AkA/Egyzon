"use client";

import React from "react";
import AnalyticCard from "./AnalyticCard";
import { useTotalProducts } from "@/hooks/useSeller";

interface TotalProductsCardProps {
  change?: string;
  description?: string;
}

export default function TotalProductsCard({
  change = "+0.0%",
  description = "Total products listed in your store",
}: TotalProductsCardProps) {
  const { totalProducts, isLoading } = useTotalProducts();

  return (
    <AnalyticCard
      title="Total Products"
      value={totalProducts.toLocaleString()}
      change={change}
      description={description}
      isLoading={isLoading}
    />
  );
}
