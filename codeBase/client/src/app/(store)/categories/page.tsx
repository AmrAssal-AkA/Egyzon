import { Metadata } from "next";
import React from "react";
import CategoriesClient from "@/components/category/categories-client";
import { fetchCategories } from "@/services/categoryService";

export const metadata: Metadata = {
  title: "Egyzon - Browse Categories",
  description:
    "Explore our diverse collection of product categories. Find electronics, fashion, home essentials, and more on Egyzon.",
  openGraph: {
    title: "Egyzon - Browse Categories",
    description:
      "Explore our diverse collection of product categories. Find electronics, fashion, home essentials, and more on Egyzon.",
    type: "website",
  },
};

export default async function CategoriesPage() {
  const initialCategories = await fetchCategories();

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
      <div className="w-full max-w-10xl px-4 md:px-20 mt-30">
        <section className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 tracking-tight">
            Browse Categories
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Explore our curated product categories and find everything from the latest technology to everyday essentials.
          </p>
        </section>
        <section className="mb-8">
        <CategoriesClient initialCategories={initialCategories} />
        </section>
      </div>
    </main>
  );
}