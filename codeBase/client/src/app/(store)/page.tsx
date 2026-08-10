import { HeroCarousel } from "@/components/home/hero";
import { FaRegEnvelope } from "react-icons/fa";
import ProductGrid from "@/components/products/Product-grid";
import CategoryGrid from "@/components/category/category-grid";
import { fetchCategories } from "@/services/product";
import { fetchProducts } from "@/services/product";

export const metadata = {
  title: "egyzon - Your One-Stop Destination for Products",
  description:
    "Welcome to Egyzon, your one-stop destination for a wide range of products. Explore our featured products, top categories, and trending items. Join our newsletter to stay updated with the latest offers and arrivals.",
  keywords:
    "Egyzon, online shopping, featured products, top categories, trending items, newsletter, exclusive offers, new arrivals",
  openGraph: {
    title: "egyzon - Your One-Stop Destination for Products",
    description:
      "Welcome to Egyzon, your one-stop destination for a wide range of products. Explore our featured products, top categories, and trending items. Join our newsletter to stay updated with the latest offers and arrivals.",
    url: "https://www.egyzon.com/",
    siteName: "Egyzon",
    images: [
      {
        url: "https://www.egyzon.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Egyzon - Your One-Stop Destination for Products",
      },
    ],
    locale: "en_EG",
    type: "website",
  },
};

export default async function Home() {
  // Fetch products and categories from the server
  const productsResponse = await fetchProducts(1, 3);
  const products = productsResponse.data.products;
  const categories = await fetchCategories();

  const limitedCategories = categories.slice(0, 4);

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
      <div className="w-full max-w-10xl">
        <HeroCarousel />
      </div>
      {/* Featured Products Section */}
      <div className="w-full max-w-10xl px-4 md:px-20">
        <h2 className="text-3xl font-bold  mt-10 mb-5">Featured Products</h2>
        <p className="text-muted-foreground mb-10">
          Discover our latest and greatest products, carefully selected just for
          you.
        </p>
        {products.length === 0 ? (
          <p className="text-muted-foreground text-center dark:text-gray-200">
            No products found.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
      {/* Categories Section */}
      <div className="w-full max-w-10xl px-4 md:px-20 mt-10">
        <h2 className="text-3xl font-bold  mt-10 mb-5">Our Top Categories</h2>
        <p className="text-muted-foreground mb-10">
          Explore our diverse range of categories and find the perfect products
          to suit your needs.
        </p>
        {limitedCategories.length === 0 ? (
          <p className="text-muted-foreground">No categories found.</p>
        ) : (
          <CategoryGrid categories={limitedCategories} />
        )}
      </div>
      {/* Trending Products Section */}
      <div className="w-full max-w-10xl px-4 md:px-20 mt-10">
        <h2 className="text-3xl font-bold  mt-10 mb-5">Trending Products</h2>
        <p className="text-muted-foreground mb-10">
          Check out the latest products that are trending in the market.
        </p>
        {products.length === 0 ? (
          <p className="text-muted-foreground text-center dark:text-gray-200">
            No products found.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
      {/* Newsletter Section */}
      <div className="w-full max-w-10xl px-4 md:px-20 mt-10 bg-blue-300 text-blue-950 py-10 rounded-lg flex flex-col items-center justify-center dark:bg-blue-950 dark:text-blue-50">
        <FaRegEnvelope className="text-4xl text-blue-600 dark:text-blue-300" />
        <h2 className="text-3xl font-bold  mt-4 mb-2">Join the Inner Circle</h2>
        <p className=" mb-6 text-center">
          Sign up for our newsletter and be the first to know about exclusive
          offers, new arrivals, and insider tips. Stay connected and never miss
          out on the latest trends!
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-300 ease-in-out"
          >
            Subscribe
          </button>
        </form>
      </div>
    </main>
  );
}
