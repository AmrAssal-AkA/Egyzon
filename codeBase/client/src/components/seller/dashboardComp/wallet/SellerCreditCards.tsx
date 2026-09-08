"use client";

import React, { useState, useMemo } from "react";
import {
  CreditCard as CreditCardIcon,
  Plus,
  ShieldCheck,
  Building2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SellerCreditCard,
  SellerCreditCardsProps,
  AddCreditCardDto,
} from "@/types/wallet";
import { sellerService } from "@/services/sellerService";
import { useSellerBankAccount } from "@/hooks/useSeller";
import CreditCardItem from "./CreditCardItem";
import AddCreditCardModal from "./AddCreditCardModal";



export default function SellerCreditCards({
  initialCards = [],
  onAddCard,
  onDeleteCard,
  onSetDefaultCard,
  className,
}: SellerCreditCardsProps) {
  const { bankAccount, isLoading: isBankLoading, mutate: revalidateBankAccount } =
    useSellerBankAccount();

  const [cards, setCards] = useState<SellerCreditCard[]>(initialCards);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Map backend bank account if available
  const bankCard: SellerCreditCard | null = useMemo(() => {
    if (!bankAccount) return null;
    return {
      id: "seller-linked-bank-account",
      cardHolder: bankAccount.fullName,
      cardNumberLast4: bankAccount.last4,
      brand: "other",
      expiryMonth: "",
      expiryYear: "",
      isDefault: true,
      colorVariant: "blue",
      bankCode: bankAccount.BankCode,
      status: bankAccount.status,
      issuer: bankAccount.issuer,
    };
  }, [bankAccount]);

  // Combine server bank account + locally added/saved cards
  const allCards = useMemo(() => {
    if (bankCard) {
      // If server bank card is default, make other cards non-default
      const rest = cards
        .filter((c) => c.id !== bankCard.id)
        .map((c) => (bankCard.isDefault ? { ...c, isDefault: false } : c));
      return [bankCard, ...rest];
    }
    return cards;
  }, [bankCard, cards]);

  // Add Card Handler
  const handleAddCard = async (
    cardDto: AddCreditCardDto & {
      colorVariant?: "blue" | "dark" | "emerald" | "purple";
    }
  ): Promise<boolean> => {
    setIsActionLoading(true);
    try {
      if (onAddCard) {
        const res = await onAddCard(cardDto);
        if (!res) return false;
      }

      // Determine brand
      const cleanNum = cardDto.cardNumber.replace(/\D/g, "");
      let brand: SellerCreditCard["brand"] = "other";
      if (/^4/.test(cleanNum)) brand = "visa";
      else if (/^(5[1-5]|2[2-7])/.test(cleanNum)) brand = "mastercard";
      else if (/^(5078|6051|6052|6053)/.test(cleanNum)) brand = "meeza";
      else if (/^3[47]/.test(cleanNum)) brand = "amex";

      const [expiryMonth = "12", expiryYear = "28"] =
        cardDto.expiryDate.split("/");

      const newCard: SellerCreditCard = {
        id: `card-${Date.now()}`,
        cardHolder: cardDto.cardHolder,
        cardNumberLast4: cleanNum.slice(-4),
        brand,
        expiryMonth,
        expiryYear,
        isDefault: cardDto.isDefault || (!bankCard && cards.length === 0),
        colorVariant: cardDto.colorVariant || "blue",
        createdAt: new Date().toISOString(),
      };

      setCards((prev) => {
        if (newCard.isDefault) {
          return [newCard, ...prev.map((c) => ({ ...c, isDefault: false }))];
        }
        return [newCard, ...prev];
      });

      toast.success("Card added successfully", {
        description: `Your ${brand.toUpperCase()} card ending in ${newCard.cardNumberLast4} is now saved.`,
      });

      return true;
    } catch {
      toast.error("Failed to add credit card");
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  // Set Default Card Handler
  const handleSetDefault = async (cardId: string) => {
    setIsActionLoading(true);
    try {
      if (onSetDefaultCard) {
        await onSetDefaultCard(cardId);
      }

      setCards((prev) =>
        prev.map((c) => ({
          ...c,
          isDefault: c.id === cardId,
        }))
      );

      const target = allCards.find((c) => c.id === cardId);
      toast.success("Default card updated", {
        description: `Card ending in ${target?.cardNumberLast4 || ""} is now your default payout method.`,
      });
    } catch {
      toast.error("Failed to set default card");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Delete Card Handler
  const handleDeleteCard = async (cardId: string) => {
    if (cardId === "seller-linked-bank-account") {
      setIsActionLoading(true);
      try {
        const res = await sellerService.removeSellerBankAccount();
        if (!res.success) {
          toast.error("Failed to remove bank account", {
            description: res.error || res.message,
          });
          return;
        }

        toast.success("Bank account removed successfully");
        await revalidateBankAccount();
      } catch {
        toast.error("Failed to remove bank account");
      } finally {
        setIsActionLoading(false);
      }
      return;
    }

    setIsActionLoading(true);
    try {
      if (onDeleteCard) {
        await onDeleteCard(cardId);
      }

      setCards((prev) => {
        const remaining = prev.filter((c) => c.id !== cardId);
        // If we deleted the default card and no bank card is default, set first remaining
        if (
          !bankCard &&
          remaining.length > 0 &&
          !remaining.some((c) => c.isDefault)
        ) {
          remaining[0].isDefault = true;
        }
        return remaining;
      });

      toast.success("Card removed successfully");
    } catch {
      toast.error("Failed to remove credit card");
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <section
      aria-labelledby="seller-credit-cards-title"
      className={cn(
        "w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-300",
        className
      )}
    >
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
            <CreditCardIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="seller-credit-cards-title"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                Cards & Accounts
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {isBankLoading ? "..." : allCards.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Payout cards and payment methods
            </p>
          </div>
        </div>

        {/* Actions: Revalidate / Add Card */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => revalidateBankAccount()}
            variant="ghost"
            size="icon-sm"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Refresh bank account"
            aria-label="Refresh bank account"
          >
            <RefreshCw
              className={cn("h-4 w-4", isBankLoading && "animate-spin")}
            />
          </Button>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            size="sm"
            className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-xs font-medium text-xs rounded-xl"
          >
            <Plus className="h-4 w-4" />
            <span>Add Card</span>
          </Button>
        </div>
      </div>

      {/* Body: Cards List or Empty State */}
      <div className="p-5 md:p-6 flex flex-col gap-4">
        {/* Loading Skeleton */}
        {isBankLoading ? (
          <div className="w-full aspect-[1.7/1] rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse flex flex-col justify-between p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
            </div>
            <div className="h-5 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="flex justify-between items-end">
              <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>
        ) : allCards.length === 0 ? (
          /* Empty State */
          <div className="py-10 px-4 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 mb-3">
              <Building2 className="h-8 w-8" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              No Cards or Accounts Added
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 mb-4">
              Add your credit, debit, or Egyptian Meeza card to receive payouts and manage store fees.
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size="sm"
              variant="outline"
              className="gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Your First Card</span>
            </Button>
          </div>
        ) : (
          /* Cards List */
          <div className="flex flex-col gap-4">
            {allCards.map((card) => (
              <CreditCardItem
                key={card.id}
                card={card}
                onSetDefault={handleSetDefault}
                onDelete={handleDeleteCard}
                isActionLoading={isActionLoading}
              />
            ))}
          </div>
        )}

        {/* Egyptian Payment Scheme Info / Trust Banner */}
        <div className="mt-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3 text-xs">
          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="flex flex-col gap-0.5 text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Bank-Grade Security
            </span>
            <span>
              Supports Visa, Mastercard, and Egyptian Meeza cards. Card details are encrypted and never stored in plain text.
            </span>
          </div>
        </div>
      </div>

      {/* Add Card / Link Bank Account Modal */}
      <AddCreditCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCard={handleAddCard}
        onBankAccountAdded={revalidateBankAccount}
      />
    </section>
  );
}

