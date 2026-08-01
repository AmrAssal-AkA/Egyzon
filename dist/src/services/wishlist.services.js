"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistServices = void 0;
const wishlistModel_1 = __importDefault(require("../models/wishlistModel"));
const customerModel_1 = __importDefault(require("../models/customerModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
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
            const exsitingWishlistItem = await wishlistModel_1.default.findOne({
                userId: customer._id,
                productId: product._id,
            });
            if (exsitingWishlistItem) {
                throw new Error("Product already in wishlist");
            }
            const addWishlistItem = await wishlistModel_1.default.findOneAndUpdate({ userId: customer._id }, {
                $addToSet: { productId: product._id },
                $setOnInsert: { createdAt: new Date() },
            }, { upsert: true, new: true });
            return addWishlistItem;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    },
    removeFromWishlist: async (userId, productId) => {
        try {
            const [customer, product] = await Promise.all([
                customerModel_1.default.findById(userId),
                productModel_1.default.findById(productId),
            ]);
            if (!customer) {
                throw new Error('Customer not found');
            }
            if (!product) {
                throw new Error('Product not found');
            }
            const removeFromWishlist = await wishlistModel_1.default.findOneAndUpdate({ userId: customer._id, productId: product._id }, {
                $pull: { productId: product._id },
            }, { new: true });
            return removeFromWishlist;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    },
    getWishlist: async (userId) => {
        try {
            const customer = await customerModel_1.default.findById(userId);
            if (!customer) {
                throw new Error("Customer not found");
            }
            const wishlist = await wishlistModel_1.default.findOne({ userId: customer._id }).populate('productId');
            return wishlist;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    },
};
//# sourceMappingURL=wishlist.services.js.map