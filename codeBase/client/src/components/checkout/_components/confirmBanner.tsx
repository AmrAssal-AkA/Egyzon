import { Check, CheckCircle2 } from "lucide-react";
import { ConfirmationBannerProps } from "@/types/cart.type";

export function ConfirmationBanner({
  orderNumber,
  orderStatus,
  orderDate,
}: ConfirmationBannerProps) {
  return (
    <header
      role="status"
      aria-live="polite"
      className="w-full flex flex-col items-center text-center p-6 md:p-8 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl gap-4 shadow-sm"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full shadow-md animate-bounce-short">
        <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground tracking-tight">
          Order Confirmed
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-md">
          Thank you for your purchase. Your order has been received and is
          currently being processed.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-sm">
        <div className="flex flex-col items-center bg-background px-4 py-2.5 border border-border rounded-xl shadow-2xs min-w-35">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Order Number
          </span>
          <span className="font-semibold text-foreground font-mono mt-0.5">
            {orderNumber}
          </span>
        </div>

        <div className="flex flex-col items-center bg-background px-4 py-2.5 border border-border rounded-xl shadow-2xs min-w-35">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Order Date
          </span>
          <span className="font-semibold text-foreground mt-0.5">
            {orderDate}
          </span>
        </div>

        <div className="flex flex-col items-center bg-background px-4 py-2.5 border border-border rounded-xl shadow-2xs min-w-35">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Status
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
            <Check className="w-3.5 h-3.5" />
            {orderStatus}
          </span>
        </div>
      </div>
    </header>
  );
}
