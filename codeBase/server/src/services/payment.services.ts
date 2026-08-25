import { Payment } from "../models/payment.model";
import { AppError } from "../utils/AppError";
import { PaymentStatus } from "../types/payment.type";
import { OrderStatus } from "../types/order.type";
import Order from "../models/orderModel";

export class PaymentService {
  constructor(
    private payment: typeof Payment,
    private paymobClient: {
      getAuthToken: () => Promise<string>;
      createOrder: (
        authToken: string,
        amount: number,
        products: any[],
      ) => Promise<string>;
      getPaymentKey: (
        authToken: string,
        paymobOrderId: string,
        amount: number,
        billingData: any,
      ) => Promise<string>;
      buildPaymobIframeUrl: (paymentKey: string) => string;
    },
  ) {}
  async initializePayment(params: {
    orderMongoId: string;
    amount: number;
    products: any[];
    billingData: any;
  }) {
    const authToken = await this.paymobClient.getAuthToken();
    const paymobOrderId = Number(
      await this.paymobClient.createOrder(
        authToken,
        params.amount,
        params.products,
      ),
    );
    const paymentKey = await this.paymobClient.getPaymentKey(
      authToken,
      paymobOrderId.toString(),
      params.amount,
      params.billingData,
    );
    console.log("Payment initialized with Paymob order ID:", paymobOrderId);
    const paymentDoc = await this.payment.create({
      paymobOrderId,
      order: params.orderMongoId,
      amount: params.amount,
      currency: "EGP",
      paymentMethod: "creditCard",
      paymentStatus: PaymentStatus.pending,
      gateway: "paymob",
    });
    console.log("Payment document created in database:", paymentDoc);
    return {
      paymentDoc,
      paymentUrl: this.paymobClient.buildPaymobIframeUrl(paymentKey),
    };
  }
  async createCodPayment(params: { amount: number }) {
    return this.payment.create({
      amount: params.amount,
      currency: "EGP",
      paymentMethod: "cod",
      paymentStatus: PaymentStatus.pending,
      gateway: "cod",
    });
  }
  async handlePaymobTransction(transaction: any) {
    const paymobOrderId = transaction.order.id;
    const isSuccess = transaction.success === true;

    const payment = await this.payment.findOne({ paymobOrderId });
    if (!payment) {
      throw new AppError(
        404,
        "Payment not found for the given Paymob order ID",
      );
    }
    payment.transactionId = transaction.id;
    payment.paymentStatus = isSuccess
      ? PaymentStatus.paid
      : PaymentStatus.failed;
    payment.gatewayResponse = JSON.stringify(transaction);
    payment.paymentDate = new Date();
    if (transaction.source_data) {
      payment.cardLast4 = transaction.source_data.pan;
      payment.cardBrand = transaction.source_data.sub_type;
    }
    await payment.save();
    const order = await Order.findOne({ payment: payment._id });
    if (order) {
      order.paymentStatus = isSuccess
        ? PaymentStatus.paid
        : PaymentStatus.failed;
      order.orderStatus = isSuccess
        ? OrderStatus.processing
        : OrderStatus.pending;
      await order.save();
    }
    return { payment, order };
  }
}
