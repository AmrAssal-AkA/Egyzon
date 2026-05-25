import React from 'react'

import ProductGrid from '@/components/product/ProductGrid';
import { ProductsData } from '@/lib/Products';
function CategoryPage({params}) {
    const { slug } = params;

    const filteredProducts = ProductsData.filter(product => product.category === slug);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 p-4 mt-30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-300 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
          Category: {slug}
        </h1>

        <ProductGrid products={filteredProducts}/>
      </div>
    </main>
  )
}

export default CategoryPage