import Seller from "../models/sellerModel";
import User from "../models/userModel";
import Product from "../models/productModel";
import Order from "../models/orderModel";
import { AdminService } from "./admin.services";
import { AppError } from "../utils/AppError";
import type { OrderStatus } from "../types/order.type";
import { SellerApplyApplicantTemplate } from "../templates/SellerApplyApplicant";
import type {AvgOrderValueResponse} from "../types/seller.typs";
import { PaymentStatus } from "../types/payment.type";
import { Platform } from "../models/paltformConfigSetting";


export const SellerServices = {
  ApplyAsPartner: async (sellerData: any, userId: string) => {
    const userModel = Seller.db.model("User");
    const user = await userModel.findById(userId);

    if (!user) throw new AppError(404, "User not found");
    if (user.role === "seller")
      throw new AppError(400, "User is already a seller");

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
    try {
      await SellerApplyApplicantTemplate(
        user.email,
        user.FirstName,
        sellerData.storeName,
      );
    } catch (err) {
      console.error("Error sending email to applicant:", err);
    }
    return SaveSellerData;
  },
  checkExistingSeller: async (userId: string) => {
    const user = await User.findById(userId);
    console.log("user:", user);
    if (!user) throw new AppError(404, "user not found");
    const existingSeller = await Seller.findOne({ user: user._id });
    if (existingSeller)
      throw new AppError(400, "User has already applied to be a seller");
    return existingSeller;
  },
  setupStore: async (storeData: any, sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        throw new AppError(404, "Seller not found");
      }
      if (seller.applicantStatus !== "approved") {
        throw new AppError(403, "Seller is not approved to set up a store");
      }
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
      console.log(error);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTotalProductsBySeller: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) throw new AppError(404, "Seller not found");
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
      if (!seller) throw new AppError(404, "Seller not found");
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
    if (!seller) throw new AppError(404, "Seller not found");
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
      if (!seller) throw new AppError(404, "Seller not found");
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
      if (!seller) throw new AppError(404, "Seller not found");
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
      if (!seller || seller.role !== "seller")
        throw new AppError(
          403,
          "Forbidden, You are not authorized to access this resource",
        );
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
      if (!seller) throw new AppError(404, "Seller not found");
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
     if (!seller) throw new AppError(404, "seller not found");
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
      if (!seller) throw new AppError(404, "Seller not found");
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
      if(!seller) throw new AppError(404, "Seller not found");
      const store = await Seller.find().populate("storeManagement", "storeLogo storeBanner storeDescription storeType storephysicalAddress storeOnlineAddress ").populate("products", "productName price discount stock imageUrl category brand");
      console.log("store:", store);
      return store;
    }catch(error){
      if (error instanceof AppError) throw new AppError(error.statusCode, error.message)
      throw new AppError(500, "Internal Server Error")
    }
  }
};
