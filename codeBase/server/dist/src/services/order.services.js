"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_type_1 = require("../types/order.type");
const AppError_1 = require("../utils/AppError");
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = require("../config/client");
const keys_1 = require("../utils/keys");
const TAX_RATE = 0.14; // 14% tax rate
class OrderService {
    constructor(order, product) {
        this.order = order;
        this.product = product;
    }
    async placeOrder(input) {
        const client = await (0, client_1.initializeRedisClient)();
        const userCartKey = (0, keys_1.cartkeyUserById)(input.customerId);
        const cartRaw = await client.get(userCartKey);
        if (!cartRaw)
            throw new AppError_1.AppError(400, "Cart is empty");
        let cartItems = [];
        let cartKeyToDelete = null;
        try {
            const parsed = JSON.parse(cartRaw);
            if (Array.isArray(parsed)) {
                cartItems = parsed;
            }
            else if (parsed && Array.isArray(parsed.items)) {
                cartItems = parsed.items;
            }
        }
        catch {
            const cartKey = (0, keys_1.cartkeyById)(cartRaw);
            cartKeyToDelete = cartKey;
            const cartData = await client.get(cartKey);
            if (cartData) {
                try {
                    const parsed = JSON.parse(cartData);
                    if (Array.isArray(parsed)) {
                        cartItems = parsed;
                    }
                    else if (parsed && Array.isArray(parsed.items)) {
                        cartItems = parsed.items;
                    }
                }
                catch (e) {
                    console.error("Failed to parse cartData:", e);
                }
            }
        }
        if (!cartItems || cartItems.length === 0)
            throw new AppError_1.AppError(400, "Cart is empty");
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
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
                const originalPrice = product.price;
                const unitPrice = originalPrice - (originalPrice * product.discount) / 100;
                const itemSubtotal = unitPrice * i.quantity;
                const itemDiscount = (originalPrice - unitPrice) * i.quantity;
                subtotal += itemSubtotal;
                totalDiscount += itemDiscount;
                orderItems.push({
                    product: product._id,
                    quantity: i.quantity,
                    unitPrice,
                    subtotal: itemSubtotal,
                });
                product.stock -= i.quantity;
                await product.save({ session });
            }
            const shippingFee = subtotal > 1500 ? 0 : subtotal * 100;
            const taxAmount = subtotal * TAX_RATE;
            const totalAmount = subtotal + shippingFee + taxAmount;
            const order = new this.order({
                customer: input.customerId,
                orderItems,
                subTotal: subtotal,
                discount: totalDiscount,
                shippingFee: shippingFee,
                taxAmount,
                totalAmount,
                paymentStatus: order_type_1.PaymentStatus.pending,
                paymentMethod: {
                    method: input.paymentMethod,
                    details: input.shippingAddress,
                },
                orderStatus: order_type_1.OrderStatus.pending,
                notes: input.notes || "",
                Address: input.Address,
            });
            await order.save({ session });
            await session.commitTransaction();
            try {
                const keysToDelete = [userCartKey];
                if (cartKeyToDelete)
                    keysToDelete.push(cartKeyToDelete);
                await Promise.all(keysToDelete.map((k) => client.del(k)));
            }
            catch (cacherror) {
                console.error("Error clearing cart cache:", cacherror);
            }
            return order;
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
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.services.js.map