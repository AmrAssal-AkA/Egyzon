"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = exports.placeOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const order_services_1 = require("../services/order.services");
const AppError_1 = require("../utils/AppError");
const Responses_1 = require("../utils/Responses");
const notification_services_1 = require("../services/notification.services");
const payment_controller_1 = require("../controller/payment.controller");
const placeOrder = async (req, res) => {
    try {
        const customerId = req.user?.userId ||
            (process.env.NODE_ENV !== "production" ? req.body.customerId : undefined);
        const userRole = req.user?.role ||
            (process.env.NODE_ENV !== "production" ? "customer" : undefined);
        if (!customerId || userRole !== "customer")
            return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to place an order");
        const { paymentMethod, shippingAddress, notes, Address: address, billingData, } = req.body;
        if (shippingAddress.length < 5)
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Shipping address must be at least 5 characters long");
        if (!paymentMethod ||
            (paymentMethod !== "cashOnDelivery" && paymentMethod !== "creditCard"))
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Invalid payment method");
        if (!address ||
            !address.address1 ||
            !address.city ||
            !address.state ||
            !address.postalCode ||
            !address.country)
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Invalid address");
        if (!billingData ||
            !billingData.firstName ||
            !billingData.lastName ||
            !billingData.email ||
            !billingData.phoneNumber)
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Invalid billing data");
        const orderService = new order_services_1.OrderService(orderModel_1.default, productModel_1.default, payment_controller_1.paymentServices);
        const order = await orderService.placeOrder({
            customerId,
            paymentMethod,
            shippingAddress,
            notes,
            address,
            billingData,
        });
        await notification_services_1.NotificationServices.createNotification({
            user: customerId,
            title: "Order Placed",
            message: `Your order with ID ${order.order._id} has been placed successfully.`,
            type: "info",
        });
        return (0, Responses_1.sendSuccessResponse)(res, 201, "Order placed successfully", order);
    }
    catch (error) {
        return (0, Responses_1.sendErrorResponse)(res, error.statusCode || 500, error.message || "Internal Server Error", error);
    }
};
exports.placeOrder = placeOrder;
const getUserOrders = async (req, res) => {
    try {
        const customerId = req.user?.userId;
        const userRole = req.user?.role;
        if (!customerId || userRole !== "customer")
            return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to view orders");
        const customerOrders = await orderModel_1.default.find({ customerId }).sort({ createdAt: -1 });
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Orders retrieved successfully", customerOrders);
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message, error);
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
exports.getUserOrders = getUserOrders;
//# sourceMappingURL=order.controller.js.map