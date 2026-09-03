"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPaymobIframeUrl = exports.paymentServices = exports.handlePaymobWebhook = exports.getPaymentKey = exports.createOrder = exports.getAuthToken = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = require("../utils/AppError");
const Responses_1 = require("../utils/Responses");
const payment_model_1 = require("../models/payment.model");
const payment_services_1 = require("../services/payment.services");
const logger_1 = __importDefault(require("../utils/logger"));
const paymobBaseUrl = process.env.PAYMOB_BASE_URL;
const paymobApiKey = process.env.PAYMOB_API_KEY;
const paymobIntegrationId = process.env.PAYMOB_INTEGRATION_ID;
const PaymobHmackey = process.env.PAYMOB_HMAC_KEY;
const IframeId = process.env.PAYMOB_IFRAME_ID;
const HMAC_FIELD_ORDERS = [
    "amounts_cents",
    "created_at",
    "currency",
    "error_occured",
    "has_parent_transaction",
    "id",
    "integration_id",
    "is_3d_secure",
    "is_auth",
    "is_capture",
    "is_refunded",
    "is_standalone_payment",
    "is_voided",
    "order.id",
    "owner",
    "pending",
    "source_data.pan",
    "source_data.sub_type",
    "source_data.type",
    "success"
];
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
function verifypaymobHMAC(data, hmac) {
    const connected = HMAC_FIELD_ORDERS.map(field => String(getNestedValue(data, field))).join('');
    const computedHmac = crypto_1.default.createHmac('sha512', PaymobHmackey).update(connected).digest('hex');
    return computedHmac === hmac;
}
const getAuthToken = async () => {
    try {
        const response = await axios_1.default.post(`${paymobBaseUrl}api/auth/tokens`, {
            api_key: paymobApiKey,
        });
        return response.data.token;
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            throw error;
        throw new AppError_1.AppError(500, "Failed to get auth token from Paymob");
    }
};
exports.getAuthToken = getAuthToken;
const createOrder = async (authToken, amount, products) => {
    try {
        const items = products.map((product) => {
            const price = Number(product.price);
            const quantity = Number(product.quantity);
            if (isNaN(price) || isNaN(quantity)) {
                throw new AppError_1.AppError(400, `Invalid price or quantity for product ${product.name}`);
            }
            return {
                name: product.name,
                amount_cents: Math.round(price * 100),
                description: product.description || "",
                quantity: quantity,
            };
        });
        const response = await axios_1.default.post(`${paymobBaseUrl}api/ecommerce/orders`, {
            auth_token: authToken,
            delivery_needed: false,
            amount_cents: Math.round(amount * 100),
            currency: "EGP",
            items,
        });
        logger_1.default.info(`Order created in Paymob with ID: ${response.data.id}`);
        return response.data.id;
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            throw error;
        throw new AppError_1.AppError(500, "Failed to create order in Paymob");
    }
};
exports.createOrder = createOrder;
const getPaymentKey = async (authToken, orderId, amount, billingData) => {
    try {
        const response = await axios_1.default.post(`${paymobBaseUrl}api/acceptance/payment_keys`, {
            auth_token: authToken,
            amount_cents: Math.round(amount * 100),
            expiration: 3600,
            order_id: orderId,
            billing_data: {
                first_name: billingData.firstName,
                last_name: billingData.lastName,
                email: billingData.email,
                phone_number: billingData.phoneNumber,
                apartment: billingData.apartment || "",
                floor: billingData.floor || "",
                street: billingData.street || "",
                building: billingData.building || "",
                city: billingData.city || "",
                state: billingData.state || "",
                country: billingData.country || "",
                postal_code: billingData.postalCode || "",
            },
            currency: "EGP",
            integration_id: paymobIntegrationId,
        });
        logger_1.default.info(`Payment key generated in Paymob for order ID: ${orderId}`);
        return response.data.token;
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            throw error;
        throw new AppError_1.AppError(500, "Failed to get payment key from Paymob");
    }
};
exports.getPaymentKey = getPaymentKey;
const buildPaymobIframeUrl = (paymentKey) => {
    return `${paymobBaseUrl}api/acceptance/iframes/${IframeId}?payment_token=${paymentKey}`;
};
exports.buildPaymobIframeUrl = buildPaymobIframeUrl;
const paymentServices = new payment_services_1.PaymentService(payment_model_1.Payment, {
    getAuthToken,
    createOrder,
    getPaymentKey,
    buildPaymobIframeUrl
});
exports.paymentServices = paymentServices;
const handlePaymobWebhook = async (req, res) => {
    try {
        const hmac = req.query.hmac;
        const transaction = req.body.obj;
        if (!hmac || !verifypaymobHMAC(transaction, hmac)) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Invalid HMAC signature");
        }
        const result = await paymentServices.handlePaymobTransction(transaction);
        if (!result)
            return (0, Responses_1.sendErrorResponse)(res, 404, "Payment not found for the given Paymob order ID");
        logger_1.default.info(`Payment processed successfully for Paymob order ID: ${transaction.order.id}`);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Payment processed successfully", result);
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.handlePaymobWebhook = handlePaymobWebhook;
//# sourceMappingURL=payment.controller.js.map