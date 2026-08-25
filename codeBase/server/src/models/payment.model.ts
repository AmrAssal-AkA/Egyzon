import mongoose, { Schema, Document } from 'mongoose';
import { IPayment, PaymentStatus } from '../types/payment.type';

const paymentSchema= new Schema<IPayment>({
    transactionId: { type: String },
    paymobOrderId: { type: Number },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.pending },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    paymentDate: { type: Date, default: Date.now },
    gateway: { type: String, required: true },
    gatewayResponse: { type: String},
    refundAmount: { type: Number, default: 0 },
    cardLast4: { type: String },
    cardBrand: { type: String },
}, {
    timestamps: true,
})

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);