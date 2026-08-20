import React from "react";

import { Download, Home, Printer } from "lucide-react";
import { ActionBarProps } from "@/types/cart.type";

export function ActionBar({
  onBackHome,
  onPrintReceipt,
  onDownloadInvoice,
  onFinalizeConfirmation,
}: ActionBarProps) {
  return (
    <footer className="w-full flex flex-col sm:flex-row items-center gap-4 bg-muted/30 border border-border rounded-2xl p-6 shadow-2xs mt-2">
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto sm:mr-auto justify-center sm:justify-start">
        <button
          onClick={onBackHome}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 border border-border hover:bg-muted text-foreground rounded-xl transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.99]"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>

        <button
          onClick={onPrintReceipt}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 border border-border hover:bg-muted text-foreground rounded-xl transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.99]"
        >
          <Printer className="w-4 h-4" />
          Print Receipt
        </button>

        <button
          onClick={onDownloadInvoice}
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 border border-border hover:bg-muted text-foreground rounded-xl transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.99]"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </button>
      </div>

      <div className="w-full sm:w-auto">
        <button
          onClick={onFinalizeConfirmation}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.98] shadow-sm text-sm"
        >
          Finalize Confirmation
        </button>
      </div>
    </footer>
  );
}
