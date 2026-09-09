import Product from "../models/productModel";
import { AppError } from "../utils/AppError";
import Category from "../models/categoryModel";
import Seller from "../models/sellerModel";
import mongoose from "mongoose";
import { initializeRedisClient } from "../config/client";
import logger from "../utils/logger";

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
      const category = await Category.findOne({
        categoryName: productData.category,
      });
      if (!category) {
        throw new AppError(404, "Category not found");
      }
      const existingProduct = await Product.findOne({
        name: productData.productName,
        sellerId,
      });
      if (existingProduct) {
        throw new AppError(400, "Product already exists");
      }
      const newProduct = await Product.create({
        ...productData,
        category: category._id,
        sellerId: sellerId,
      });
      await Seller.findByIdAndUpdate(sellerId, 
        {$push: { products: newProduct._id }}, 
      { new: true });
      return newProduct;
    } catch (error) {
      logger.error("Error creating product:", error);
      throw new AppError(500, "Failed to create product");
    }
  },
  // Service function to apply a discount to a product by a seller
  ApplyDiscount: async (
    sellerId: string,
    productId: string,
    discount: number,
  ) => {
    const isObjectId = mongoose.Types.ObjectId.isValid(productId);
    const query = isObjectId
      ? { _id: productId, sellerId }
      : { sku: productId, sellerId };
    const product = await Product.findOne(query);
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    product.discount = discount;
    return await product.save();
  },
  // Service function to update a product by a seller
  UpdateProduct: async (
    sellerId: string,
    productId: string,
    productData: any,
  ) => {
     const seller = await Seller.findById(sellerId).populate("products");
    if (!seller) throw new AppError(404, "Seller not found");
    const isObjectId = mongoose.Types.ObjectId.isValid(productId);
    const query = isObjectId
      ? { _id: productId, sellerId }
      : { sku: productId, sellerId };
    const product = await Product.findOne(query);
    if (!product) throw new AppError(404, "Product not found");
    if (product.sellerId.toString() !== sellerId) {
      throw new AppError(403, "Unauthorized to update this product");
    }

      if (!product) throw new AppError(404, "Product not found");
     const EditProduct = await Product.findByIdAndUpdate(productId, {
      productName: productData.productName,
      description: productData.description,
      price: productData.price !== undefined ? Number(productData.price) : undefined,
      discount: productData.discount !== undefined ? Number(productData.discount) : undefined,
      stock: productData.stock !== undefined ? Number(productData.stock) : undefined,
      category: productData.category,
      imageUrl: productData.imageUrl,
    }, { new: true });

    return EditProduct;
  },
  // Service function to get all products with pagination
  getAllProducts: async (page: number, limit: number) => {
    const Client = await getClient();
    const cacheKey = `products:page:${page}:limit:${limit}`;
    const lockKey = `lock:${cacheKey}`;

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

    try {
      if (!Client) {
        return await FreshProduct();
      }

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
      const isObjectId = mongoose.Types.ObjectId.isValid(productId);
      const query = isObjectId
        ? { $or: [{ _id: productId }, { sku: productId }] }
        : { sku: productId };

      const product = await Product.findOne(query).populate("sellerId", "storeName FirstName LastName").populate("category", "categoryName");
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
  getSellerProducts: async (sellerId: string) => {
    try {
      const products = await Product.find({ sellerId }).populate("category", "categoryName");
      return products;
    } catch (error) {
      console.log(error);
      throw new AppError(500, "Failed to retrieve seller products");
    }
  },
  deleteProduct: async (sellerId: string, productId: string) => {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new AppError(404, "Product not found");
      }
      if (product.sellerId.toString() !== sellerId) {
        throw new AppError(403, "Unauthorized to delete this product");
      }
      const deletedProduct = await Product.findByIdAndDelete(productId);
      return deletedProduct;
    }catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, "Failed to delete product");
    }
  }
};
