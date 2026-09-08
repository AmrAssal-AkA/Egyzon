import type { Request, Response } from "express";

import Order from "../models/orderModel";
import Product from "../models/productModel";
import { OrderService } from "../services/order.services";
import {AppError} from "../utils/AppError";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";
import { NotificationServices } from "../services/notification.services";
import { paymentServices } from "../controller/payment.controller";
import { sendOrderReceivedConfirmationEmail } from "../templates/orderReceivedConfirmationTem";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const customerId =
      req.user?.userId ||
      (process.env.NODE_ENV !== "production" ? req.body.customerId : undefined);
    const userRole =
      req.user?.role ||
      (process.env.NODE_ENV !== "production" ? "customer" : undefined);
    if (!customerId || userRole !== "customer")
      return sendErrorResponse(
        res,
        403,
        "Forbidden",
        "You are not authorized to place an order",
      );
    const {
      paymentMethod,
      shippingAddress,
      notes,
      Address: address,
      billingData,
    } = req.body;
    if (shippingAddress.length < 5)
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Shipping address must be at least 5 characters long",
      );
    if (
      !paymentMethod ||
      (paymentMethod !== "cashOnDelivery" && paymentMethod !== "creditCard")
    )
      return sendErrorResponse(
        res,
        400,
        "Bad Request",
        "Invalid payment method",
      );
    if (
      !address ||
      !address.address1 ||
      !address.city ||
      !address.state ||
      !address.postalCode ||
      !address.country
    )
      return sendErrorResponse(res, 400, "Bad Request", "Invalid address");
    if (
      !billingData ||
      !billingData.firstName ||
      !billingData.lastName ||
      !billingData.email ||
      !billingData.phoneNumber
    )
      return sendErrorResponse(res, 400, "Bad Request", "Invalid billing data");
    const orderService = new OrderService(Order, Product, paymentServices);
    const order = await orderService.placeOrder({
      customerId,
      paymentMethod,
      shippingAddress,
      notes,
      address,
      billingData,
    });
    await sendOrderReceivedConfirmationEmail(order.order);
    const sellerId = order.order.orderItems[0]?.seller?._id?.toString();
    if (sellerId) {
      await NotificationServices.notifySellerAdminForNewOrder({
        orderId: order.order._id.toString(),
        sellerId,
        buyerName: `${billingData.firstName} ${billingData.lastName}`,
      });
    }
    return sendSuccessResponse(res, 201, "Order placed successfully", order);
  } catch (error: any) {
    return sendErrorResponse(
      res,
      error.statusCode || 500,
      error.message || "Internal Server Error",
      error,
    );
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.userId;
    const userRole = req.user?.role;
    if (!customerId || userRole !== "customer") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to view orders");
    const customerOrders = await Order.find({ customerId }).sort({ createdAt: -1 });
    return sendSuccessResponse(res, 200, "Orders retrieved successfully", customerOrders);
  }catch(error){
    if(error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message, error);
    return sendErrorResponse(res, 500, "Internal Server Error", error);
  }
}
