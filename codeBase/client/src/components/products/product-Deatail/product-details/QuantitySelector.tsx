"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  stock?: number;
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  stock = 99,
  disabled = false,
}: QuantitySelectorProps) {
  const isOutOfStock = stock <= 0 || disabled;

  const decrease = () => {
    if (!isOutOfStock && quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (!isOutOfStock && quantity < stock) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOutOfStock) return;
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val < 1) {
        onChange(1);
      } else if (val > stock) {
        onChange(stock);
      } else {
        onChange(val);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">Quantity</span>
      <div
        className={`flex items-center w-32 h-11 border border-border rounded-lg overflow-hidden bg-background ${
          isOutOfStock ? "opacity-50 cursor-not-allowed bg-muted" : ""
        }`}
      >
        <button
          type="button"
          onClick={decrease}
          disabled={isOutOfStock || quantity <= 1}
          className="flex items-center justify-center w-10 h-full text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={isOutOfStock ? 0 : quantity}
          onChange={handleInputChange}
          disabled={isOutOfStock}
          className="w-12 h-full text-center text-sm font-semibold border-x border-border focus:outline-none bg-transparent text-foreground disabled:cursor-not-allowed"
          aria-label="Item quantity"
        />
        <button
          type="button"
          onClick={increase}
          disabled={isOutOfStock || quantity >= stock}
          className="flex items-center justify-center w-10 h-full text-foreground hover:bg-muted disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
