"use client";
import React, { useMemo } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, addtocart, removeFromCart, clearCart } = useCart();
  const subPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return subPrice * 1.14;
  }, [subPrice]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-24 lg:mt-32 mb-20">
      <div className="flex items-center gap-4 mb-8 ">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-amber-400">Shopping Cart</h1>
        <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-sm font-medium dark:bg-gray-700 dark:text-gray-300">
          {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl text-center py-24 px-4 border border-gray-100 shadow-sm flex flex-col items-center justify-center dark:bg-gray-800 dark:border-gray-600">
          <div className="bg-white p-6 rounded-full shadow-sm mb-6 dark:bg-gray-700">
            <ShoppingBag className="w-16 h-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-md dark:text-gray-400">
            Looks like you haven't added anything to your cart yet. Discover our
            latest products and start shopping.
          </p>
          <Link href="/products">
            <button className="bg-yellow-400 text-gray-900 font-bold px-8 py-3.5 rounded-full hover:bg-yellow-500 transition-colors duration-200">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-10 xl:gap-x-12 space-y-10 lg:space-y-0">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-600  "
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between w-full h-full py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="font-semibold text-lg text-gray-900 line-clamp-2 dark:text-gray-300">
                          {item.name}
                        </h2>
                        <p className="text-yellow-600 font-bold mt-1 text-lg">
                          {Number(item.price).toFixed(2)} EGP
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 -mr-2 sm:mr-0 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center pt-2">
                      <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
                        <button
                          onClick={() => addtocart(item, -1)}
                          className="w-9 h-9 flex justify-center items-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full disabled:opacity-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addtocart(item, 1)}
                          className="w-9 h-9 flex justify-center items-center text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-600 font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 hover:underline font-medium px-4 py-2"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4 bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm lg:sticky lg:top-32 dark:bg-gray-800 dark:border-gray-600">
            <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-gray-50">
              Order Summary
            </h2>
            <div className="space-y-4 text-gray-600 border-b border-gray-200 pb-6 mb-6 dark:border-gray-700 dark:text-gray-300">
              <div className="flex justify-between items-center text-base">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-gray-300">
                  {subPrice.toFixed(2)} EGP
                </span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span>Estimated Tax (14%)</span>
                <span className="font-medium text-gray-900 dark:text-gray-300">
                  {(totalPrice - subPrice).toFixed(2)} EGP
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-50">Total</span>
              <span className="text-2xl font-bold text-yellow-600">
                {totalPrice.toFixed(2)} EGP
              </span>
            </div>
            <button
              className="w-full bg-yellow-400 text-gray-900 px-8 py-4 rounded-full hover:bg-yellow-500 transition-colors font-bold text-lg flex items-center justify-center gap-2 active:scale-95 duration-200"
              onClick={() => router.push("/checkout")}
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
