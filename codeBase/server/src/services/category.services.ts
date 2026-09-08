import Category from "../models/categoryModel";
import Seller from "../models/sellerModel";
import Product from "../models/productModel";
import { ICategory } from "../types/product.types";
import { AppError } from "../utils/AppError";
import { initializeRedisClient } from "../config/client";

const Soft_TTL_Safely = 60 * 10; // 10 minutes
const Hard_TTL_Safely = 60 * 60 * 24 * 30;
const Refresh_Lock_TTL = 30; // 30 seconds

let ClientPromise: ReturnType<typeof initializeRedisClient> | null = null;
const getClient = async () => {
  if (!ClientPromise) {
    ClientPromise = initializeRedisClient();
  }
  return await ClientPromise;
};

export const CategoryService = {
  createCategory: async (categoryData: ICategory) => {
    try {
      const existingCategory = await Category.findOne({
        categoryName: categoryData.categoryName,
      });
      if (existingCategory) {
        throw new AppError(400, "Category with this name already exists");
      }
      const category = new Category(categoryData);
      await category.save();
      return category;
    } catch (error) {
      console.error("Error creating category:", error);
      if (error instanceof AppError) {
        throw new AppError(500, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  getAllCategories: async () => {
    const client = await getClient();
    const cacheKey = "categories:all";
    const lockKey = `lock:${cacheKey}`;
    try {
      if (client) {
        const cachedCategories = await client.get(cacheKey);
        if (cachedCategories) {
          const { data, fetchedAt } = JSON.parse(cachedCategories);
          const isStale = Date.now() - fetchedAt > Soft_TTL_Safely * 1000;

          if (isStale) {
            client
              .set(lockKey, "locked", { EX: Refresh_Lock_TTL, NX: true })
              .then((lockAcquired) => {
                if (lockAcquired) {
                  return refreshCache(client, cacheKey, lockKey);
                }
              })
              .catch((err) => {
                console.error("Error acquiring lock:", err);
              });
          }
          return data;
        }
        const fetched = await Category.find().populate("Products");
        if (client) {
          await client.set(
            cacheKey,
            JSON.stringify({ data: fetched, fetchedAt: Date.now() }),
            { EX: Hard_TTL_Safely },
          );
        }
        return fetched;
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(500, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
    async function refreshCache(
      client: any,
      cacheKey: string,
      lockKey: string,
    ) {
      try {
        const freshCategories = await Category.find().populate("Products");
        await client.set(
          cacheKey,
          JSON.stringify({ data: freshCategories, fetchedAt: Date.now() }),
          { EX: Hard_TTL_Safely },
        );
      } finally {
        await client.del(lockKey).catch(() => {});
      }
    }
  },
  addProductToCategory: async (categoryId: string, productId: string) => {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new AppError(404, "Category not found");
      }
      const product = await Product.findById(productId);
      if (!product) {
        throw new AppError(404, "Product not found");
      }
      category.Products.push(product._id);
      await category.save();
      return category;
    } catch (error) {
      console.error("Error adding product to category:", error);
      if (error instanceof AppError) {
        throw new AppError(500, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  getProductsByCategory: async (categoryId: string) => {
    try {
      const category = await Category.findById(categoryId).populate("Products");
      if (!category) throw new AppError(404, "Category not found");
      return category.Products;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(500, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
};
