import Order from "../models/orderModel";
import Product from "../models/productModel";
import Customer from "../models/customerModel";
import { IOrder, OrderStatus, IOrderItem } from "../types/order.type";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";
import { initializeRedisClient } from "../config/client";
import { cartkeyUserById, cartkeyById } from "../utils/keys";
import { PaymentStatus } from "../types/payment.type";
import { PaymentService } from "./payment.services";
import { paymentServices } from "../controller/payment.controller";
import { InventoryServices } from "./Inventory.services";

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

interface CartItemCache {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

// const TAX_RATE = 0.14; // 14% tax rate

export class OrderService {
  constructor(
    private order: typeof Order,
    private product: typeof Product,
    private paymentService: PaymentService = paymentServices,
  ) {}

  async placeOrder(
    input: placeOrderInput,
  ): Promise<{ order: IOrder; paymentUrl?: string }> {
    const customerId = input.customerId;
    const client = await initializeRedisClient();
    const userCartKey = cartkeyUserById(customerId);
    const cartRaw = await client.get(userCartKey);
    const customer = await Customer.findById(customerId);
    if (!cartRaw) throw new AppError(400, "Cart is empty");
    if (!customer) throw new AppError(404, "Customer not found");

    let cartItems: CartItemCache[] = [];
    let cartKeyToDelete: string | null = null;

    try {
      const parsed = JSON.parse(cartRaw);
      if (Array.isArray(parsed)) cartItems = parsed;
      else if (parsed && Array.isArray(parsed.items)) cartItems = parsed.items;
    } catch {
      const cartKey = cartkeyById(cartRaw);
      cartKeyToDelete = cartKey;
      const cartData = await client.get(cartKey);
      if (cartData) {
        try {
          const parsed = JSON.parse(cartData);
          if (Array.isArray(parsed)) cartItems = parsed;
          else if (parsed && Array.isArray(parsed.items))
            cartItems = parsed.items;
        } catch (e) {
          console.error("Failed to parse cartData:", e);
        }
      }
    }

    if (!cartItems || cartItems.length === 0)
      throw new AppError(400, "Cart is empty");

    {
      /*1. DB Transaction  */
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    let order: IOrder;
    let paymobProuducts: {
      name: string;
      price: number;
      quantity: number;
      description: string;
    }[] = [];
    let totalAmount = 0;

    try {
      const orderItems: IOrderItem[] = [];
      let subtotal = 0;
      let totalDiscount = 0;

      for (const i of cartItems) {
        const product = await this.product
          .findById(i.productId)
          .session(session);
          // Check if the product exists and has sufficient stock
        if (!product)
          throw new AppError(404, `Product with ID ${i.productId} not found`);
        if (product.stock < i.quantity || product.stock <= 0){
          throw new AppError(
            400,
            `out of stock for product ${product.productName}`,
          );
        }
        // Check if the product price is valid
        if (product.price <= 0) throw new AppError(400, `Invalid price for product ${product.productName}`);

        const unitPrice = product.price;
        const itemSubtotal = unitPrice * i.quantity;
        const itemDiscount = product.discount
          ? (unitPrice * product.discount * i.quantity) / 100
          : 0;
        const itemTotal = itemSubtotal - itemDiscount;

        subtotal += itemSubtotal;
        totalDiscount += itemDiscount;
        orderItems.push({
          product: product._id,
          seller: product.sellerId,
          quantity: i.quantity,
          unitPrice,
          discount: itemDiscount,
          total: itemTotal,
        });
        paymobProuducts.push({
          name: product.productName,
          price: itemTotal,
          quantity: i.quantity,
          description: product.productDescription || "",
        });
        // Adjust stock and save product
        for (const item of orderItems) {
          await InventoryServices.adjustStock(item.product.toString(), -item.quantity);
        }
        await product.save({ session });
        await InventoryServices.notifyLowStock(product);
      }

      const shippingFee = subtotal > 0 ? 10 : 0;
      const taxAmount = 0;
      totalAmount = subtotal - totalDiscount + shippingFee + taxAmount;
      order = new this.order({
        customer: input.customerId,
        orderItems,
        subTotal: subtotal,
        discount: totalDiscount,
        shippingFee,
        taxAmount,
        totalAmount,
        paymentStatus: PaymentStatus.pending,
        paymentMethod: {
          method: input.paymentMethod,
          details: input.shippingAddress,
        },
        orderStatus: OrderStatus.pending,
        notes: input.notes || "",
        address: input.address,
      });
      await order.save({ session });

      await Customer.findByIdAndUpdate(
        customerId,
        { $push: { orders: order._id } },
        { session },
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Internal Server Error");
    } finally {
      session.endSession();
    }

    // Clear the cart cache after successful order placement
    try {
      const keysToDelete = [userCartKey];
      if (cartKeyToDelete) keysToDelete.push(cartKeyToDelete);
      await Promise.all(keysToDelete.map((k) => client.del(k)));
    } catch (cacherror) {
      console.error("Error clearing cart cache:", cacherror);
    }

    if (input.paymentMethod === "cashOnDelivery") {
      const payment = await this.paymentService.createCodPayment({
        amount: totalAmount,
      });
      order.payment = payment._id;
      await order.save();
      return { order };
    }

    if (input.paymentMethod === "creditCard") {
      if (!input.billingData)
        throw new AppError(
          400,
          "Billing data is required for credit card payment",
        );

      const paymobBillingData = {
        firstName: input.billingData.firstName,
        lastName: input.billingData.lastName,
        email: input.billingData.email,
        phoneNumber: input.billingData.phoneNumber,
        apartment: "NA",
        floor: "NA",
        street: input.address.address1,
        building: input.address.address2 || "NA",
        city: input.address.city,
        state: input.address.state,
        country: input.address.country,
        postalCode: input.address.postalCode,
      };

      const { paymentDoc, paymentUrl } =
        await this.paymentService.initializePayment({
          orderMongoId: order._id.toString(),
          amount: totalAmount,
          billingData: paymobBillingData,
          products: paymobProuducts,
        });

      order.payment = paymentDoc._id;
      await order.save();
      return { order, paymentUrl };
    }

    throw new AppError(400, "Invalid payment method");
  }
}
