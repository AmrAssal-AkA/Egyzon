"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
const order_type_1 = require("../types/order.type");
const payment_type_1 = require("../types/payment.type");
const orderItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Seller', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
});
const orderSchema = new mongoose_1.Schema({
    orderNumber: { type: String, required: true, unique: true, default: () => `ORD-${(0, uuid_1.v4)()}` },
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'customer', required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, enum: Object.values(order_type_1.OrderStatus), default: order_type_1.OrderStatus.pending },
    subTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: Object.values(payment_type_1.PaymentStatus), default: payment_type_1.PaymentStatus.pending },
    payment: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Payment' },
    paymentMethod: {
        method: { type: String, enum: ['cashOnDelivery', 'creditCard'], required: true },
        details: { type: String }
    },
    address: {
        address1: { type: String, required: true },
        address2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    notes: { type: String, default: '' },
    orderItems: { type: [orderItemSchema], default: [] },
}, {
    timestamps: true,
});
orderSchema.index({ "orderItems.seller": 1, paymentStatus: 1, orderDate: 1 });
exports.default = mongoose_1.default.model('Order', orderSchema);
//# sourceMappingURL=orderModel.js.map