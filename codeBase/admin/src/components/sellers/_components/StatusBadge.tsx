import type { SellerStatus } from "../../../types/seller";

export function StatusBadge({ status }: { status: SellerStatus }): React.ReactElement {
  const badgeStyles: Record<SellerStatus, string> = {
    pending: "bg-orange-50 text-orange-700 border-orange-200",
    under_review: "bg-blue-50 text-blue-700 border-blue-200",
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    suspended: "bg-amber-50 text-amber-700 border-amber-200",
    banned: "bg-red-50 text-red-700 border-red-200",
  };

  const labels: Record<SellerStatus, string> = {
    pending: "Pending Application",
    under_review: "Under Review",
    active: "Active Seller",
    suspended: "Suspended",
    banned: "Application Rejected",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles[status]}`}
    >
      {labels[status]}
    </span>
  );
}