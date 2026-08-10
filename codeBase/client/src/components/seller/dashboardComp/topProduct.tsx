"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export type TopProductItem = {
  id: number
  name: string
  category?: string
  price: number
  sales: number
  revenue?: number
  image: string
}

export const initialProducts: TopProductItem[] = [
  {
    id: 1,
    name: "Aura Studio ANC Headphones",
    category: "Electronics / Audio",
    price: 3499,
    sales: 245,
    revenue: 857255,
    image: "/images/tech_essentials.png",
  },
  {
    id: 2,
    name: "Kyoto Pour-Over Set",
    category: "Home / Kitchen",
    price: 1850,
    sales: 182,
    revenue: 336700,
    image: "/images/curated_living.png",
  },
  {
    id: 3,
    name: "Heavyweight Essential Tee",
    category: "Fashion / Apparel",
    price: 799,
    sales: 156,
    revenue: 124644,
    image: "/images/curated_living.png",
  },
  {
    id: 4,
    name: "Lumina Smart Desk Lamp",
    category: "Electronics / Lighting",
    price: 2200,
    sales: 89,
    revenue: 195800,
    image: "/images/tech_essentials.png",
  },
]

type TopProductProps = {
  topProducts?: TopProductItem[]
  variant?: "compact" | "analytical"
}

export default function TopProduct({
  topProducts = initialProducts,
  variant = "compact",
}: TopProductProps) {
  if (variant === "analytical") {
    return (
      <div className="w-full rounded-2xl border border-slate-100/80 bg-[#f8fbff] p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
            Top Performing Products
          </h2>
          <Link
            href="/sellerDashboard/Inventory"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-all hover:underline dark:text-blue-400"
          >
            <span>View All Inventory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Dotted Border Table Header */}
        <div className="mt-5 mb-2 border-y border-dashed border-slate-200/80 py-3 dark:border-slate-700/60">
          <div className="grid grid-cols-12 gap-4 text-[11px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
            <div className="col-span-6 sm:col-span-5">PRODUCT</div>
            <div className="col-span-2 text-center">UNITS SOLD</div>
            <div className="col-span-2 text-right">AVG PRICE</div>
            <div className="col-span-2 sm:col-span-3 text-right">REVENUE</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100/60 dark:divide-slate-800/40">
          {topProducts.map((product) => {
            const calculatedRevenue =
              product.revenue ?? product.price * product.sales

            return (
              <div
                key={product.id}
                className="grid grid-cols-12 gap-4 items-center px-1 py-3 transition-colors hover:bg-slate-100/40 rounded-xl dark:hover:bg-slate-800/30"
              >
                {/* Product Name & Image */}
                <div className="col-span-6 flex items-center gap-3 sm:col-span-5 min-w-0">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="font-serif text-sm font-semibold text-slate-900 truncate dark:text-slate-100">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate dark:text-slate-400">
                      {product.category || "General"}
                    </p>
                  </div>
                </div>

                {/* Units Sold */}
                <div className="col-span-2 text-center text-sm font-bold text-slate-900 dark:text-slate-100">
                  {product.sales}
                </div>

                {/* Avg Price */}
                <div className="col-span-2 text-right text-sm font-medium text-slate-600 dark:text-slate-400">
                  {product.price.toLocaleString()} EGP
                </div>

                {/* Revenue */}
                <div className="col-span-2 text-right text-sm font-extrabold text-slate-900 sm:col-span-3 dark:text-slate-100">
                  {calculatedRevenue.toLocaleString()} EGP
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Compact variant for Dashboard Page 1
  return (
    <div className="w-full h-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <h2 className="text-2xl font-medium text-black dark:text-white font-stretch-normal">
        Top products
      </h2>
      <div>
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
          >
            <Image
              width={150}
              height={150}
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.sales} sales <span>{product.price} EGP</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/sellerDashboard/Inventory"
          className="text-xl font-medium text-blue-500 hover:underline"
        >
          See All
        </Link>
      </div>
    </div>
  )
}
