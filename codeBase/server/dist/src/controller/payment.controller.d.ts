import type { Request, Response } from "express";
import { PaymentService } from "../services/payment.services";
declare const getAuthToken: () => Promise<any>;
declare const createOrder: (authToken: string, amount: number, products: any[]) => Promise<any>;
declare const getPaymentKey: (authToken: string, orderId: string, amount: number, billingData: any) => Promise<any>;
declare const buildPaymobIframeUrl: (paymentKey: string) => string;
declare const paymentServices: PaymentService;
declare const handlePaymobWebhook: (req: Request, res: Response) => Promise<void>;
export { getAuthToken, createOrder, getPaymentKey, handlePaymobWebhook, paymentServices, buildPaymobIframeUrl };
//# sourceMappingURL=payment.controller.d.ts.map