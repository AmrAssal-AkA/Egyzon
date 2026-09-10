import axios from "axios";
import crypto from "crypto";
import type { Request, Response } from "express";

import { AppError } from "../utils/AppError";
import {sendErrorResponse, sendSuccessResponse} from "../utils/Responses"
import { Payment } from "../models/payment.model";
import {PaymentService} from "../services/payment.services";
import logger from "../utils/logger";

const paymobBaseUrl = process.env.PAYMOB_BASE_URL;
const paymobApiKey = process.env.PAYMOB_API_KEY;
const paymobIntegrationId = process.env.PAYMOB_INTEGRATION_ID;
const PaymobHmackey = process.env.PAYMOB_HMAC_KEY;
const IframeId = process.env.PAYMOB_IFRAME_ID;

const HMAC_FIELD_ORDERS = [
  "amount_cents",
  "created_at",
  "currency",
  "error_occured",
  "has_parent_transaction",
  "id",
  "integration_id",
  "is_3d_secure",
  "is_auction",
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

function getNestedValue(obj: any, path: string): any {
   return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
function verifypaymobHMAC(data: any, hmac: string): boolean {
  const connected = HMAC_FIELD_ORDERS.map(field => String(getNestedValue(data, field))).join('');
  const computedHmac = crypto.createHmac('sha512', PaymobHmackey!).update(connected).digest('hex');
  return computedHmac === hmac;
}

const getAuthToken = async () => {
  try {
    const response = await axios.post(`${paymobBaseUrl}api/auth/tokens`, {
      api_key: paymobApiKey,
    });
    return response.data.token;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(500, "Failed to get auth token from Paymob");
  }
};
const createOrder = async (
  authToken: string,
  amount: number,
  products: any[],
) => {
  try {
    const items = products.map((product) => {
      const price = Number(product.price);
      const quantity = Number(product.quantity);
      if (isNaN(price) || isNaN(quantity)) {
        throw new AppError(
          400,
          `Invalid price or quantity for product ${product.name}`,
        );
      }
      return {
        name: product.name,
        amount_cents: Math.round(price * 100),
        description: product.description || "",
        quantity: quantity,
      };
    });
    const response = await axios.post(`${paymobBaseUrl}api/ecommerce/orders`, {
      auth_token: authToken,
      delivery_needed: false,
      amount_cents: Math.round(amount * 100),
      currency: "EGP",
      items,
    });
    logger.info(`Order created in Paymob with ID: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(500, "Failed to create order in Paymob");
  }
};
const getPaymentKey = async (
  authToken: string,
  orderId: string,
  amount: number,
  billingData: any,
) => {
  try {
    const response = await axios.post(
      `${paymobBaseUrl}api/acceptance/payment_keys`,
      {
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
      },
    );
    logger.info(`Payment key generated in Paymob for order ID: ${orderId}`);
    return response.data.token;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(500, "Failed to get payment key from Paymob");
  }
};

const buildPaymobIframeUrl = (paymentKey: string) => {
  return `${paymobBaseUrl}api/acceptance/iframes/${IframeId}?payment_token=${paymentKey}`;
}
const paymentServices = new PaymentService(Payment, {
  getAuthToken,
  createOrder,
  getPaymentKey,
  buildPaymobIframeUrl
});

const handlePaymobWebhook = async (req: Request, res: Response) => {
  try {
    const hmac = req.query.hmac as string;
    const transaction = req.body.obj;
    if(!hmac || !verifypaymobHMAC(transaction, hmac)) {
      return sendErrorResponse(res, 400, "Invalid HMAC signature");
    }
    const result = await paymentServices.handlePaymobTransction(transaction);
    if(!result) return sendErrorResponse(res, 404, "Payment not found for the given Paymob order ID");
    logger.info(`Payment processed successfully for Paymob order ID: ${transaction.order.id}`);
    return sendSuccessResponse(res, 200, "Payment processed successfully", result);
  }catch(error){
     if (error instanceof AppError) {
      return sendErrorResponse(res, error.statusCode, error.message);
    }
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
}



export { getAuthToken, createOrder, getPaymentKey, handlePaymobWebhook, paymentServices, buildPaymobIframeUrl };
