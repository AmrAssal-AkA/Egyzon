import type { Request, Response } from "express";

import Wishlist from "../models/wishlistModel";
import Customer from "../models/customerModel";
import Product from "../models/productModel";
import { initializeRedisClient } from "../config/client";
import { wishlistCacheKey, cartkeyById } from "../utils/keys";
import { AppError } from "../utils/AppError";

const TTL_Safely = 60 * 10;
const cartExpiry = 60 * 60 * 24 * 30;

export const WishlistServices = {
  addToWishlist: async (userId: string, productId: string) => {
    try {
      const [customer, product] = await Promise.all([
        Customer.findById(userId),
        Product.findById(productId),
      ]);
      if (!customer) {
        throw new Error("Customer not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }
      // Add the product to the wishlist using $addToSet to avoid duplicates
      const addWishlistItem = await Wishlist.findOneAndUpdate(
        { userId: customer._id },
        {
          $addToSet: { productId: product._id },
        },
        { returnDocument: "after", upsert: true },
      );
      // Cache the wishlist in Redis
      try {
        const client = await initializeRedisClient();
        const cacheKey = wishlistCacheKey(userId);
        await client.hSet(cacheKey, productId, JSON.stringify(product));
        await client.expire(cacheKey, TTL_Safely);
      } catch (error) {
        console.log("Cache error:", error);
      }
      // Return the updated wishlist item
      return addWishlistItem;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw error;
    }
  },

  removeFromWishlist: async (userId: string, productId: string) => {
    try {
      const customer = await Customer.findById(userId);
      if (!customer) {
        throw new AppError(404, "Customer not found");
      }

      const removeFromWishlist = await Wishlist.findOneAndUpdate(
        { userId: customer._id },
        {
          $pull: { productId: productId },
        },
        { returnDocument: "after" },
      );
      // Cache the updated wishlist in Redis
      try {
        const client = await initializeRedisClient();
        const cacheKey = wishlistCacheKey(userId);
        await client.hDel(cacheKey, productId);
      } catch (error) {
        console.log("Cache error:", error);
      }
      return removeFromWishlist;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw error;
    }
  },
  getWishlist: async (userId: string) => {
    try {
      const customer = await Customer.findById(userId);
      if (!customer) {
        throw new AppError(404, "Customer not found");
      }
      const cachekey = wishlistCacheKey(userId);
      let cachedWishlist: Record<string, string> = {};
      try {
        const client = await initializeRedisClient();
        cachedWishlist = await client.hGetAll(cachekey);
      } catch (error) {
        console.log("Cache error:", error);
      }
      // check if the wishlist is cached in Redis
      if (Object.keys(cachedWishlist).length > 0) {
        const wishlistProducts = Object.values(cachedWishlist).map((product) =>
          JSON.parse(product),
        );
        return { userId: customer._id, productId: wishlistProducts };
      }
      // If not cached, fetch from the database
      const wishlist = await Wishlist.findOne({
        userId: customer._id,
      }).populate("productId");
      if (!wishlist) {
        return { userId: customer._id, productId: [] };
      }
      // Cache the wishlist in Redis for future requests
      try {
        const client = await initializeRedisClient();
        const wishlistProductsMap: Record<string, string> = {};
        const wishlistProducts = wishlist.productId.map((product: any) => {
          wishlistProductsMap[product._id.toString()] = JSON.stringify(product);
          return product;
        });

        if (Object.keys(wishlistProductsMap).length > 0) {
          await client.hSet(cachekey, wishlistProductsMap);
          await client.expire(cachekey, TTL_Safely);
        }
        return { userId: customer._id, productId: wishlistProducts };
      } catch (error) {
        console.log("Cache error:", error);
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw error;
    }
  },
  MoveToCart: async (userId: string, productId: string) => {
    try {
      const customer = await Customer.findById(userId);
      const product = await Product.findById(productId);
      const client = await initializeRedisClient();

      if (!customer) {
        throw new AppError(404, "Customer not found");
      }
      if (!product) {
        throw new AppError(404, "Product not found");
      }
      const cartKey = cartkeyById(userId);
      const cartItem = {
        productId: product._id,
        quantity: 1,
        unitPrice: product.price,
        subTotal: product.price,
      };
      const addToCart = await client.hSet(
        cartKey,
        productId,
        JSON.stringify(cartItem),
      );
      await client.expire(cartKey, cartExpiry);

      const removeWishlist = await Wishlist.findOneAndUpdate(
        { userId: customer._id },
        {
          $pull: { products: { productId: product._id } },
        },
        { returnDocument: "after" },
      );

      return { addToCart, removeWishlist };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw error;
    }
  },
};
