import Order from "../models/orderModel";
import Product from "../models/productModel";
import { IOrder } from "../types/order.type";
interface placeOrderInput {
    customerId: string;
    paymentMethod: "cashOnDelivery" | "creditCard";
    shippingAddress: string;
    notes?: string;
    Address: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
}
export declare class OrderService {
    private order;
    private product;
    constructor(order: typeof Order, product: typeof Product);
    placeOrder(input: placeOrderInput): Promise<IOrder>;
}
export {};
//# sourceMappingURL=order.services.d.ts.map