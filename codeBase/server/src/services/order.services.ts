import Order from "../models/orderModel";
import Product from "../models/productModel";
import Customer from "../models/customerModel";
import {
  IOrder,
  OrderStatus,
  PaymentStatus,
  IOrderItem,
} from "../types/order.type";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";
import { initializeRedisClient } from "../config/client";
import { cartkeyUserById, cartkeyById } from "../utils/keys";

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
interface CartItemCache {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

const TAX_RATE = 0.14; // 14% tax rate

export class OrderService {
  constructor(
    private order: typeof Order,
    private product: typeof Product,
  ) {}

  async placeOrder(input: placeOrderInput): Promise<IOrder> {
    const customerId = input.customerId
    const client = await initializeRedisClient();
    const userCartKey = cartkeyUserById(customerId);
    const cartRaw = await client.get(userCartKey);
    const customer = await Customer.findById(customerId)
    if (!cartRaw) throw new AppError(400, "Cart is empty");
    if(!customer) throw new AppError(404, "Customer not found");

    let cartItems: CartItemCache[] = [];
    let cartKeyToDelete: string | null = null;

    try {
      const parsed = JSON.parse(cartRaw);
      if (Array.isArray(parsed)) {
        cartItems = parsed;
      } else if (parsed && Array.isArray(parsed.items)) {
        cartItems = parsed.items;
      }
    } catch {
      const cartKey = cartkeyById(cartRaw);
      cartKeyToDelete = cartKey;
      const cartData = await client.get(cartKey);
      if (cartData) {
        try {
          const parsed = JSON.parse(cartData);
          if (Array.isArray(parsed)) {
            cartItems = parsed;
          } else if (parsed && Array.isArray(parsed.items)) {
            cartItems = parsed.items;
          }
        } catch (e) {
          console.error("Failed to parse cartData:", e);
        }
      }
    }

    if (!cartItems || cartItems.length === 0)
      throw new AppError(400, "Cart is empty");

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const orderItems: IOrderItem[] = [];
      let subtotal = 0;
      let totalDiscount = 0;

      for (const i of cartItems) {
        const product = await this.product
          .findById(i.productId)
          .session(session);
        if (!product)
          throw new AppError(404, `Product with ID ${i.productId} not found`);
        if (product.stock < i.quantity)
          throw new AppError(
            400,
            `out of stock for product ${product.productName}`,
          );
        const originalPrice = product.price;
        const unitPrice =
          originalPrice - (originalPrice * product.discount) / 100;
        const itemSubtotal = unitPrice * i.quantity;
        const itemDiscount = (originalPrice - unitPrice) * i.quantity;

        subtotal += itemSubtotal;
        totalDiscount += itemDiscount;
        orderItems.push({
          product: product._id,
          quantity: i.quantity,
          unitPrice,
          subtotal: itemSubtotal,
        });
        product.stock -= i.quantity;
        await product.save({ session });
      }
      const shippingFee = subtotal > 1500 ? 0 : subtotal * 100;
      const taxAmount = subtotal * TAX_RATE;
      const totalAmount = subtotal + shippingFee + taxAmount;

      const order = new this.order({
        customer: input.customerId,
        orderItems,
        subTotal: subtotal,
        discount: totalDiscount,
        shippingFee: shippingFee,
        taxAmount,
        totalAmount,
        paymentStatus: PaymentStatus.pending,
        paymentMethod: {
          method: input.paymentMethod,
          details: input.shippingAddress,
        },
        orderStatus: OrderStatus.pending,
        notes: input.notes || "",
        Address: input.Address,
        
      });
      await order.save({ session });

      await Customer.findByIdAndUpdate(
        customerId,
        {$push: {orders: order._id}},
        {session}
      )
      await session.commitTransaction();
      try {
        const keysToDelete = [userCartKey];
        if (cartKeyToDelete) keysToDelete.push(cartKeyToDelete);
        await Promise.all(keysToDelete.map((k) => client.del(k)));
      } catch (cacherror) {
        console.error("Error clearing cart cache:", cacherror);
      }
      return order;
    } catch (error) {
      await session.abortTransaction();
      console.error("Error placing order:", error);
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Internal Server Error");
    } finally {
      session.endSession();
    }
  }
}
