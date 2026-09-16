import React from "react";


import { Seller } from "../../types/seller";
import { BusinessAvatar } from "./_components/BusinessAvatar";
import { RiskScoreBar } from "./_components/RiskScoreBar";
import { SellerStatusBadge } from "./_components/StatusBadge";
import { SellerRowActionsMenu } from "./_components/SellerRowActionsMenu";

export type SellerRowAction = "view" | "approve" | "reject" | "requestDocs";

interface SellerTableProps {
  sellers: Seller[];
  onSellerAction?: (action: SellerRowAction, seller: Seller) => void;
}


export default function SellerTable({
  sellers,
  onSellerAction,
}: SellerTableProps): React.ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[960px] text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100">
            <th className="py-3.5 pl-6 pr-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Business Entity
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Principal / Owner
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Submitted
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Risk Score
            </th>
            <th className="py-3.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Status
            </th>
            <th className="py-3.5 pr-6 pl-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {sellers.map((seller) => (
            <tr
              key={seller.id}
              className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
            >
              <td className="py-4 pl-6 pr-3">
                <div className="flex items-center gap-3 min-w-[240px]">
                  <BusinessAvatar name={seller.storeName || "—"} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {seller.storeName || "—"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      ID: {seller.businessId || seller.commercialRegisterNumber || "—"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="py-4 px-3">
                <div className="min-w-[180px]">
                  <p className="text-sm text-gray-900">{seller.ownerName || "—"}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {seller.ownerEmail || "—"}
                  </p>
                  {seller.phoneNumber && seller.phoneNumber !== "string" && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {seller.phoneNumber}
                    </p>
                  )}
                </div>
              </td>

              <td className="py-4 px-3 whitespace-nowrap">
                <p className="text-sm text-gray-900">{seller.submittedAt}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {seller.submittedRelative}
                </p>
              </td>

              <td className="py-4 px-3">
                <RiskScoreBar score={seller.riskScore} />
              </td>

              <td className="py-4 px-3">
                <SellerStatusBadge status={seller.status} />
              </td>

              <td className="py-4 pr-6 pl-3 text-right">
                <SellerRowActionsMenu
                  seller={seller}
                  onSellerAction={onSellerAction}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
