import { Document, Types } from 'mongoose';
import { PaymentStatus } from './payment.type';
export declare enum OrderStatus {
    pending = "pending",
    processing = "processing",
    shipped = "shipped",
    delivered = "delivered",
    cancelled = "cancelled"
}
export interface IOrderItem {
    product: Types.ObjectId;
    seller: Types.ObjectId;
    quantity: number;
    unitPrice: number;
    discount: number;
    total: number;
}
export interface PaymentMethod {
    method: "cashOnDelivery" | "creditCard";
    details?: string;
}
export interface IOrder extends Document {
    orderNumber: string;
    customer: Types.ObjectId;
    orderDate: Date;
    orderStatus: OrderStatus;
    subTotal: number;
    discount: number;
    shippingFee: number;
    taxAmount: number;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    payment?: Types.ObjectId;
    notes: string;
    address: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    orderItems: IOrderItem[];
}
//# sourceMappingURL=order.type.d.ts.map