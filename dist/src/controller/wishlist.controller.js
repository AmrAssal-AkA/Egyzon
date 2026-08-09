"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveToCart = exports.getWishlist = exports.removeFromWishlist = exports.addToWishlist = void 0;
const Responses_1 = require("../utils/Responses");
const wishlist_services_1 = require("../services/wishlist.services");
const addToWishlist = async (req, res) => {
    try {
        const user = req.user?.userId ||
            (process.env.NODE_ENV !== "production" && req.body?.userId);
        const { productId } = req.body;
        if (!user) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "unauthorized", "user must be logged in to add product to wishlist");
        }
        if (!productId) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Product ID is required");
        }
        const response = await wishlist_services_1.WishlistServices.addToWishlist(user, productId);
        (0, Responses_1.sendSuccessResponse)(res, 201, "Product added to wishlist", response);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
exports.addToWishlist = addToWishlist;
const removeFromWishlist = async (req, res) => {
    try {
        const user = req.user?.userId ||
            (process.env.NODE_ENV !== "production" && req.body?.userId);
        const { productId } = req.body;
        if (!user) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "unauthorized", "user must be logged in to remove product from wishlist`");
        }
        if (!productId) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Product ID is required");
        }
        const response = await wishlist_services_1.WishlistServices.removeFromWishlist(user, productId);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Product removed from wishlist", response);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
exports.removeFromWishlist = removeFromWishlist;
const getWishlist = async (req, res) => {
    try {
        const user = req.user?.userId ||
            (process.env.NODE_ENV !== "production" && req.body?.userId);
        if (!user) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "unauthorized", "user must be logged in to view wishlist");
        }
        const respose = await wishlist_services_1.WishlistServices.getWishlist(user);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Wishlist retrieved successfully", respose);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
exports.getWishlist = getWishlist;
const moveToCart = async (req, res) => {
    try {
        const user = req.user?.userId ||
            (process.env.NODE_ENV !== "production" && req.body?.userId);
        const { productId } = req.body;
        if (!user) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "unauthorized", "user must be logged in to move product to cart");
        }
        if (!productId) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Product ID is required");
        }
        const { addToCart, removeWishlist } = await wishlist_services_1.WishlistServices.MoveToCart(user, productId);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Product moved to cart successfully", {
            addToCart,
            removeWishlist,
        });
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
exports.moveToCart = moveToCart;
//# sourceMappingURL=wishlist.controller.js.map