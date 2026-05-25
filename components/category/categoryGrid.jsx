import Link from "next/link";
import React from "react";

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto mt-5 shadow-lg dark:shadow-gray-700">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full"
        >
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full  dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center flex-grow flex flex-col justify-start dark:text-white">
              <h2 className="text-2xl font-semibold mb-2 ">{category.name}</h2>
              <p className="light:text-gray-600 mb-4 dark:text-gray-200">{category.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
