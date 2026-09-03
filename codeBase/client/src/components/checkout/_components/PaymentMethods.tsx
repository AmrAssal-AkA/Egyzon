import React from "react";
import { CreditCard, Check, Clock, X } from "lucide-react";
import { PaymentMethodsProps } from "@/types/cart.type";

export function PaymentMethods({ payment }: PaymentMethodsProps) {
  const isCreditCard =
    payment.type?.toLowerCase().includes("credit") ||
    payment.type?.toLowerCase().includes("card") ||
    Boolean(payment.last4 && payment.last4 !== "COD");

  const formattedCardInfo = () => {
    if (!isCreditCard) {
      return payment.provider || "Cash on Delivery";
    }

    const cleanLast4 = payment.last4?.replace(/\D/g, "");
    if (cleanLast4 && cleanLast4.length === 4) {
      return `${payment.provider || "Card"} (•••• ${cleanLast4})`;
    }
    if (payment.last4 && payment.last4.includes("•")) {
      return `${payment.provider || "Card"} (${payment.last4})`;
    }
    return payment.provider || "Credit Card";
  };

  const renderStatusBadge = () => {
    const statusLower = payment.status?.toLowerCase() || "pending";

    if (statusLower === "paid" || statusLower === "completed") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Check className="w-3 h-3" />
          Paid
        </span>
      );
    }

    if (statusLower === "failed" || statusLower === "cancelled") {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full border border-destructive/20">
          <X className="w-3 h-3" />
          Failed
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
        <Clock className="w-3 h-3" />
        {payment.status || "Pending"}
      </span>
    );
  };

  return (
    <section className="flex flex-col gap-4 bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-2xs">
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        <CreditCard
          className="w-5 h-5 text-muted-foreground"
          aria-hidden="true"
        />
        <h2 className="font-bold text-lg text-foreground font-serif">
          Payment Method
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
            Method Type
          </span>
          <span className="font-medium text-foreground mt-0.5">
            {payment.type}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
              Provider / Card
            </span>
            <span className="font-medium text-foreground mt-0.5 font-mono">
              {formattedCardInfo()}
            </span>
          </div>
          {renderStatusBadge()}
        </div>
      </div>
    </section>
  );
}
