import React from "react";
import { Truck } from "lucide-react";

import { DeliveryOptionsProps } from "./CheckoutConfirmation";


export function DeliveryOptions({ delivery }: DeliveryOptionsProps) {
  return (
    <section className="flex flex-col gap-4 bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-2xs">
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        <Truck className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        <h2 className="font-bold text-lg text-foreground font-serif">Delivery Options</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Method</span>
          <span className="font-medium text-foreground mt-0.5">{delivery.method}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Estimated Delivery</span>
          <span className="font-medium text-foreground mt-0.5">{delivery.estimatedDelivery}</span>
        </div>

        <div className="flex items-center justify-between bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 mt-1">
          <span className="text-xs font-medium text-muted-foreground">Tracking Status</span>
          <span className="inline-flex items-center text-xs font-semibold text-primary px-2.5 py-1 bg-primary/10 rounded-full">
            {delivery.trackingAvailable ? "Tracking Available" : "No Tracking"}
          </span>
        </div>
      </div>
    </section>
  );
}