import mongoose, { Schema, Document } from 'mongoose';
import {v4 as uuidv4} from 'uuid';

import { IOrder, OrderStatus, PaymentStatus, IOrderItem } from '../types/order.type';



const orderItemSchema = new Schema<IOrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    subtotal: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
    orderNumber: { type: String, required: true, unique: true, default: () => `ORD-${uuidv4()}` },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.pending },
    subTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.pending },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    paymentMethod: {
        method: { type: String, enum: ['cashOnDelivery', 'creditCard'], required: true },
        details: { type: String }
    },
    Address: {
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
})

export default mongoose.model<IOrder>('Order', orderSchema);