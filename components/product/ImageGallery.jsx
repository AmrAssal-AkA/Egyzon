"use client";
import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };
  return (
    <div className="grid lg:grid-cols-2 gap-12 dark:shadow-gray-700">
      <div className="space-y-4 dark:shadow-gray-700  ">
        <div className="relative group ">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ">
            <img
              src={product.image[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <Heart
            className={`w-6 h-6 transition-colors ${
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-3">
        {product.image.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
              selectedImage === index
                ? "ring-2 ring-yellow-500 scale-105"
                : "hover:scale-105 opacity-70 hover:opacity-100"
            }`}
          >
            <img src={image} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
