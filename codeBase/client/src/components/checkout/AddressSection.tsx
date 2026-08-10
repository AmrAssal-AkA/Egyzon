import React from "react";

import { MapPin, Phone, User } from "lucide-react";
import { AddressSectionProps } from "./CheckoutConfirmation";



export function AddressSection({
  address,
  onChooseAddress,
  onAddAddress,
}: AddressSectionProps) {
  return (
    <section className="flex flex-col gap-4 bg-card text-card-foreground border border-border rounded-2xl p-6 shadow-2xs">
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        <MapPin className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        <h2 className="font-bold text-lg text-foreground font-serif">Shipping Address</h2>
      </div>

      <div className="flex flex-col gap-2 text-sm text-foreground">
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="font-semibold text-foreground">{address.fullName}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{address.phone}</span>
        </div>

        <div className="pl-6 flex flex-col gap-0.5 text-muted-foreground">
          <span>{address.street}</span>
          <span>
            {address.city}, {address.governorate} {address.postalCode}
          </span>
          <span className="font-medium text-foreground/80 mt-0.5">{address.country}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <button
          onClick={onChooseAddress}
          className="flex items-center justify-center text-xs font-semibold px-3 py-2.5 border border-border hover:bg-muted text-foreground rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Choose Address
        </button>
        <button
          onClick={onAddAddress}
          className="flex items-center justify-center text-xs font-semibold px-3 py-2.5 border border-border hover:bg-muted text-foreground rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          Add Address
        </button>
      </div>
    </section>
  );
}