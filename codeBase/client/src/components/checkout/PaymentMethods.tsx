import React from "react";

import { CreditCard, Check } from "lucide-react";
import { PaymentMethodsProps } from "./CheckoutConfirmation";




export function PaymentMethods({ payment }: PaymentMethodsProps) {
  return (
    <section className="flex flex-col gap-4 bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-2xs">
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        <CreditCard className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        <h2 className="font-bold text-lg text-foreground font-serif">Payment Method</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Method Type</span>
          <span className="font-medium text-foreground mt-0.5">{payment.type}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Provider / Card</span>
            <span className="font-medium text-foreground mt-0.5">
              {payment.provider} (•••• {payment.last4})
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <Check className="w-3 h-3" />
            {payment.status}
          </span>
        </div>
      </div>
    </section>
  );
}
