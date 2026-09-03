"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const AppError_1 = require("../utils/AppError");
const payment_type_1 = require("../types/payment.type");
const order_type_1 = require("../types/order.type");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const logger_1 = __importDefault(require("../utils/logger"));
class PaymentService {
    constructor(payment, paymobClient) {
        this.payment = payment;
        this.paymobClient = paymobClient;
    }
    async initializePayment(params) {
        const authToken = await this.paymobClient.getAuthToken();
        const paymobOrderId = Number(await this.paymobClient.createOrder(authToken, params.amount, params.products));
        const paymentKey = await this.paymobClient.getPaymentKey(authToken, paymobOrderId.toString(), params.amount, params.billingData);
        const paymentDoc = await this.payment.create({
            paymobOrderId,
            order: params.orderMongoId,
            amount: params.amount,
            currency: "EGP",
            paymentMethod: "creditCard",
            paymentStatus: payment_type_1.PaymentStatus.pending,
            gateway: "paymob",
        });
        return {
            paymentDoc,
            paymentUrl: this.paymobClient.buildPaymobIframeUrl(paymentKey),
        };
    }
    async createCodPayment(params) {
        return this.payment.create({
            amount: params.amount,
            currency: "EGP",
            paymentMethod: "cod",
            paymentStatus: payment_type_1.PaymentStatus.pending,
            gateway: "cod",
        });
    }
    async handlePaymobTransction(transaction) {
        const paymobOrderId = transaction.order.id;
        const isSuccess = transaction.success === true;
        const payment = await this.payment.findOne({ paymobOrderId });
        if (!payment) {
            throw new AppError_1.AppError(404, "Payment not found for the given Paymob order ID");
        }
        logger_1.default.info(`Handling Paymob transaction for order: ${paymobOrderId}`);
        payment.transactionId = transaction.id;
        payment.paymentStatus = isSuccess
            ? payment_type_1.PaymentStatus.paid
            : payment_type_1.PaymentStatus.failed;
        payment.gatewayResponse = JSON.stringify(transaction);
        payment.paymentDate = new Date();
        if (transaction.source_data) {
            payment.cardLast4 = transaction.source_data.pan;
            payment.cardBrand = transaction.source_data.sub_type;
        }
        logger_1.default.info(`Payment status for order ${paymobOrderId}: ${payment.paymentStatus}`);
        await payment.save();
        const order = await orderModel_1.default.findOne({ payment: payment._id });
        if (order) {
            order.paymentStatus = isSuccess
                ? payment_type_1.PaymentStatus.paid
                : payment_type_1.PaymentStatus.failed;
            order.orderStatus = isSuccess
                ? order_type_1.OrderStatus.processing
                : order_type_1.OrderStatus.pending;
            await order.save();
        }
        return { payment, order };
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.services.js.map