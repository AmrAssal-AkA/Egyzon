import type { SellerStatus } from "../../../types/seller";
import { Ban, Clock, Eye, PauseCircle, ShieldCheck } from "lucide-react";

const statusConfig: Record<
  SellerStatus,
  { label: string; className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: {
    label: "Pending",
    className: "bg-orange-50 text-orange-600 border-orange-100",
    icon: Clock,
  },
  under_review: {
    label: "Under Review",
    className: "bg-blue-50 text-blue-600 border-blue-100",
    icon: Eye,
  },
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
    icon: ShieldCheck,
  },
  suspended: {
    label: "Suspended",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    icon: PauseCircle,
  },
  banned: {
    label: "Banned",
    className: "bg-red-50 text-red-600 border-red-100",
    icon: Ban,
  },
};

function SellerStatusBadge({ status }: { status: SellerStatus }): React.ReactElement {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {config.label}
    </span>
  );
}

export { SellerStatusBadge };