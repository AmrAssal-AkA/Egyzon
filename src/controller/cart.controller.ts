import type { Request, Response } from 'express';
import {v4 as uuidv4} from 'uuid';

import  {initializeRedisClient} from '../config/client';
import { getkeyName } from '../utils/keys';
import { Cart , type CartItem} from '../types/cart.types';
import { AppError } from '../utils/AppError';
import {sendErrorResponse, sendSuccessResponse} from "../utils/Responses"

export async function createCart(req: Request, res: Response) {
    try {
        const userId = req.user?.userId || req.body.userId;
        const { items }  = req.body as { items: CartItem[] };
        const cartId = uuidv4();
        const cartKey = getkeyName('cart', cartId);
        const client = await initializeRedisClient();

        if (!userId){
            throw new AppError(401, 'User not authenticated');
        }
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new AppError(400, 'Items are required and should be a non-empty array');
        }
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const cart: Cart = {
            cartId,
            userId,
            items,
            totalPrice,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await client.set(cartKey, JSON.stringify(cart), {EX: 60 * 60 * 24 * 30}); // Set expiration to 30 days
        sendSuccessResponse(res, 201, 'Cart created successfully', cart);

    }catch (error) {
        if(error instanceof AppError){
            sendErrorResponse(res, error.statusCode, error.message);
        }else{
            console.error('Error creating cart:', error);
            sendErrorResponse(res, 500, 'Internal Server Error');
        }
    }
}

