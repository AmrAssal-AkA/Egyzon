"use client";
import React, { useMemo, useState } from "react";
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  Lock,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Business logic for pricing reused from CartPage
  const subPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  }, [cartItems]);

  const taxPrice = useMemo(() => subPrice * 0.14, [subPrice]);
  const shippingPrice = subPrice > 2000 ? 0 : 50;
  const totalPrice = useMemo(
    () => subPrice + taxPrice + shippingPrice,
    [subPrice, taxPrice, shippingPrice],
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/30 pt-32 pb-20 px-4 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet. Discover our
            latest products and start shopping.
          </p>
          <Link href="/products">
            <button className="w-full bg-yellow-400 text-gray-900 font-bold py-4 rounded-2xl hover:bg-yellow-500 transition-all active:scale-95">
              Explore Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pt-24 lg:pt-32 pb-20 dark:bg-gray-800 dark:bg-opacity-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cart"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group dark:hover:bg-gray-600"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-300" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-amber-400">
            Checkout
          </h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:items-start gap-8 ">
          {/* Left Column: Checkout Info */}
          <div className="lg:col-span-8 space-y-6 ">
            {/* 1. Delivery Address Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-gray-900 font-bold text-sm">
                  1
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                  Shipping Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 dark:text-gray-50">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full p-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-yellow-400 transition-all outline-none text-gray-900 font-medium dark:bg-gray-50 dark:text-black dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 dark:text-gray-50">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full p-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-yellow-400 transition-all outline-none text-gray-900 font-medium dark:bg-gray-50 dark:text-black dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 dark:text-gray-50">
                    Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="Building, Street Name, District"
                    className="w-full p-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-yellow-400 transition-all outline-none text-gray-900 font-medium dark:bg-gray-50 dark:text-black dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 dark:text-gray-50">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Cairo"
                    className="w-full p-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-yellow-400 transition-all outline-none text-gray-900 font-medium dark:bg-gray-50 dark:text-black dark:placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 dark:text-gray-50">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="01XXXXXXXXX"
                    className="w-full p-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-yellow-400 transition-all outline-none text-gray-900 font-medium dark:bg-gray-50 dark:text-black dark:placeholder:text-gray-500"
                  />
                </div>
              </div>
            </section>

            {/* 2. Payment Method Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-gray-900 font-bold text-sm">
                  2
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                  Payment Option
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 dark:bg-gray-700 dark:border-gray-600">
                <label
                  className={`relative flex flex-col p-6 rounded-3xl border-2 cursor-pointer transition-all ${paymentMethod === "card" ? "border-yellow-400 bg-yellow-50/30 shadow-sm shadow-yellow-200/50" : "border-gray-100 hover:border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600"}`}
                >
                  <div className="flex items-center justify-between mb-4 dark:text-gray-300">
                    <CreditCard
                      className={`w-6 h-6 ${paymentMethod === "card" ? "text-yellow-600" : "text-gray-400"}`}
                    />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-5 h-5 accent-yellow-600"
                    />
                  </div>
                  <p className="font-bold text-gray-900">Credit Card</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Visa or Mastercard
                  </p>
                </label>

                <label
                  className={`relative flex flex-col p-6 rounded-3xl border-2 cursor-pointer transition-all ${paymentMethod === "cod" ? "border-yellow-400 bg-yellow-50/30 shadow-sm shadow-yellow-200/50" : "border-gray-100 hover:border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600"}`}
                >
                  <div className="flex items-center justify-between mb-4 dark:text-gray-300">
                    <Truck
                      className={`w-6 h-6 ${paymentMethod === "cod" ? "text-yellow-600" : "text-gray-400"}`}
                    />
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-5 h-5 accent-yellow-600"
                    />
                  </div>
                  <p className="font-bold text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay when order arrives
                  </p>
                </label>
              </div>
            </section>

            {/* 3. Cart Items Review Section */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-gray-900 font-bold text-sm">
                  3
                </span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                  Review Items
                </h2>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-600/80"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden p-2 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs sm:text-sm text-gray-500 font-medium">
                          Quantity: {item.quantity}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-xs sm:text-sm text-yellow-700 font-bold">
                          {Number(item.price).toFixed(2)} EGP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-4 mt-8 lg:mt-0 dark:bg-gray-700 dark:border-gray-600">
            <div className="lg:sticky lg:top-32 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-gray-200/50 dark:bg-gray-700 dark:shadow-gray-700/50 dark:border-gray-600`">
                <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-gray-50">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 dark:text-gray-300">
                  <div className="flex justify-between text-gray-600 font-medium dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>{subPrice.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium dark:text-gray-300">
                    <span>Shipping</span>
                    <span
                      className={
                        shippingPrice === 0 ? "text-green-600 font-bold" : ""
                      }
                    >
                      {shippingPrice === 0
                        ? "FREE"
                        : `${shippingPrice.toFixed(2)} EGP`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium dark:text-gray-300">
                    <span>Tax (14%)</span>
                    <span>{taxPrice.toFixed(2)} EGP</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                      Grand Total
                    </span>
                    <div className="text-right">
                      <p className="text-3xl font-black text-yellow-600 leading-none">
                        {totalPrice.toFixed(2)} EGP
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">
                        VAT Included
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl hover:bg-yellow-500 transition-all duration-300 font-bold text-lg active:scale-95 shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-3">
                  <Lock className="w-5 h-5" />
                  Place Order
                </button>

                <div className="mt-6 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      SSL Secure Checkout
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gray-100/50 rounded-2xl p-4 border border-gray-200/50 flex items-start gap-3 dark:bg-gray-600/50 dark:border-gray-500">
                <ShieldCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  By placing your order, you agree to Egyzon's privacy notice
                  and terms of use. Secure transaction guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
