import Seller from "../models/sellerModel";
import User from "../models/userModel";
import Product from "../models/productModel";
import Order from "../models/orderModel";
import { AdminService } from "./admin.services";
import { AppError } from "../utils/AppError";
import type { OrderStatus } from "../types/order.type";
import type {AvgOrderValueResponse} from "../types/seller.typs";
import { PaymentStatus } from "../types/payment.type";
import { encrypt , dycrypt} from "../utils/encryption";
import {addBankAccountInput, addBankAccountSchema} from "../validators/seller.validate"
import { BankAccountStatus } from "../types/wallet.types";
import logger from "../utils/logger";


export const SellerServices = {
  ApplyAsPartner: async (sellerData: any, userId: string)=> {
    try {
    const userModel = Seller.db.model("User");
    const user = await userModel.findById(userId);

    if (!user) return null;
    if(user.role === "seller") throw new AppError(400, "User is already a seller");

    const SaveSellerData = await userModel.collection.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          role: "seller",
          storeName: sellerData.storeName,
          commercialRegisterNumber: sellerData.commercialRegisterNumber,
          taxCardNumber: sellerData.taxCardNumber,
          sellerDocuments: sellerData.sellerDocuments,
          applicantStatus: "pending",
        },
      },
      { returnDocument: "after" },
    );
    return SaveSellerData;
  }catch(error){
      if (error instanceof AppError) {
        logger.error(`error in applying as a seller ${error.message}`);
        throw error;
      }
      if((error as any).code === 11000){
        logger.warn(`Duplicate key error while applying as a seller: ${JSON.stringify((error as any).keyValue)}`);
        throw new AppError(409, "his Commercial Register or Tax Card number is already registered");
      }
    logger.error(`Unexpected error in applying as a seller: ${error}`);
    throw new AppError(500, "Internal Server Error");
  }
  },
  checkExistingSeller: async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "user not found");
    const existingSeller = await Seller.findOne({ user: user._id });
    if (existingSeller)
      throw new AppError(400, "User has already applied to be a seller");
    return existingSeller;
  },
  setupStore: async (storeData: any, sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) throw new AppError(404, "Seller not found");
      if (seller.applicantStatus !== "approved")
        throw new AppError(403, "Your application has not been approved yet");
      const updatedSeller = await Seller.findByIdAndUpdate(
        sellerId,
        {
          $set: {
            storeManagement: storeData.storeManagement,
          },
        },
        { new: true },
      );
      if (!updatedSeller) {
        throw new AppError(500, "Failed to update seller store information");
      }
      return updatedSeller;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError (500, "Invalid server error");
    }
  },
  getTotalProductsBySeller: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) return;
      const totalProductCounts = await Product.countDocuments({
        sellerId: seller.id,
      });
      return { totalProductCounts };
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTotalOrder: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) return;
      const getProducts = await Product.find({ sellerId: seller.id });
      const productIds = getProducts.map((product) => product._id);
      const totalOrders = await Order.countDocuments({
        "orderItems.product": { $in: productIds },
      });
      return { totalOrders };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTotalRevenue: async (sellerId: string, options?: {minAgeDays?: number}) => {
    const seller = await Seller.findById(sellerId);
    if (!seller) return;
    const getPlatformFee = await AdminService.getPlatformFee();
    try {
      const getProducts = await Product.find({ sellerId: seller.id });
      const productIds = getProducts.map((product) => product._id.toString());
      const orderQuery: any = {
         paymentStatus: PaymentStatus.paid,
        "orderItems.product": {$in: productIds}
      }
      if(options?.minAgeDays){
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - options.minAgeDays);
        orderQuery.createdAt = {$lte: cutOffDate}
      }

      const orders = await Order.find(orderQuery);
      const subRevenue = orders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
          if (productIds.includes(item.product.toString())) {
            return orderSum + item.unitPrice * item.quantity;
          }
          return orderSum;
        }, 0);
        return total + orderTotal;
      }, 0);

      const platformFeePercentage = getPlatformFee.PlatformFeePercentage;
      const PlatformFee = (subRevenue * platformFeePercentage) / 100;
      const totalRevenue = subRevenue - PlatformFee;

      return { totalRevenue };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTopProductsByRevenue: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) return;
      const getProducts = await Product.find({ sellerId: seller.id });
      const productIds = getProducts.map((product) => product._id.toString());
      const orders = await Order.find({
        "orderItems.product": { $in: productIds },
      });
      const productRevenueMap: { [key: string]: number } = {};
      const productSalesMap: { [key: string]: number } = {};
      orders.forEach((order) => {
        order.orderItems.forEach((item) => {
          if (productIds.includes(item.product.toString())) {
            const productId = item.product.toString();
            const revenue = item.unitPrice * item.quantity;
            productRevenueMap[productId] =
              (productRevenueMap[productId] || 0) + revenue;
            productSalesMap[productId] =
              (productSalesMap[productId] || 0) + item.quantity;
          }
        });
      });

      const topProducts = Object.entries(productRevenueMap)
        .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
        .slice(0, 5)
        .map(([productId, revenue]) => {
          const product = getProducts.find(
            (p) => p._id.toString() === productId,
          );
          return {
            productId,
            name: product?.productName ?? "Unknown product",
            image: product?.imageUrl?.[0] ?? null,
            sales: productSalesMap[productId] ?? 0,
            revenue,
          };
        });

      return topProducts;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getAllOrders: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) return;
      const getProducts = await Product.find({ sellerId: seller.id }).lean();
      const productIds = getProducts.map((product) => product._id);
      const orders = await Order.find({
        "orderItems.product": { $in: productIds },
      }).populate("customer", "FirstName LastName email");
      return orders;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server error");
    }
  },
  totalInventoryValue: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller || seller.role !== "seller") return;
      const products = await Product.find({ sellerId: seller.id });
      const totalInventoryValue = products.reduce((total, product) => {
        return total + product.price * (product.stock || 0);
      }, 0);
      return { totalInventoryValue };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "internal Server Error");
    }
  },
  // seller should change order status from pending to process to shipped only
  changeOrderStatus: async (
    sellerId: string,
    orderId: string,
    newStatus: OrderStatus,
  ) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) return;
      const order = await Order.findById(orderId);
      if (!order) throw new AppError(404, "Order not found");
      const getProducts = await Product.find({ sellerId: seller.id });
      const productIds = getProducts.map((product) => product._id.toString());
      const orderProductIds = order.orderItems.map((item) =>
        item.product.toString(),
      );
      const isSellerProductInOrder = orderProductIds.some((productId) =>
        productIds.includes(productId),
      );
      if (!isSellerProductInOrder)
        throw new AppError(
          403,
          "Forbidden, You are not authorized to change this order status",
        );
      if (newStatus === "delivered" || newStatus === "cancelled")
        throw new AppError(
          403,
          "Forbidden, You are not authorized to change this order status",
        );
      order.orderStatus = newStatus;
      await order.save();
      return order;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  // seller should get average order value for all orders
  getAvgOrderValue: async (sellerId: string) => {
    try {
     const seller = await Seller.findById(sellerId);
     if (!seller) return;
     const getProducts = await Product.find({ sellerId: seller.id });
      const productIds = getProducts.map((product) => product._id.toString());
      const orders = await Order.find({
        paymentStatus: PaymentStatus.paid,
        "orderItems.product": { $in: productIds },
      });
      const totalRevenue = orders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
          if (productIds.includes(item.product.toString())) {
            return orderSum + item.unitPrice * item.quantity;
          }
          return orderSum;
        }, 0);
        return total + orderTotal;
      }, 0);
      const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
      const changePercent = 0;
      const message = "Average Order Value calculated successfully";
      const response: AvgOrderValueResponse = {
        success: true,
        data: {
          avgOrderValue,
          changePercent,
          message,
        },
      };
      return response;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getSalesByCategory: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) return;
      const getProducts = await Product.find({ sellerId: seller.id }).populate("category", "categoryName");
      const productIds = getProducts.map((product) => product._id.toString());
      const orders = await Order.find({
        "orderItems.product": { $in: productIds },
      });
      const categorySalesMap: { [key: string]: number } = {};
      orders.forEach((order) => {
        order.orderItems.forEach((item) => {
          if (productIds.includes(item.product.toString())) {
            const product = getProducts.find(
              (p) => p._id.toString() === item.product.toString(),
            );
            if (product && product.category) {
              const category = (product.category as any)?.categoryName;
              const revenue = item.unitPrice * item.quantity;
              categorySalesMap[category] =
                (categorySalesMap[category] || 0) + revenue;
            }
          }
        });
      });
      return categorySalesMap;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Invalid Server Error");
    }
  },
  getStoreFront: async (sellerId: string)  => {
    try {
      const seller = await Seller.findById(sellerId);
      if(!seller) return;
      const store = await Seller.find().populate("storeManagement", "storeLogo storeBanner storeDescription storeType storephysicalAddress storeOnlineAddress ").populate("products", "productName price discount stock imageUrl category brand");
      return store;
    }catch(error){
      if (error instanceof AppError) throw new AppError(error.statusCode, error.message)
      throw new AppError(500, "Internal Server Error")
    }
  },
  AddBankAccount: async (sellerId: string, rawInput: unknown) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) return;
      const input: addBankAccountInput = addBankAccountSchema.parse(rawInput);
      const last4 = input.bankCardNumber.slice(-4);
      const encryptedCardNumber = encrypt(input.bankCardNumber);

      const saveBankAccount = await Seller.findByIdAndUpdate(
        seller,
        {
          bankAccount: {
            issuer: input.issuer,
            fullName: input.fullName,
            bankCardNumber: encryptedCardNumber,
            last4,
            BankCode: input.bankCode,
            status: BankAccountStatus.PENDING_VERIFICATION
          }
        },
        {new: true, runValidators: true}
      ).select("-bankAccount.bankCardNumber")

      return saveBankAccount
    }catch(error){
      if (error instanceof AppError) throw error
      throw new AppError (500, "Internal Server Error")
    }
  },
  getBankAccoount: async (sellerId: string) => {
    try{
      const seller = await Seller.findById(sellerId).select("-bankAccount.bankCardNumber");
      if(!seller) return;
      if(!seller.bankAccount || !seller.bankAccount.last4) return null;
      return seller.bankAccount
    }catch(error){
      if (error instanceof AppError) throw error
      throw new AppError(500, "internal Server Error")
    }
  },
  removeBankAccount: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId).select('+bankAccount.bankCardNumber ');
      if (!seller) return;
     if (!seller.bankAccount || !seller.bankAccount.last4) return null;
      
     const removeBankAccount = await Seller.findByIdAndUpdate(
        seller,
        {
          $unset: { bankAccount: "" }
        },
        { new: true }
      );

      return removeBankAccount;
    }catch(error){
      if (error instanceof AppError) throw error;
      throw new AppError(500, "internal Server Error");
    }
  }
};
