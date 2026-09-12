import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Store } from "lucide-react";

import { Seller } from "@/types/store";

interface SellerCardProps {
  seller?: Seller;
}

export default function SellerCard({ seller }: SellerCardProps) {
  if (!seller) return null;

  const displayName =
    seller.storeName ||
    (seller.FirstName || seller.LastName
      ? `${seller.FirstName ?? ""} ${seller.LastName ?? ""}`.trim()
      : "") ||
    seller.name ||
    "Egyzon Store";

  const storeLogo = seller.storeManagement?.storeLogo || seller.storeLogo;

  const hasValidLogo =
    typeof storeLogo === "string" && storeLogo.trim().length > 0;

  // Get initials for avatar placeholder
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "EG";

  const feedback = seller.feedbackPercentage ?? 100;

  return (
    <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-muted/20 w-full hover:bg-muted/30 transition-colors duration-250">
      {/* Initials or Logo Avatar */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-sm tracking-wider shrink-0 shadow-sm overflow-hidden">
        {hasValidLogo ? (
          <Image
            src={storeLogo}
            alt={displayName}
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Seller Details */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground text-sm truncate">
            {displayName}
          </span>
          {seller.isVerified && (
            <BadgeCheck
              className="w-4.5 h-4.5 text-blue-600 shrink-0"
              aria-label="Verified Seller"
            />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
          <span>{feedback}% Positive Feedback</span>
          <span className="w-1 h-1 rounded-full bg-border shrink-0" />
        </div>
      </div>
        
    </div>
  );
}

