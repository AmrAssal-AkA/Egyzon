import { Document, Types } from 'mongoose';
export declare enum OrderStatus {
    pending = "pending",
    processing = "processing",
    shipped = "shipped",
    delivered = "delivered",
    cancelled = "cancelled"
}
export declare enum PaymentStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed",
    refunded = "refunded"
}
export interface IOrderItem {
    product: Types.ObjectId;
    quantity: number;
    unitPrice: number;
    subtotal: number;
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
    Address: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    orderItems: IOrderItem[];
    placeOrder(): Promise<IOrder>;
    cancelOrder(): Promise<IOrder>;
    updateOrderStatus(status: OrderStatus): Promise<IOrder>;
    calculateSubTotal(): number;
    calculateFullTolal(): number;
    addOrderItem(item: Omit<IOrderItem, "subTotal">): Promise<IOrder>;
    removeOrderItem(productId: Types.ObjectId): Promise<IOrder>;
    getTotalItems(): number;
    setIsPaid(): Promise<IOrder>;
    isShipped(): boolean;
    requestCancellation(): Promise<IOrder>;
    requestRefund(): Promise<IOrder>;
}
//# sourceMappingURL=order.type.d.ts.map