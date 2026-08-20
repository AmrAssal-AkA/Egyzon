import React from "react";
import Link from "next/link";
import { BadgeCheck, Store } from "lucide-react";

interface Seller {
  storeName?: string;
  FirstName?: string;
  LastName?: string;
  name?: string;
  feedbackPercentage: number;
  responseTime: string;
  isVerified: boolean;
}

interface SellerCardProps {
  seller: Seller;
}

export default function SellerCard({ seller }: SellerCardProps) {
  const displayName =
    seller.storeName ||
    (seller.FirstName || seller.LastName ? `${seller.FirstName ?? ""} ${seller.LastName ?? ""}`.trim() : "") ||
    seller.name ||
    "Egyzon Store";


  // Get initials for avatar placeholder
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-muted/20 w-full hover:bg-muted/30 transition-colors duration-250">
      {/* Initials Avatar */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-sm tracking-wider shrink-0 shadow-sm">
        {initials}
      </div>

      {/* Seller Details */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground text-sm truncate">
            {displayName}
          </span>
          {seller.isVerified && (
            <BadgeCheck className="w-4.5 h-4.5 text-blue-600 shrink-0" aria-label="Verified Seller" />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
          <span>{seller.feedbackPercentage}% Positive Feedback</span>
          <span className="w-1 h-1 rounded-full bg-border shrink-0" />
          <span>{seller.responseTime}</span>
        </div>
      </div>

      {/* Visit Store Button */}
      <Link
        href="#"
        className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors py-2 px-3 border border-blue-600/20 rounded-lg hover:bg-blue-50/5"
      >
        <Store className="w-3.5 h-3.5" />
        <span>Visit Store</span>
      </Link>
    </div>
  );
}
