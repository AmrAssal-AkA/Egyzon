import types, { Document } from 'mongoose';

export enum OrderStatus {
    pending = 'pending',
    processing = 'processing',
    shipped = 'shipped',
    delivered = 'delivered',
    cancelled = 'cancelled',
}
export enum PaymentStatus {
    pending = 'pending',
    completed = 'completed',
    failed = 'failed',
    refunded = 'refunded',
}

export interface OrderItem {
    product: types.ObjectId;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}



export interface IOrder extends Document{
    orderNumber: number;
    custtomer: types.ObjectId;
    orderDate: Date;
    orderStatus: OrderStatus;
    subTotal: number;
    discount: number;
    shippingFee: number;
    taxAmount: number;
    totalAmount: number;
    paymentStatus: PaymentStatus;
    payment?: types.ObjectId
    note: string;
    orderItems: OrderItem[];

 // Order methods
    placeOrder() : Promise<IOrder>;
    cancelOrder(): Promise<IOrder>;
    updateOrderStatus(status: OrderStatus): Promise<IOrder>;
    calculateSubTotal(): number;
    calculateFullTolal(): number;
    addOrderItem(item: Omit<OrderItem, "subTotal">): Promise<IOrder>; 
    removeOrderItem(productId: types.ObjectId): Promise<IOrder>;
    getTotalItems(): number;
    setIsPaid(): Promise<IOrder>;
    isShipped(): boolean;
    requestCancellation(): Promise<IOrder>;
    requestRefund(): Promise<IOrder>;
}