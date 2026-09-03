import Order from "../models/orderModel";
import Product from "../models/productModel";
import { IOrder } from "../types/order.type";
import { PaymentService } from "./payment.services";
interface placeOrderInput {
    customerId: string;
    paymentMethod: "cashOnDelivery" | "creditCard";
    shippingAddress: string;
    notes?: string;
    address: {
        address1: string;
        address2?: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    billingData?: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        apartment?: string;
        floor?: string;
        street?: string;
        building?: string;
        city?: string;
        state?: string;
        country?: string;
        postalCode?: string;
    };
}
export declare class OrderService {
    private order;
    private product;
    private paymentService;
    constructor(order: typeof Order, product: typeof Product, paymentService?: PaymentService);
    placeOrder(input: placeOrderInput): Promise<{
        order: IOrder;
        paymentUrl?: string;
    }>;
}
export {};
//# sourceMappingURL=order.services.d.ts.map