import ShopProductsClient, {
  type ShopProduct,
} from "@/components/products/filters/ShopProductsClient";

import {fetchProducts} from "@/services/product"



async function ProductsPage() {
  const fetchpProducts = await fetchProducts();

  const products: ShopProduct[] = fetchpProducts.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    thumbnail: product.thumbnail,
    category: product.category,
    rating: product.rating,
    brand: product.brand,
    inStock: product.stock > 0,
    stock: product.stock,
  }));
  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
      <div className="w-full max-w-10xl px-4 md:px-20 mt-30">
        <h1 className="text-6xl font-bold text-foreground mb-6 ">
          Browse Products
        </h1>
        <ShopProductsClient products={products} />
      </div>
    </main>
  );
}

export default ProductsPage;
