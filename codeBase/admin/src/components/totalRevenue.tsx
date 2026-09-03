import React from "react";

import { PoundSterling } from "lucide-react";

import { Card } from "./_components/Card";
import { useTotalRevenue } from "../hooks/useAnalytics";

export interface TotalRevenueProps {
  className?: string;
}

export function TotalRevenue({ className }: TotalRevenueProps): React.ReactElement {
  const { data, isLoading, error } = useTotalRevenue();

  const formattedValue = isLoading
    ? "..."
    : error || data === null
    ? "—"
    : `${data.toLocaleString()} EGP`;

  return (
    <Card
      title="Total Revenue"
      description="Platform total revenue from all sellers"
      value={formattedValue}
      icon={<PoundSterling className="w-5 h-5 text-blue-600" />}
      badges={!isLoading && data !== null ? ["Platform Total"] : []}
      variant="default"
      className={`hover:border-blue-200 transition-all ${className ?? ""}`.trim()}
    />
  );
}

export default TotalRevenue;
