"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Quantity from "@/components/product/quantityselector";
import useCartStore from "@/stores/buyer/cartSore";
import ImageGallery from "@/components/product/ImageGallery";

export default function productDetailPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const productWithImages = {
    ...product,
    image: Array.isArray(product.image) ? product.image : [product.image],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="mx-auto px-2 sm:px-3 lg:px-4">
        <div className="lg:grid lg:grid-cols-12 lg:items-start gap-2 xl:gap-3">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-3 sm:p-6 border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800/50 dark:shadow-2xl dark:shadow-gray-950/50">
              <ImageGallery product={productWithImages} />
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col gap-2 lg:sticky lg:top-32">
            {/* Main Info Section */}
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-gray-100 shadow-sm space-y-2 dark:bg-gray-900 dark:border-gray-800/50 dark:shadow-xl dark:shadow-gray-950/50">
              <div className="space-y-2">
                {product.category && (
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider dark:bg-yellow-500/15 dark:text-yellow-300 dark:border dark:border-yellow-500/30">
                    {product.category}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight dark:text-white">
                  {product.name}
                </h1>
              </div>

              <div className="flex flex-col gap-0">
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-black text-yellow-600 dark:text-yellow-400">
                    {Number(product.price).toFixed(2)}
                    <span className="text-lg ml-1">EGP</span>
                  </p>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through decoration-red-500/50 font-medium dark:text-gray-500 ">
                      {Number(product.oldPrice).toFixed(2)} EGP
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 font-medium italic">
                  Including all taxes and shipping fees
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800/50">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 dark:text-gray-500">
                  Stock Status
                </h3>
                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 w-fit px-4 py-2 rounded-xl dark:bg-green-950/40 dark:text-green-300 dark:border dark:border-green-800/50">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  In Stock
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800/50">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 dark:text-gray-500">
                  Quick Overview
                </h3>
                {product.description && (
                  <p className="text-base text-gray-600 leading-relaxed line-clamp-4 dark:text-gray-300">
                    {product.description}
                  </p>
                )}
              </div>
            </div>

            {/* Purchase Card */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-3 sm:p-4 border border-yellow-600/30 shadow-2xl shadow-yellow-500/20 dark:from-yellow-500 dark:to-yellow-600 dark:border-yellow-600/50">
              <div className="flex flex-col gap-2">
                <Quantity quantity={quantity} onQuantityChange={setQuantity} />

                <div className="space-y-1">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white px-5 py-2 rounded-2xl hover:bg-gray-950 transition-all duration-300 font-bold text-base active:scale-95 group shadow-xl shadow-gray-900/30 dark:bg-black dark:hover:bg-gray-900"
                  >
                    <ShoppingCart className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
                    Add to Cart
                  </button>

                  <button className="w-full py-2 px-5 rounded-2xl border-2 border-gray-900 text-gray-900 font-bold text-base hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95 dark:border-yellow-600 dark:text-yellow-50 dark:hover:bg-gray-900 dark:hover:text-white">
                    Buy Now
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-gray-900/70 border-t border-gray-900/20 pt-1 dark:text-gray-700 dark:border-gray-900/50">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Secure Transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-2 bg-white rounded-3xl p-3 sm:p-5 border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800/50 dark:shadow-xl dark:shadow-gray-950/50">
          <div className="max-w-3xl mx-auto mb-3">
            <h2 className="text-lg font-bold text-gray-900 mb-1 dark:text-gray-50">
              Product Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm dark:text-gray-300">
              {product.description ||
                "No additional description available for this product."}
            </p>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b pb-1 dark:text-gray-50 dark:border-gray-800/50">
            Product Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0 text-xs sm:text-sm dark:text-gray-300">
            <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/30">
              <span className="text-gray-500 font-medium dark:text-gray-400">
                Category
              </span>
              <span className="text-gray-900 font-bold dark:text-gray-200">
                {product.category}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/30">
              <span className="text-gray-500 font-medium dark:text-gray-400">
                Warranty
              </span>
              <span className="text-gray-900 font-bold dark:text-gray-200">
                1 Year Local Warranty
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50 dark:border-gray-800/30">
              <span className="text-gray-500 font-medium dark:text-gray-400">
                Shipping
              </span>
              <span className="text-gray-900 font-bold dark:text-gray-200">
                Fulfilled by Egyzon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
