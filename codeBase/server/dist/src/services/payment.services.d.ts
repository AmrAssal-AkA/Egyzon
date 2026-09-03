import { Payment } from "../models/payment.model";
export declare class PaymentService {
    private payment;
    private paymobClient;
    constructor(payment: typeof Payment, paymobClient: {
        getAuthToken: () => Promise<string>;
        createOrder: (authToken: string, amount: number, products: any[]) => Promise<string>;
        getPaymentKey: (authToken: string, paymobOrderId: string, amount: number, billingData: any) => Promise<string>;
        buildPaymobIframeUrl: (paymentKey: string) => string;
    });
    initializePayment(params: {
        orderMongoId: string;
        amount: number;
        products: any[];
        billingData: any;
    }): Promise<{
        paymentDoc: import("mongoose").Document<unknown, {}, import("../types/payment.type").IPayment, {}, import("mongoose").DefaultSchemaOptions> & import("../types/payment.type").IPayment & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        paymentUrl: string;
    }>;
    createCodPayment(params: {
        amount: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("../types/payment.type").IPayment, {}, import("mongoose").DefaultSchemaOptions> & import("../types/payment.type").IPayment & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    handlePaymobTransction(transaction: any): Promise<{
        payment: import("mongoose").Document<unknown, {}, import("../types/payment.type").IPayment, {}, import("mongoose").DefaultSchemaOptions> & import("../types/payment.type").IPayment & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        order: (import("mongoose").Document<unknown, {}, import("../types/order.type").IOrder, {}, import("mongoose").DefaultSchemaOptions> & import("../types/order.type").IOrder & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
}
//# sourceMappingURL=payment.services.d.ts.map