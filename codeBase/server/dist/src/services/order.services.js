"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const customerModel_1 = __importDefault(require("../models/customerModel"));
const order_type_1 = require("../types/order.type");
const AppError_1 = require("../utils/AppError");
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = require("../config/client");
const keys_1 = require("../utils/keys");
const payment_type_1 = require("../types/payment.type");
const payment_controller_1 = require("../controller/payment.controller");
// const TAX_RATE = 0.14; // 14% tax rate
class OrderService {
    constructor(order, product, paymentService = payment_controller_1.paymentServices) {
        this.order = order;
        this.product = product;
        this.paymentService = paymentService;
    }
    async placeOrder(input) {
        const customerId = input.customerId;
        const client = await (0, client_1.initializeRedisClient)();
        const userCartKey = (0, keys_1.cartkeyUserById)(customerId);
        const cartRaw = await client.get(userCartKey);
        const customer = await customerModel_1.default.findById(customerId);
        if (!cartRaw)
            throw new AppError_1.AppError(400, "Cart is empty");
        if (!customer)
            throw new AppError_1.AppError(404, "Customer not found");
        let cartItems = [];
        let cartKeyToDelete = null;
        try {
            const parsed = JSON.parse(cartRaw);
            if (Array.isArray(parsed))
                cartItems = parsed;
            else if (parsed && Array.isArray(parsed.items))
                cartItems = parsed.items;
        }
        catch {
            const cartKey = (0, keys_1.cartkeyById)(cartRaw);
            cartKeyToDelete = cartKey;
            const cartData = await client.get(cartKey);
            if (cartData) {
                try {
                    const parsed = JSON.parse(cartData);
                    if (Array.isArray(parsed))
                        cartItems = parsed;
                    else if (parsed && Array.isArray(parsed.items))
                        cartItems = parsed.items;
                }
                catch (e) {
                    console.error("Failed to parse cartData:", e);
                }
            }
        }
        if (!cartItems || cartItems.length === 0)
            throw new AppError_1.AppError(400, "Cart is empty");
        {
            /*1. DB Transaction  */
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        let order;
        let paymobProuducts = [];
        let totalAmount = 0;
        try {
            const orderItems = [];
            let subtotal = 0;
            let totalDiscount = 0;
            for (const i of cartItems) {
                const product = await this.product
                    .findById(i.productId)
                    .session(session);
                if (!product)
                    throw new AppError_1.AppError(404, `Product with ID ${i.productId} not found`);
                if (product.stock < i.quantity)
                    throw new AppError_1.AppError(400, `out of stock for product ${product.productName}`);
                const unitPrice = product.price;
                const itemSubtotal = unitPrice * i.quantity;
                const itemDiscount = product.discount
                    ? (unitPrice * product.discount * i.quantity) / 100
                    : 0;
                const itemTotal = itemSubtotal - itemDiscount;
                subtotal += itemSubtotal;
                totalDiscount += itemDiscount;
                orderItems.push({
                    product: product._id,
                    seller: product.sellerId,
                    quantity: i.quantity,
                    unitPrice,
                    discount: itemDiscount,
                    total: itemTotal,
                });
                paymobProuducts.push({
                    name: product.productName,
                    price: itemTotal,
                    quantity: i.quantity,
                    description: product.productDescription || "",
                });
                product.stock -= i.quantity;
                await product.save({ session });
            }
            const shippingFee = subtotal > 0 ? 10 : 0; // Flat shipping fee
            const taxAmount = 0;
            totalAmount = subtotal - totalDiscount + shippingFee + taxAmount;
            order = new this.order({
                customer: input.customerId,
                orderItems,
                subTotal: subtotal,
                discount: totalDiscount,
                shippingFee,
                taxAmount,
                totalAmount,
                paymentStatus: payment_type_1.PaymentStatus.pending,
                paymentMethod: {
                    method: input.paymentMethod,
                    details: input.shippingAddress,
                },
                orderStatus: order_type_1.OrderStatus.pending,
                notes: input.notes || "",
                address: input.address,
            });
            await order.save({ session });
            await customerModel_1.default.findByIdAndUpdate(customerId, { $push: { orders: order._id } }, { session });
            await session.commitTransaction();
        }
        catch (error) {
            await session.abortTransaction();
            console.error("Error placing order:", error);
            if (error instanceof AppError_1.AppError)
                throw error;
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
        finally {
            session.endSession();
        }
        // ---------- PHASE 2: post-commit side effects (no session involved) ----------
        try {
            const keysToDelete = [userCartKey];
            if (cartKeyToDelete)
                keysToDelete.push(cartKeyToDelete);
            await Promise.all(keysToDelete.map((k) => client.del(k)));
        }
        catch (cacherror) {
            console.error("Error clearing cart cache:", cacherror);
        }
        if (input.paymentMethod === "cashOnDelivery") {
            const payment = await this.paymentService.createCodPayment({
                amount: totalAmount,
            });
            order.payment = payment._id;
            await order.save();
            return { order };
        }
        if (input.paymentMethod === "creditCard") {
            if (!input.billingData)
                throw new AppError_1.AppError(400, "Billing data is required for credit card payment");
            const paymobBillingData = {
                firstName: input.billingData.firstName,
                lastName: input.billingData.lastName,
                email: input.billingData.email,
                phoneNumber: input.billingData.phoneNumber,
                apartment: "NA",
                floor: "NA",
                street: input.address.address1,
                building: input.address.address2 || "NA",
                city: input.address.city,
                state: input.address.state,
                country: input.address.country,
                postalCode: input.address.postalCode,
            };
            const { paymentDoc, paymentUrl } = await this.paymentService.initializePayment({
                orderMongoId: order._id.toString(),
                amount: totalAmount,
                billingData: paymobBillingData,
                products: paymobProuducts,
            });
            order.payment = paymentDoc._id;
            await order.save();
            return { order, paymentUrl };
        }
        throw new AppError_1.AppError(400, "Invalid payment method");
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.services.js.map