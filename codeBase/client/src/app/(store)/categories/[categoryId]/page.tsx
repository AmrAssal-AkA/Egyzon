import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import CategoryProductsClient from "@/components/category/category-products-client";
import { fetchCategories, fetchProductsByCategoryId } from "@/services/categoryService";

interface CategoryDetailPageProps {
  params: Promise<{ categoryId: string }>;
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { categoryId } = await params;
  const categories = await fetchCategories();
  const currentCategory = categories.find(
    (c) =>
      c._id === categoryId ||
      c.id === categoryId ||
      c.categoryName?.toLowerCase() === decodeURIComponent(categoryId).toLowerCase()
  );

  const title = currentCategory?.categoryName || currentCategory?.name || "Category Products";
  const description =
    currentCategory?.description ||
    `Browse products in ${title} on Egyzon. Shop the best deals and latest arrivals.`;

  return {
    title: `Egyzon - ${title}`,
    description,
    openGraph: {
      title: `Egyzon - ${title}`,
      description,
      type: "website",
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { categoryId } = await params;
  const decodedCategoryId = decodeURIComponent(categoryId);

  const [products, categories] = await Promise.all([
    fetchProductsByCategoryId(decodedCategoryId),
    fetchCategories(),
  ]);

  const currentCategory = categories.find(
    (c) =>
      c._id === decodedCategoryId ||
      c.id === decodedCategoryId ||
      c.categoryName?.toLowerCase() === decodedCategoryId.toLowerCase()
  );

  const categoryName = currentCategory?.categoryName || currentCategory?.name || decodedCategoryId;
  const categoryDescription =
    currentCategory?.description ||
    `Explore all available products in the ${categoryName} category.`;

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
      <div className="w-full max-w-10xl px-4 md:px-20 mt-30">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-foreground transition-colors">
            Categories
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {categoryName}
          </span>
        </nav>

        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {categoryName}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mt-2">
              {categoryDescription}
            </p>
          </div>
        </section>

        {/* Category Products Client Component */}
        <CategoryProductsClient
         key={decodedCategoryId}
          categoryId={decodedCategoryId}
          initialProducts={products}
          categoryName={categoryName}
        />
      </div>
    </main>
  );
}