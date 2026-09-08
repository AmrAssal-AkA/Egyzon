"use client";

import React, { useState } from "react";
import {
  Check,
  CreditCard as CreditCardIcon,
  MoreVertical,
  Star,
  Trash2,
  Wifi,
  Clock,
  ShieldCheck,
  AlertCircle,
  Landmark,
} from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SellerCreditCard } from "@/types/wallet";

interface CreditCardItemProps {
  card: SellerCreditCard;
  onSetDefault?: (id: string) => void;
  onDelete?: (id: string) => void;
  isActionLoading?: boolean;
}

export default function CreditCardItem({
  card,
  onSetDefault,
  onDelete,
  isActionLoading = false,
}: CreditCardItemProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Gradient themes based on colorVariant or brand
  const getCardBackground = () => {
    switch (card.colorVariant) {
      case "emerald":
        return "from-emerald-900 via-teal-950 to-slate-950 text-white shadow-emerald-950/20";
      case "purple":
        return "from-purple-950 via-indigo-950 to-slate-950 text-white shadow-purple-950/20";
      case "dark":
        return "from-slate-900 via-zinc-900 to-black text-white shadow-slate-950/30";
      case "blue":
      default:
        return "from-blue-900 via-indigo-950 to-slate-950 text-white shadow-blue-950/20";
    }
  };

  // Status badge renderer (pending_verification, verified, rejected)
  const renderStatusBadge = () => {
    if (!card.status) return null;

    if (card.status === "verified") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-semibold tracking-wider">
          <ShieldCheck className="h-3 w-3" />
          Verified
        </span>
      );
    }

    if (card.status === "pending_verification") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-300 text-[10px] font-semibold tracking-wider animate-pulse">
          <Clock className="h-3 w-3" />
          Pending Verification
        </span>
      );
    }

    if (card.status === "rejected") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/25 border border-rose-400/50 text-rose-300 text-[10px] font-semibold tracking-wider">
          <AlertCircle className="h-3 w-3" />
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-500/20 border border-slate-400/40 text-slate-300 text-[10px] font-medium uppercase tracking-wider">
        {card.status.replace("_", " ")}
      </span>
    );
  };

  // Card brand badge / logo renderer
  const renderBrandLogo = () => {
    switch (card.brand) {
      case "visa":
        return (
          <div className="flex items-center gap-1">
            <FaCcVisa className="h-8 w-8 text-white/90" />
            <span className="sr-only">Visa</span>
          </div>
        );
      case "mastercard":
        return (
          <div className="flex items-center gap-1">
            <FaCcMastercard className="h-8 w-8 text-amber-400" />
            <span className="sr-only">Mastercard</span>
          </div>
        );
      case "amex":
        return (
          <div className="flex items-center gap-1">
            <FaCcAmex className="h-8 w-8 text-sky-400" />
            <span className="sr-only">American Express</span>
          </div>
        );
      case "meeza":
        return (
          <div className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase">
            Meeza ميزة
          </div>
        );
      default:
        if (card.bankCode) {
          return (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-bold text-xs tracking-wider">
              <Landmark className="h-3.5 w-3.5 text-white/80" />
              <span>{card.bankCode}</span>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-1">
            <CreditCardIcon className="h-6 w-6 text-white/80" />
          </div>
        );
    }
  };

  return (
    <div className="relative group w-full transition-all duration-300">
      {/* Visual Card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-5 md:p-6 bg-linear-to-br shadow-lg border border-white/10 transition-transform duration-300 group-hover:scale-[1.01]",
          getCardBackground()
        )}
      >
        {/* Subtle decorative background circles */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/5 blur-xl" />
        <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-blue-500/10 blur-xl" />

        {/* Top row: Chip, Contactless icon, Bank Code, and Brand */}
        <div className="flex items-center justify-between relative z-10 mb-6">
          <div className="flex items-center gap-3">
            {/* EMV Chip */}
            <div className="relative h-7 w-9 rounded-md bg-linear-to-tr from-amber-300 via-amber-200 to-yellow-400 p-1 shadow-inner border border-amber-400/40 flex items-center justify-center">
              <div className="w-full h-full border border-amber-600/30 rounded-[3px] flex flex-col justify-between py-0.5">
                <div className="w-full h-px bg-amber-600/30" />
                <div className="w-full h-px bg-amber-600/30" />
              </div>
            </div>

            {/* Contactless symbol */}
            <Wifi className="h-4 w-4 rotate-90 text-white/50" />

            {/* Bank Code badge */}
            {card.bankCode && (
              <span className="px-2 py-0.5 rounded bg-white/10 border border-white/15 text-white/90 font-bold text-xs tracking-wider">
                {card.bankCode}
              </span>
            )}
          </div>

          {/* Brand + Default Badge + Status */}
          <div className="flex items-center gap-2">
            {card.isDefault && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">
                <Check className="h-3 w-3" />
                Default
              </span>
            )}
            {renderStatusBadge()}
            {renderBrandLogo()}
          </div>
        </div>

        {/* Masked Card Number */}
        <div className="relative z-10 mb-5">
          <div className="font-mono text-lg sm:text-xl tracking-[0.2em] text-white/90 font-medium select-none">
            •••• •••• •••• {card.cardNumberLast4}
          </div>
        </div>

        {/* Bottom row: Cardholder Name & Expiration / Issuer */}
        <div className="flex items-end justify-between relative z-10 text-xs">
          <div className="flex flex-col max-w-[65%]">
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
              Account Holder
            </span>
            <span className="font-semibold text-white/95 uppercase truncate tracking-wide text-xs sm:text-sm">
              {card.cardHolder || "Valued Merchant"}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
              {card.expiryMonth && card.expiryYear ? "Expires" : "Account Type"}
            </span>
            <span className="font-mono font-medium text-white/90 text-xs sm:text-sm">
              {card.expiryMonth && card.expiryYear
                ? `${card.expiryMonth}/${card.expiryYear}`
                : card.issuer === "bank_card"
                ? "Bank Card"
                : "Linked Account"}
            </span>
          </div>
        </div>

        {/* Action Menu (Top right over the card) */}
        <div className="absolute top-3 right-3 z-20">
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isActionLoading}
              className="p-1 rounded-lg bg-black/20 hover:bg-black/40 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/30 cursor-pointer disabled:opacity-40"
              aria-label="Card options"
            >
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 text-xs">
              {!card.isDefault && onSetDefault && (
                <DropdownMenuItem
                  onClick={() => onSetDefault(card.id)}
                  className="cursor-pointer gap-2"
                >
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  <span>Set as Default</span>
                </DropdownMenuItem>
              )}

              {onDelete && (
                <>
                  {!card.isDefault && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    onClick={() => setShowConfirmDelete(true)}
                    className="cursor-pointer gap-2 text-rose-600 dark:text-rose-400 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove Card</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Inline Delete Confirmation Drawer / Warning */}
      {showConfirmDelete && (
        <div className="mt-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
            <Trash2 className="h-4 w-4 shrink-0" />
            <span>Remove this card ending in {card.cardNumberLast4}?</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowConfirmDelete(false);
                onDelete?.(card.id);
              }}
              className="px-2 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
