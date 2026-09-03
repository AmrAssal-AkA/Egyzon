import React from "react";

import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

import { Card } from "./_components/Card";
import { usePendingSellersCount } from "../hooks/useAnalytics";

export interface PendingSellersCardProps {
  className?: string;
}

export function PendingSellersCard({
  className,
}: PendingSellersCardProps): React.ReactElement {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePendingSellersCount();

  const formattedValue = isLoading
    ? "..."
    : error || !data
    ? "—"
    : data.totalSellersPending.toLocaleString();

  const badges =
    !isLoading && data ? [`${data.totalSellersPending} Pending`] : [];

  return (
    <Card
      title="Pending Applications"
      description="Sellers awaiting verification & onboarding."
      value={formattedValue}
      icon={<ShieldAlert className="w-5 h-5 text-amber-600" />}
      badges={badges}
      variant="default"
      actions={[
        {
          label: "Review Applications",
          onClick: () => navigate("/sellerManagement"),
          variant: "outline",
        },
      ]}
      className={`hover:border-amber-200 transition-all ${className ?? ""}`.trim()}
    />
  );
}

export default PendingSellersCard;
