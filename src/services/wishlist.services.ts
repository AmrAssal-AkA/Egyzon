import type { Request, Response } from "express";

import Wishlist from "../models/wishlistModel";
import Customer from "../models/customerModel";
import Product from "../models/productModel";

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
      const exsitingWishlistItem = await Wishlist.findOne({
        userId: customer._id,
        productId: product._id,
      });
      if (exsitingWishlistItem) {
        throw new Error("Product already in wishlist");
      }
      const addWishlistItem = await Wishlist.findOneAndUpdate(
        { userId: customer._id },
        {
          $addToSet: { productId: product._id },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true, new: true },
      );

      return addWishlistItem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  removeFromWishlist: async (userId: string, productId: string) => {
    try {
        const [customer, product] = await Promise.all([
            Customer.findById(userId),
            Product.findById(productId),
        ]);
        if (!customer){
            throw new Error('Customer not found');
        }
        if (!product){
            throw new Error('Product not found');
        }
        const removeFromWishlist = await Wishlist.findOneAndUpdate(
            {userId: customer._id, productId: product._id},
            {
                $pull: { productId: product._id },
            },
            { new: true }
        )
        return removeFromWishlist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getWishlist: async (userId: string) => {
    try {
      const customer = await Customer.findById(userId);
      if (!customer) {
        throw new Error("Customer not found");
      }
        const wishlist = await Wishlist.findOne({userId: customer._id}).populate('productId');
        return wishlist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

};
