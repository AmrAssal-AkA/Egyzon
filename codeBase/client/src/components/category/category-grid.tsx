import React from 'react'
import CategoryCard from './category-card'

export interface Category {
  slug: string;
  url: string;
  name: string;
  description: string;
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-150">
       {categories.map((category) => (
        <CategoryCard
            key={category.slug}
          image={category.url}
          name={category.name}
          description={category.description}
        />
      ))}
    </div>
  )
}
