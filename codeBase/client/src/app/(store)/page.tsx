import { HeroCarousel } from "@/components/home/hero";
import { FaRegEnvelope } from "react-icons/fa";
import ProductGrid from "@/components/products/Product-grid";
import CategoryGrid from "@/components/category/category-grid";
import { fetchCategories } from "@/services/product";
import { fetchProducts } from "@/services/product";
import NewsLetterForm from "@/components/home/newsletter/newsletterform";

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
    siteName: "Egyzon",
    images: [
      {
        image: "../favicon.ico",
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
  const [productsResponse, categories] = await Promise.all([
    fetchProducts(1, 4),
    fetchCategories(),
  ]);
  const products = productsResponse?.data?.products || [];
  const categoriesList = Array.isArray(categories) ? categories : [];
  const limitedCategories = categoriesList.slice(0, 4);

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
      <h1 className="sr-only">Egyzon - Egypt&apos;s Multi-Vendor Marketplace for Handcrafted & Modern Goods</h1>

      <div className="w-full max-w-10xl">
        <HeroCarousel />
      </div>
      {/* Featured Products Section */}
      <section className="w-full max-w-10xl px-4 md:px-20 mt-10" aria-labelledby="featured-products-heading">
        <h2 id="featured-products-heading" className="text-3xl font-bold mt-10 mb-5">Featured Products</h2>
        <p className="text-muted-foreground mb-10">
          Discover our latest and greatest products, carefully selected just for
          you.
        </p>
        {products.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="w-full">
            <ProductGrid products={products} />
          </div>
        )}
      </section>
      {/* Categories Section */}
      <section className="w-full max-w-10xl px-4 md:px-20 mt-10" aria-labelledby="top-categories-heading">
        <h2 id="top-categories-heading" className="text-3xl font-bold mt-10 mb-5">Our Top Categories</h2>
        <p className="text-muted-foreground mb-10">
          Explore our diverse range of categories and find the perfect products
          to suit your needs.
        </p>
        {limitedCategories.length === 0 ? (
          <p className="text-muted-foreground">No categories found.</p>
        ) : (
          <CategoryGrid categories={limitedCategories} />
        )}
      </section>
      {/* Trending Products Section */}
      <section className="w-full max-w-10xl px-4 md:px-20 mt-10" aria-labelledby="trending-products-heading">
        <h2 id="trending-products-heading" className="text-3xl font-bold mt-10 mb-5">Trending Products</h2>
        <p className="text-muted-foreground mb-10">
          Check out the latest products that are trending in the market.
        </p>
        {products.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="w-full">
            <ProductGrid products={products} />
          </div>
        )}
      </section>
      {/* Newsletter Section */}
      <section
        aria-labelledby="newsletter-heading"
        className="w-full max-w-10xl px-4 md:px-20 mt-10 bg-linear-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-12 rounded-2xl flex flex-col items-center justify-center shadow-md dark:from-blue-900 dark:via-indigo-950 dark:to-slate-900"
      >
        <FaRegEnvelope className="text-4xl text-blue-200 mb-2" aria-hidden="true" />
        <h2 id="newsletter-heading" className="text-2xl sm:text-3xl font-bold mt-2 mb-2 text-white">Join the Inner Circle</h2>
        <p className="mb-6 text-center max-w-xl text-blue-100 text-sm sm:text-base leading-relaxed">
          Sign up for our newsletter and be the first to know about exclusive
          offers, new arrivals, and insider tips. Stay connected and never miss
          out on the latest trends!
        </p>
        <NewsLetterForm />
      </section>
    </main>
  );
}
