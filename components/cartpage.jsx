"use client";
import React, { useMemo } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, addtocart, removeFromCart, clearCart } = useCart();

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-40">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
          <p className="text-gray-500 mt-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-6 inline-block bg-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      {Number(item.price).toFixed(2)} EGP
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addtocart(item, -1)}
                      className="p-1 rounded-full border hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => addtocart(item, 1)}
                      className="p-1 rounded-full border hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="text-red-500 hover:underline"
            >
              Clear Cart
            </button>
            <div className="text-right">
              <p className="text-lg font-semibold">
                Total:{" "}
                <span className="text-yellow-600">
                  {totalPrice.toFixed(2)} EGP
                </span>
              </p>
              <button className="mt-4 bg-yellow-400 text-white px-8 py-3 rounded-full hover:bg-yellow-500 transition-colors font-bold">
                Proceed to Checkout
              </button>
            </div>
          </div>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 text-yellow-600 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
