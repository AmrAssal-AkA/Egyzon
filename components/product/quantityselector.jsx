import React from "react";
import { Minus, Plus } from "lucide-react";

export default function Quantity({ quantity, onQuantityChange }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Quantity
      </h3>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="p-2 rounded-xl border border-gray-300 hover:border-gray-400 transition-colors dark:border-gray-600 dark:hover:border-gray-500 text-gray-900 dark:text-white"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="px-6 py-2 bg-gray-100 rounded-xl font-medium min-w-16 text-center text-gray-900 dark:bg-gray-700 dark:text-white">
          {quantity}
        </span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="p-2 rounded-xl border border-gray-300 hover:border-gray-400 transition-colors dark:border-gray-600 dark:hover:border-gray-500 text-gray-900 dark:text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
