"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const client_1 = require("../config/client");
const keys_1 = require("../utils/keys");
const AppError_1 = require("../utils/AppError");
const Responses_1 = require("../utils/Responses");
const getRequestUserId = (req) => req.user?.userId ||
    (process.env.NODE_ENV !== "production" ? req.body?.userId : undefined);
async function createCart(req, res) {
    try {
        const userId = getRequestUserId(req);
        const { items } = req.body;
        const userCartKey = (0, keys_1.cartkeyUserById)(userId);
        const client = await (0, client_1.initializeRedisClient)();
        if (!userId) {
            throw new AppError_1.AppError(401, "User not authenticated");
        }
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new AppError_1.AppError(400, "Items are required and should be a non-empty array");
        }
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const existingCartId = await client.get(userCartKey);
        if (existingCartId) {
            return (0, Responses_1.sendErrorResponse)(res, 409, "Cart already exists for this user", "Cart already exists for this user");
        }
        const ParseItems = items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
        }));
        const cartId = (0, uuid_1.v4)();
        const cart = {
            cartId,
            userId,
            userCartKey,
            items: ParseItems,
            totalPrice,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const cartKey = (0, keys_1.cartkeyById)(cartId);
        const TTL = 60 * 60 * 24 * 30;
        await Promise.all([
            client.set(cartKey, JSON.stringify(cart), { EX: TTL }),
            client.set(userCartKey, cartId, { EX: TTL }),
        ]);
        (0, Responses_1.sendSuccessResponse)(res, 201, "Cart created successfully", cart);
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        else {
            console.error("Error creating cart:", error);
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    }
}
const getCart = async (req, res) => {
    try {
        const userId = getRequestUserId(req);
        if (!userId) {
            throw new AppError_1.AppError(401, "User not authenticated");
        }
        const client = await (0, client_1.initializeRedisClient)();
        const userCartKey = (0, keys_1.cartkeyUserById)(userId);
        const cartId = await client.get(userCartKey);
        if (!cartId) {
            return (0, Responses_1.sendErrorResponse)(res, 404, "Cart not found for this user", "Cart not found for this user");
        }
        const cartKey = (0, keys_1.cartkeyById)(cartId);
        const cartData = await client.get(cartKey);
        if (!cartData) {
            throw new AppError_1.AppError(404, "Cart data not found");
        }
        const cart = JSON.parse(cartData);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Cart retrieved successfully", cart);
    }
    catch (error) {
        console.error("Error retrieving cart:", error);
        if (error instanceof AppError_1.AppError) {
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
const removeCart = async (req, res) => {
    try {
        const userId = getRequestUserId(req);
        if (!userId) {
            throw new AppError_1.AppError(401, "User not authenticated");
        }
        const client = await (0, client_1.initializeRedisClient)();
        const userCartKey = (0, keys_1.cartkeyUserById)(userId);
        const cartId = await client.get(userCartKey);
        if (!cartId) {
            throw new AppError_1.AppError(404, "Cart not found for this user");
        }
        const cartKey = (0, keys_1.cartkeyById)(cartId);
        await Promise.all([client.del(cartKey), client.del(userCartKey)]);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Cart removed successfully", null);
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        else {
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    }
};
exports.default = { createCart, getCart, removeCart };
//# sourceMappingURL=cart.controller.js.map