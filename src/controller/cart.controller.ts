import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { initializeRedisClient } from "../config/client";
import { cartkeyById, cartkeyUserById } from "../utils/keys";
import { Cart, type CartItem } from "../types/cart.types";
import { AppError } from "../utils/AppError";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";

const getRequestUserId = (req: Request) =>
  req.user?.userId ||
  (process.env.NODE_ENV !== "production" ? req.body?.userId : undefined);

async function createCart(req: Request, res: Response) {
  try {
    const userId = getRequestUserId(req);
    const { items } = req.body as { items: CartItem[] };
    const userCartKey = cartkeyUserById(userId);
    const client = await initializeRedisClient();

    if (!userId) {
      throw new AppError(401, "User not authenticated");
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new AppError(
        400,
        "Items are required and should be a non-empty array",
      );
    }
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const existingCartId = await client.get(userCartKey);
    if (existingCartId) {
      return sendErrorResponse(
        res,
        409,
        "Cart already exists for this user",
        "Cart already exists for this user",
      );
    }

    const ParseItems = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
    }));
    const cartId = uuidv4();
    const cart: Cart = {
      cartId,
      userId,
      userCartKey,
      items: ParseItems,
      totalPrice,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const cartKey = cartkeyById(cartId);
    const TTL = 60 * 60 * 24 * 30;

    await Promise.all([
      client.set(cartKey, JSON.stringify(cart), { EX: TTL }),
      client.set(userCartKey, cartId, { EX: TTL }),
    ]);

    sendSuccessResponse(res, 201, "Cart created successfully", cart);
  } catch (error) {
    if (error instanceof AppError) {
      sendErrorResponse(res, error.statusCode, error.message);
    } else {
      console.error("Error creating cart:", error);
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
}

const getCart = async (req: Request, res: Response) => {
  try {
    const userId = getRequestUserId(req);
    if (!userId) {
      throw new AppError(401, "User not authenticated");
    }
    const client = await initializeRedisClient();
    const userCartKey = cartkeyUserById(userId);
    const cartId = await client.get(userCartKey);

    if (!cartId) {
      return sendErrorResponse(
        res,
        404,
        "Cart not found for this user",
        "Cart not found for this user",
      );
    }

    const cartKey = cartkeyById(cartId);
    const cartData = await client.get(cartKey);

    if (!cartData) {
      throw new AppError(404, "Cart data not found");
    }

    const cart: Cart = JSON.parse(cartData);
    sendSuccessResponse(res, 200, "Cart retrieved successfully", cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    if (error instanceof AppError) {
      return sendErrorResponse(res, error.statusCode, error.message);
    }
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const removeCart = async (req: Request, res: Response) => {
  try {
    const userId = getRequestUserId(req);
    if (!userId) {
      throw new AppError(401, "User not authenticated");
    }
    const client = await initializeRedisClient();
    const userCartKey = cartkeyUserById(userId);
    const cartId = await client.get(userCartKey);

    if (!cartId) {
      throw new AppError(404, "Cart not found for this user");
    }

    const cartKey = cartkeyById(cartId);
    await Promise.all([client.del(cartKey), client.del(userCartKey)]);

    sendSuccessResponse(res, 200, "Cart removed successfully", null);
  } catch (error) {
    if (error instanceof AppError) {
      sendErrorResponse(res, error.statusCode, error.message);
    } else {
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
};

export default { createCart, getCart, removeCart };
