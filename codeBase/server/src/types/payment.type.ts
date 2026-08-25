import {Document, Types} from "mongoose";

export enum PaymentStatus {
    pending = 'pending',
    paid = 'paid',
    failed = 'failed',
    refunded = 'refunded',
}


export interface IPayment extends Document {
    transactionId?: string;
    paymobOrderId?: number;
    amount: number;
    currency: string;
    paymentMethod: string;
    order?: Types.ObjectId;
    paymentStatus: PaymentStatus;
    paymentDate: Date;
    gateway: string;
    gatewayResponse: string;
    refundAmount?: number;
    cardLast4?: string;
    cardBrand?: string;
    createdAt: Date;
    updatedAt: Date;
}