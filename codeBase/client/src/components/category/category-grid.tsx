import React from "react";
import Link from "next/link";
import CategoryCard from "./category-card";
import { Category } from "@/types/category.type";

export type { Category };

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {categories.map((category, idx) => {
        const catId = category._id || category.id || String(idx);
        const catName = category.categoryName || category.name || "Category";
        const catImg = category.imageUrl || "/images/tech_essentials.png";
        const catDesc = category.description || "";
        const productCount = Array.isArray(category.Products) ? category.Products.length : undefined;
        const targetHref = `/categories/${catId}`;

        return (
          <Link
            key={catId}
            href={targetHref}
            className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
          >
            <CategoryCard
              image={catImg}
              name={catName}
              description={catDesc}
              productCount={productCount}
            />
          </Link>
        );
      })}
    </div>
  );
}
