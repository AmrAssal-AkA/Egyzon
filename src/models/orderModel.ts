import mongoose, { Schema, Document } from 'mongoose';
import { IOrder, OrderStatus, PaymentStatus, OrderItem } from '../types/order.type';

const orderItemSchema = new Schema<OrderItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    subtotal: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
    orderNumber: { type: Number, required: true, unique: true },
    custtomer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    orderDate: { type: Date, default: Date.now },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.pending },
    subTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.pending },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    note: { type: String, default: '' },
    orderItems: { type: [orderItemSchema], default: [] },
}, {
    timestamps: true,
})

export default mongoose.model<IOrder>('Order', orderSchema);