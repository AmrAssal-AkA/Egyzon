import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { sellerService } from "@/services/sellerService";
import { fetchProducts } from "@/services/product";
import { mapBackendStoreToStorefront } from "@/types/storefront";
import StorefrontClient from "@/components/storefront/StorefrontClient";
import type { BackendStoreDetails } from "@/types/store";

interface StorePageProps {
  params: Promise<{ Id?: string; id?: string }>;
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawId = resolvedParams?.Id || resolvedParams?.id;

  if (
    !rawId ||
    rawId === "undefined" ||
    rawId === "null" ||
    rawId.trim() === ""
  ) {
    return {
      title: "Store - Egyzon Marketplace",
      description: "Official Storefront on Egyzon",
    };
  }

  const res = await sellerService.getStoreDetails(rawId);
  const rawStore: BackendStoreDetails | null = Array.isArray(res.data)
    ? res.data[0] || null
    : res.data || null;

  if (!rawStore) {
    return {
      title: "Store - Egyzon Marketplace",
      description: "Official Storefront on Egyzon",
    };
  }

  const storeName = rawStore.storeName || "Egyzon Store";
  const description =
    rawStore.storeManagement?.storeDescription ||
    `${storeName} - Official Storefront on Egyzon`;
  const banner =
    rawStore.storeManagement?.storeBanner ||
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80";

  return {
    title: `${storeName} - Egyzon Official Storefront`,
    description,
    openGraph: {
      title: `${storeName} | Egyzon Marketplace`,
      description,
      images: [{ url: banner }],
    },
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.Id || resolvedParams?.id;

  if (
    !rawId ||
    rawId === "undefined" ||
    rawId === "null" ||
    rawId.trim() === ""
  ) {
    notFound();
  }


  const [storeRes, productsRes] = await Promise.all([
    sellerService.getStoreDetails(rawId),
    fetchProducts(1, 100),
  ]);

  const rawStore: BackendStoreDetails | null = Array.isArray(storeRes.data)
    ? storeRes.data[0] || null
    : storeRes.data || null;

  if (!rawStore && !storeRes.success) {
    notFound();
  }

  // Filter products belonging to this seller
  const allProducts = productsRes.data?.products || [];
  const sellerProducts = allProducts.filter((p) => {
    const pSellerId =
      typeof p.sellerId === "string"
        ? p.sellerId
        : (p as any).seller?._id ||
          (p as any).seller?.id ||
          (p as any).seller;
    return pSellerId === rawId || pSellerId === rawStore?._id;
  });

  const store = mapBackendStoreToStorefront(
    rawStore || {
      _id: rawId,
      storeName: "Egyzon Store",
      storeManagement: {},
    },
    sellerProducts
  );

  return <StorefrontClient store={store} />;
}