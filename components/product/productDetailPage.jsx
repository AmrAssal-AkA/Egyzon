"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Quantity from "@/components/product/quantityselector";
import useHandleAddToCart from "@/Hooks/useHandleAddToCart";
import ImageGallery from "@/components/product/ImageGallery";

export default function productDetailPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useHandleAddToCart();

  const productWithImages = {
    ...product,
    image: Array.isArray(product.image) ? product.image : [product.image],
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="mx-auto px-2 sm:px-3 lg:px-4">
        <div className="lg:grid lg:grid-cols-12 lg:items-start gap-2 xl:gap-3">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-3 sm:p-6 border border-gray-100 shadow-sm">
              <ImageGallery product={productWithImages} />
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Actions */}
          <div className="lg:col-span-5 flex flex-col gap-2 lg:sticky lg:top-32">
            {/* Main Info Section */}
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-gray-100 shadow-sm space-y-2">
              <div className="space-y-2">
                {product.category && (
                  <span className="inline-block px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="flex flex-col gap-0">
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-black text-yellow-600">
                    {Number(product.price).toFixed(2)}
                    <span className="text-lg ml-1">EGP</span>
                  </p>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through decoration-red-500/50 font-medium">
                      {Number(product.oldPrice).toFixed(2)} EGP
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 font-medium italic">
                  Including all taxes and shipping fees
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Stock Status
                </h3>
                <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 w-fit px-4 py-2 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  In Stock
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Quick Overview
                </h3>
                {product.description && (
                  <p className="text-base text-gray-600 leading-relaxed line-clamp-4">
                    {product.description}
                  </p>
                )}
              </div>
            </div>

            {/* Purchase Card */}
            <div className="bg-yellow-400 rounded-3xl p-3 sm:p-4 border border-yellow-500/20 shadow-xl shadow-yellow-400/10">
              <div className="flex flex-col gap-2">
                <Quantity quantity={quantity} onQuantityChange={setQuantity} />

                <div className="space-y-1">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white px-5 py-2 rounded-2xl hover:bg-black transition-all duration-300 font-bold text-base active:scale-95 group shadow-xl shadow-gray-900/20"
                  >
                    <ShoppingCart className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" />
                    Add to Cart
                  </button>

                  <button className="w-full py-2 px-5 rounded-2xl border-2 border-gray-900 text-gray-900 font-bold text-base hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95">
                    Buy Now
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-gray-900/70 border-t border-gray-900/10 pt-1">
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
        <div className="mt-2 bg-white rounded-3xl p-3 sm:p-5 border border-gray-100 shadow-sm">
          <div className="max-w-3xl mx-auto mb-3">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Product Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {product.description ||
                "No additional description available for this product."}
            </p>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b pb-1">
            Product Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0 text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Category</span>
              <span className="text-gray-900 font-bold">
                {product.category}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Warranty</span>
              <span className="text-gray-900 font-bold">
                1 Year Local Warranty
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-50">
              <span className="text-gray-500 font-medium">Shipping</span>
              <span className="text-gray-900 font-bold">
                Fulfilled by Egyzon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
