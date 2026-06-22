import React from "react";

import CategoryGrid from "@/components/category/categoryGrid";
import { categories } from "@/lib/Products";

function Categories() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 mt-30">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-600 to-yellow-700 dark:from-yellow-200 dark:via-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent mb-4">
            Categories
          </h1>
          <p className="text-gray-600 text-lg font-medium dark:text-gray-300">
            Explore our wide range of products
          </p>
        </div>

        {/* Grid Section */}
        <CategoryGrid categories={categories} />
      </div>
    </div>
  );
}

export default Categories;
