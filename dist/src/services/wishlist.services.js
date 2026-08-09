"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistServices = void 0;
const wishlistModel_1 = __importDefault(require("../models/wishlistModel"));
const customerModel_1 = __importDefault(require("../models/customerModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const client_1 = require("../config/client");
const keys_1 = require("../utils/keys");
const AppError_1 = require("../utils/AppError");
const TTL_Safely = 60 * 10;
const cartExpiry = 60 * 60 * 24 * 30;
exports.WishlistServices = {
    addToWishlist: async (userId, productId) => {
        try {
            const [customer, product] = await Promise.all([
                customerModel_1.default.findById(userId),
                productModel_1.default.findById(productId),
            ]);
            if (!customer) {
                throw new Error("Customer not found");
            }
            if (!product) {
                throw new Error("Product not found");
            }
            // Add the product to the wishlist using $addToSet to avoid duplicates
            const addWishlistItem = await wishlistModel_1.default.findOneAndUpdate({ userId: customer._id }, {
                $addToSet: { productId: product._id },
            }, { returnDocument: "after", upsert: true });
            // Cache the wishlist in Redis
            try {
                const client = await (0, client_1.initializeRedisClient)();
                const cacheKey = (0, keys_1.wishlistCacheKey)(userId);
                await client.hSet(cacheKey, productId, JSON.stringify(product));
                await client.expire(cacheKey, TTL_Safely);
            }
            catch (error) {
                console.log("Cache error:", error);
            }
            // Return the updated wishlist item
            return addWishlistItem;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.log(error);
            throw error;
        }
    },
    removeFromWishlist: async (userId, productId) => {
        try {
            const customer = await customerModel_1.default.findById(userId);
            if (!customer) {
                throw new AppError_1.AppError(404, "Customer not found");
            }
            const removeFromWishlist = await wishlistModel_1.default.findOneAndUpdate({ userId: customer._id }, {
                $pull: { productId: productId },
            }, { returnDocument: "after" });
            // Cache the updated wishlist in Redis
            try {
                const client = await (0, client_1.initializeRedisClient)();
                const cacheKey = (0, keys_1.wishlistCacheKey)(userId);
                await client.hDel(cacheKey, productId);
            }
            catch (error) {
                console.log("Cache error:", error);
            }
            return removeFromWishlist;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.log(error);
            throw error;
        }
    },
    getWishlist: async (userId) => {
        try {
            const customer = await customerModel_1.default.findById(userId);
            if (!customer) {
                throw new AppError_1.AppError(404, "Customer not found");
            }
            const cachekey = (0, keys_1.wishlistCacheKey)(userId);
            let cachedWishlist = {};
            try {
                const client = await (0, client_1.initializeRedisClient)();
                cachedWishlist = await client.hGetAll(cachekey);
            }
            catch (error) {
                console.log("Cache error:", error);
            }
            // check if the wishlist is cached in Redis
            if (Object.keys(cachedWishlist).length > 0) {
                const wishlistProducts = Object.values(cachedWishlist).map((product) => JSON.parse(product));
                return { userId: customer._id, productId: wishlistProducts };
            }
            // If not cached, fetch from the database
            const wishlist = await wishlistModel_1.default.findOne({
                userId: customer._id,
            }).populate("productId");
            if (!wishlist) {
                return { userId: customer._id, productId: [] };
            }
            // Cache the wishlist in Redis for future requests
            try {
                const client = await (0, client_1.initializeRedisClient)();
                const wishlistProductsMap = {};
                const wishlistProducts = wishlist.productId.map((product) => {
                    wishlistProductsMap[product._id.toString()] = JSON.stringify(product);
                    return product;
                });
                if (Object.keys(wishlistProductsMap).length > 0) {
                    await client.hSet(cachekey, wishlistProductsMap);
                    await client.expire(cachekey, TTL_Safely);
                }
                return { userId: customer._id, productId: wishlistProducts };
            }
            catch (error) {
                console.log("Cache error:", error);
            }
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.log(error);
            throw error;
        }
    },
    MoveToCart: async (userId, productId) => {
        try {
            const customer = await customerModel_1.default.findById(userId);
            const product = await productModel_1.default.findById(productId);
            const client = await (0, client_1.initializeRedisClient)();
            if (!customer) {
                throw new AppError_1.AppError(404, "Customer not found");
            }
            if (!product) {
                throw new AppError_1.AppError(404, "Product not found");
            }
            const cartKey = (0, keys_1.cartkeyById)(userId);
            const cartItem = {
                productId: product._id,
                quantity: 1,
                unitPrice: product.price,
                subTotal: product.price,
            };
            const addToCart = await client.hSet(cartKey, productId, JSON.stringify(cartItem));
            await client.expire(cartKey, cartExpiry);
            const removeWishlist = await wishlistModel_1.default.findOneAndUpdate({ userId: customer._id }, {
                $pull: { products: { productId: product._id } },
            }, { returnDocument: "after" });
            return { addToCart, removeWishlist };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.log(error);
            throw error;
        }
    },
};
//# sourceMappingURL=wishlist.services.js.map