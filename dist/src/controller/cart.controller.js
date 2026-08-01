"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCart = createCart;
const uuid_1 = require("uuid");
const client_1 = require("../config/client");
const keys_1 = require("../utils/keys");
const AppError_1 = require("../utils/AppError");
const Responses_1 = require("../utils/Responses");
async function createCart(req, res) {
    try {
        const userId = req.user?.userId || req.body.userId;
        const { items } = req.body;
        const cartId = (0, uuid_1.v4)();
        const cartKey = (0, keys_1.getkeyName)('cart', cartId);
        const client = await (0, client_1.initializeRedisClient)();
        if (!userId) {
            throw new AppError_1.AppError(401, 'User not authenticated');
        }
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new AppError_1.AppError(400, 'Items are required and should be a non-empty array');
        }
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const cart = {
            cartId,
            userId,
            items,
            totalPrice,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await client.set(cartKey, JSON.stringify(cart), { EX: 60 * 60 * 24 * 30 }); // Set expiration to 30 days
        (0, Responses_1.sendSuccessResponse)(res, 201, 'Cart created successfully', cart);
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        else {
            console.error('Error creating cart:', error);
            (0, Responses_1.sendErrorResponse)(res, 500, 'Internal Server Error');
        }
    }
}
//# sourceMappingURL=cart.controller.js.map