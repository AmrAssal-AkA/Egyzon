"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"
import { useTopProducts } from "@/hooks/useSeller"
import { TopSellingProductItem } from "@/types/seller"

export type TopProductItem = {
  id: string | number
  name: string
  category?: string
  price: number
  sales: number
  revenue?: number
  image: string
}


type TopProductProps = {
  topProducts?: (TopProductItem | TopSellingProductItem)[]
  variant?: "compact" | "analytical"
}

function normalizeTopProduct(
  item: TopProductItem | TopSellingProductItem,
  index: number
): TopProductItem {
  const rawItem = item as TopSellingProductItem
  const productObj =
    typeof rawItem.productId === "object" && rawItem.productId !== null
      ? rawItem.productId
      : null

  const id =
    (item as TopProductItem).id ??
    rawItem._id ??
    productObj?._id ??
    productObj?.id ??
    (typeof rawItem.productId === "string" ? rawItem.productId : index + 1)

  const name =
    (item as TopProductItem).name ||
    productObj?.productName ||
    productObj?.name ||
    rawItem.productName ||
    rawItem.name ||
    `Product ${index + 1}`

  const rawCat =
    (item as TopProductItem).category ||
    productObj?.category ||
    rawItem.category;

  const category =
    typeof rawCat === "object" && rawCat !== null
      ? (rawCat as any).categoryName || (rawCat as any).name || "General"
      : typeof rawCat === "string" && rawCat.trim() !== ""
        ? rawCat
        : "General";

  const price =
    (item as TopProductItem).price ??
    productObj?.price ??
    rawItem.price ??
    (rawItem.revenue && rawItem.sales
      ? Math.round(rawItem.revenue / rawItem.sales)
      : rawItem.revenue ?? 0)

  const sales =
    (item as TopProductItem).sales ??
    rawItem.sales ??
    rawItem.unitsSold ??
    rawItem.totalSales ??
    rawItem.count ??
    (price > 0 && (rawItem.revenue ?? 0) > 0
      ? Math.round((rawItem.revenue ?? 0) / price)
      : 1)

  const revenue =
    (item as TopProductItem).revenue ??
    rawItem.revenue ??
    price * sales

  const rawImage =
    (item as TopProductItem).image ||
    productObj?.imageUrl ||
    productObj?.image ||
    rawItem.imageUrl ||
    rawItem.image

  let image = "/images/tech_essentials.png"
  if (
    Array.isArray(rawImage) &&
    rawImage.length > 0 &&
    typeof rawImage[0] === "string" &&
    rawImage[0].trim() !== ""
  ) {
    image = rawImage[0]
  } else if (typeof rawImage === "string" && rawImage.trim() !== "") {
    image = rawImage
  }

  return {
    id,
    name,
    category,
    price,
    sales,
    revenue,
    image,
  }
}

export default function TopProduct({
  topProducts: propTopProducts,
  variant = "compact",
}: TopProductProps) {
  const { topProducts: apiTopProducts, isLoading } = useTopProducts()

  const rawProducts = propTopProducts !== undefined ? propTopProducts : apiTopProducts
  const products: TopProductItem[] = (
    rawProducts && rawProducts.length > 0
      ? rawProducts.map(normalizeTopProduct)
      : []
  )

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
        {isLoading && propTopProducts === undefined ? (
          <div className="divide-y divide-slate-100/60 dark:divide-slate-800/40">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 items-center px-1 py-3 animate-pulse"
              >
                <div className="col-span-6 flex items-center gap-3 sm:col-span-5">
                  <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="col-span-2 flex justify-center">
                  <div className="h-4 w-8 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="col-span-2 flex justify-end">
                  <div className="h-4 w-14 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="col-span-2 sm:col-span-3 flex justify-end">
                  <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
            <Package className="h-10 w-10 stroke-1 text-slate-400 mb-2" />
            <p className="text-sm font-medium">No top performing products found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100/60 dark:divide-slate-800/40">
            {products.map((product) => {
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
        )}
      </div>
    )
  }

  // Compact variant for Dashboard Home
  return (
    <div className="w-full h-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <h2 className="text-2xl font-medium text-black dark:text-white font-stretch-normal">
        Top products
      </h2>
      {isLoading && propTopProducts === undefined ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-2 animate-pulse">
              <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-800 shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <Package className="h-8 w-8 stroke-1 text-gray-400 mb-2" />
          <p className="text-sm">No top products found</p>
        </div>
      ) : (
        <div>
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  fill
                  src={product.image}
                  alt={product.name}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {product.sales} sales <span>{product.price.toLocaleString()} EGP</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
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

