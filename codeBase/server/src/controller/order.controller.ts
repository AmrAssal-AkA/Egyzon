import type {Request, Response} from "express";

import Order from "../models/orderModel";
import Product from "../models/productModel";
import{ OrderService } from "../services/order.services";
import {sendErrorResponse, sendSuccessResponse} from "../utils/Responses";

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const customerId = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.customerId : undefined);
        const userRole = req.user?.role || (process.env.NODE_ENV !== "production" ? "customer" : undefined);
        if (!customerId || userRole !== "customer") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to place an order");
        const { paymentMethod, shippingAddress, notes, Address } = req.body;
        if (shippingAddress.length < 5) return sendErrorResponse(res, 400, "Bad Request", "Shipping address must be at least 5 characters long");
        if (!paymentMethod || (paymentMethod !== "cashOnDelivery" && paymentMethod !== "creditCard")) return sendErrorResponse(res, 400, "Bad Request", "Invalid payment method");
        
        const orderService = new OrderService(Order, Product);
        const order = await orderService.placeOrder({ customerId, paymentMethod, shippingAddress, notes, Address });
        return sendSuccessResponse(res, 201, "Order placed successfully", order);
    }catch(error: any){
        return sendErrorResponse(res, error.statusCode || 500, error.message || "Internal Server Error", error);
    }
}