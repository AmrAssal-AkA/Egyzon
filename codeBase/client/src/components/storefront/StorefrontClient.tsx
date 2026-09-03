"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import {
  StorefrontDetails,
  StorefrontTab,
  StoreCategoryItem,
} from "@/types/storefront";
import StoreHero from "./StoreHero";
import StoreNav from "./StoreNav";
import StoreProductsSection from "./StoreProductsSection";
import StoreCategoriesGrid from "./StoreCategoriesGrid";
import StoreAboutSection from "./StoreAboutSection";
import StoreProductCard from "./StoreProductCard";

interface StorefrontClientProps {
  store: StorefrontDetails;
}

export default function StorefrontClient({ store }: StorefrontClientProps) {
  const [activeTab, setActiveTab] = useState<StorefrontTab>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Derive unique categories dynamically from the seller's actual product catalog
  const derivedCategories = useMemo<StoreCategoryItem[]>(() => {
    const map = new Map<string, { count: number; image?: string }>();

    store.products.forEach((product) => {
      let catName = "";
      if (typeof product.category === "object" && product.category !== null) {
        catName =
          (product.category as any).name ||
          (product.category as any).categoryName ||
          "";
      } else if (typeof product.category === "string") {
        catName = product.category;
      }

      if (!catName) {
        catName = product.brand || "General";
      }

      const img = Array.isArray(product.imageUrl)
        ? product.imageUrl[0]
        : product.imageUrl ||
          (product as any).image ||
          (product as any).thumbnail;

      const existing = map.get(catName);
      if (existing) {
        existing.count += 1;
        if (!existing.image && img) existing.image = img;
      } else {
        map.set(catName, { count: 1, image: img });
      }
    });

    return Array.from(map.entries()).map(([name, data], idx) => ({
      id: `cat-${idx}-${name.toLowerCase().replace(/\s+/g, "-")}`,
      name,
      productCount: data.count,
      image: data.image,
    }));
  }, [store.products]);

  // Featured products
  const featuredProducts = useMemo(() => {
    if (store.featuredProductIds && store.featuredProductIds.length > 0) {
      const explicit = store.products.filter((p) => {
        const pid = String(
          (p as any)._id || (p as any).id || (p as any).productId,
        );
        return store.featuredProductIds?.includes(pid);
      });
      if (explicit.length > 0) return explicit;
    }
    // Fallback: top discounted or top 4 products
    return [...store.products]
      .sort((a, b) => (Number(b.discount) || 0) - (Number(a.discount) || 0))
      .slice(0, 4);
  }, [store.products, store.featuredProductIds]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab("products");
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleScrollToLocation = () => {
    setActiveTab("about");
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handleContactClick = () => {
    setActiveTab("about");
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Store Header Hero */}
      <StoreHero
        store={store}
        onViewLocation={handleScrollToLocation}
        onContactClick={handleContactClick}
      />

      {/* Navigation Tab Bar */}
      <StoreNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        productCount={store.products.length}
        categoryCount={derivedCategories.length}
      />

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* TAB 1: HOME (Highlights, Featured Products, Categories, Story Snippet) */}
        {activeTab === "home" && (
          <div className="space-y-10">
            {/* Featured Deals Carousel / Section */}
            {featuredProducts.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                        Featured From This Store
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Handpicked popular items & top deals
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setActiveTab("products");
                    }}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                  {featuredProducts.map((prod) => (
                    <StoreProductCard
                      key={prod._id || prod.id || (prod as any).productId}
                      product={prod}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Visual Store Category Cards */}
            {derivedCategories.length > 0 && (
              <section>
                <StoreCategoriesGrid
                  categories={derivedCategories}
                  onSelectCategory={handleCategoryClick}
                />
              </section>
            )}

            {/* Quick About Teaser & Guarantees */}
            <section className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Verified Egyptian Vendor
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {store.name} Guarantee
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {store.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("about")}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline pt-1 cursor-pointer"
                  >
                    <span>Read full story & seller policies</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Trust mini-strip */}
                <div className="space-y-2.5 bg-muted/40 p-4 rounded-2xl border border-border/40 text-xs text-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Protected by Egyzon Buyer Escrow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Fast shipping with live order tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>14-day hassle-free replacement</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: PRODUCTS (Full Catalog Discovery) */}
        {activeTab === "products" && (
          <StoreProductsSection
            products={store.products}
            categories={derivedCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {/* TAB 3: CATEGORIES (Visual Collections) */}
        {activeTab === "categories" && (
          <div className="space-y-8">
            <StoreCategoriesGrid
              categories={derivedCategories}
              onSelectCategory={handleCategoryClick}
            />
          </div>
        )}

        {/* TAB 4: ABOUT STORE */}
        {activeTab === "about" && <StoreAboutSection store={store} />}
      </main>
    </div>
  );
}
