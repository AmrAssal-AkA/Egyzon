import React from "react";

import { Users } from "lucide-react";

import { Card } from "./_components/Card";
import { useActiveSellersCount } from "../hooks/useAnalytics";

export interface ActiveSellersCardProps {
  className?: string;
}

export function ActiveSellersCard({ className }: ActiveSellersCardProps): React.ReactElement {
  const { data, isLoading, error } = useActiveSellersCount();

  const formattedValue = isLoading
    ? "..."
    : error || !data
    ? "—"
    : data.totalSellersActive.toLocaleString();

  const badges: string[] = [];
  if (!isLoading && data && typeof data.growth === "number") {
    const prefix = data.growth > 0 ? "+" : "";
    badges.push(`${prefix}${data.growth}% growth`);
  }

  return (
    <Card
      title="Active Sellers"
      description="Merchants actively selling on the platform."
      value={formattedValue}
      icon={<Users className="w-5 h-5 text-indigo-600" />}
      badges={badges}
      variant="default"
      className={`hover:border-indigo-200 transition-all ${className ?? ""}`.trim()}
    />
  );
}

export default ActiveSellersCard;