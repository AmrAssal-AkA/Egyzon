import Product from "../models/productModel";
import { IProduct } from "../types/product.types";
import { AppError } from "../utils/AppError";
import { productCacheKey } from "../utils/keys";
import { initializeRedisClient } from "../config/client";

const Soft_TTL_Safely = 60 * 10; // 10 minutes
const Hard_TTL_Safely = 60 * 60 * 24 * 30; // 30 days
const Refresh_Lock_TTL = 30; // 30 seconds

let ClientPromise: ReturnType<typeof initializeRedisClient> | null = null;
const getClient = async () => {
  if (!ClientPromise) {
    ClientPromise = initializeRedisClient();
  }
  return await ClientPromise;
};

// Service function to create a new product by a seller
export const ProductServices = {
  createProduct: async (sellerId: string, productData: any) => {
    try {
      const newProduct = await Product.create({
        ...productData,
        SellerId: sellerId,
      });
      const existingProduct = await Product.findOne({
        productId: newProduct.productId,
        SellerId: sellerId,
      });
      if (existingProduct) {
        throw new AppError(400, "Product already exists");
      }
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new AppError(500, "Failed to create product");
    }
  },
  // Service function to apply a discount to a product by a seller
  ApplyDiscount: async (
    SellerId: string,
    productId: string,
    discount: number,
  ) => {
    const product = await Product.findOne({ productId, SellerId: SellerId });
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    product.price = product.price - product.price * discount;
    return await product.save();
  },
  // Service function to update a product by a seller
  UpdateProduct: async (
    SellerId: string,
    productId: string,
    productData: any,
  ) => {
    const product = await Product.findOne({ productId, SellerId: SellerId });
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    Object.assign(product, productData);
    return await product.save();
  },
  // Service function to get all products with pagination
  getAllProducts: async (page: number, limit: number) => {
    const Client = await getClient();
    const cacheKey = `products:page:${page}:limit:${limit}`;
    const lockKey = `lock:${cacheKey}`;

    try {
      const FreshProduct = async () => {
        const [products, total] = await Promise.all([
          Product.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
          Product.countDocuments(),
        ]);
        return { products, total };
      };
      const writeCache = async (data: any) => {
        const payload = JSON.stringify({ data, cachedAt: Date.now() });
        try {
          await Client.set(cacheKey, payload, { EX: Hard_TTL_Safely });
        } catch (error) {
          console.log("Error writing products to cache:", error);
        }
      };
      try {
        const cached = await Client.get(cacheKey);
        if (cached) {
          const { data, cachedAt } = JSON.parse(cached);
          const age = (Date.now() - cachedAt) / 1000;
          if (age < Soft_TTL_Safely) {
            return data;
          }
          const acquired = await Client.set(lockKey, "locked", {
            NX: true,
            EX: Refresh_Lock_TTL,
          });
          if (acquired) {
            FreshProduct()
              .then(writeCache)
              .catch((error) => {
                console.log("Error refreshing products cache:", error);
              })
              .finally(() => {
                Client.del(lockKey).catch(() => {});
              });
          }
          return data;
        }
      } catch (error) {
        console.log("Error fetching products from cache:", error);
      }
      const acquired = await Client.set(lockKey, "locked", {
        NX: true,
        EX: Refresh_Lock_TTL,
      });
      if (!acquired) {
        await new Promise((r) => setTimeout(r, 100));
        const retryCache = await Client.get(cacheKey);
        if (retryCache) return JSON.parse(retryCache).data;
      }
      try {
        const result = await FreshProduct();
        await writeCache(result);
        return result;
      } catch (error) {
        console.log("Error fetching products:", error);
        throw new AppError(500, "Failed to fetch products");
      } finally {
        if (acquired) Client.del(lockKey).catch(() => {});
      }
    } catch (error) {
      console.log("fetching product", error);
      throw new AppError(500, "Invalid internal error");
    }
  },
  getProductById: async (productId: string) => {
    try {
      const product = await Product.findOne({ productId });
      if (!product) {
        throw new AppError(404, "Product not found");
      }

      return product;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw new AppError(500, "Failed To get the product");
    }
  },
};
