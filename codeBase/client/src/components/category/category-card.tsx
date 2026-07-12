import React from "react";

export default function CategoryCard({
  image,
  name,
  description,
}: {
  image: string;
  name: string;
  description: string;
}) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg h-full">
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"/>

        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
