import Seller from "../models/sellerModel";
import User from "../models/userModel";
import Product from "../models/productModel";
import Order from "../models/orderModel";
import { AdminService } from "./admin.services";
import { AppError } from "../utils/AppError";
import { SellerApplyApplicantTemplate } from "../templates/SellerApplyApplicant";

export const SellerServices = {
  ApplyAsPartner: async (sellerData: any, userId: string) => {
      const userModel = Seller.db.model("User");
      const user = await userModel.findById(userId);

      if (!user) throw new AppError(404, "User not found");
      if (user.role === "seller") throw new AppError(400, "User is already a seller");


      const SaveSellerData = await userModel.collection.findOneAndUpdate({ _id: user._id }, {
        $set: {
          role: "seller",
        storeName: sellerData.storeName,
        commercialRegisterNumber: sellerData.commercialRegisterNumber,
        taxCardNumber: sellerData.taxCardNumber,
        sellerDocuments: sellerData.sellerDocuments,
        applicantStatus: "pending",
        }
      },
      {returnDocument: "after"}
    );
    console.log("SaveSellerData:", SaveSellerData);
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
    if(!user) throw new AppError(404,"user not found");
    const existingSeller = await Seller.findOne({ user: user._id });
    if (existingSeller) throw new AppError(400, "User has already applied to be a seller");
    return existingSeller;
  },
  setupStore: async (storeData: any, userId: string) => {
    try {
      const seller = await Seller.findOne({ user: userId });
      if (!seller) {
        throw new AppError(404, "Seller not found");
      }
      if (seller.applicantStatus !== "approved") {
        throw new AppError(403, "Seller is not approved to set up a store");
      }
      const {
        storeLogo,
        storeBanner,
        storeDescription,
        storeType,
        storephysicalAddress,
        storeOnlineAddress,
      } = storeData;
      seller.storeManagement = {
        storeLogo,
        storeBanner,
        storeDescription,
        storeType,
        storephysicalAddress,
        storeOnlineAddress,
      };
      await seller.save();

      return seller;
    } catch (error) {
      console.log(error);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTotalProductsBySeller: async (sellerId: string) => {
     try {
       const seller = await Seller.findById(sellerId);
       if (!seller) throw new AppError(404, "Seller not found");
       const totalProductCounts = await Product.countDocuments({ sellerId: seller.id });
       return{ totalProductCounts };
     }catch(error){
       if (error instanceof AppError){
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
      const totalOrders = await Order.countDocuments({ "orderItems.product": { $in: productIds } });
      return { totalOrders };
    }catch(error){
      if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTotalRevenue: async (sellerId: string) => {
    const seller = await Seller.findById(sellerId);
    if(!seller) throw new AppError(404, "Seller not found");
    const getPlatformFee = await AdminService.getPlatformFee();
    try {
      const getProducts = await Product.find({ sellerId: seller.id });
      const productIds = getProducts.map((product) => product._id.toString());
      const orders = await Order.find({ "orderItems.product": { $in: productIds } });
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
      const PlatformFee = ( subRevenue *  platformFeePercentage) / 100;
      const totalRevenue = subRevenue - PlatformFee;
      return { totalRevenue };
    }catch(error){
      if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTopProductsByRevenue: async (sellerId: string, limit: number = 5) => {
     try {
      const seller = await Seller.findById(sellerId);
      if (!seller) throw new AppError(404, "Seller not found");
      const getProducts = await Product.find({ sellerId: seller.id });
      const productIds = getProducts.map((product) => product._id.toString());
      const orders = await Order.find({ "orderItems.product": { $in: productIds } });
      const revenueMap: Record<string, number> = {};
      orders.forEach((order) => {
        order.orderItems.forEach((item) => {
          if (productIds.includes(item.product.toString())) {
            revenueMap[item.product.toString()] = (revenueMap[item.product.toString()] || 0) + item.unitPrice * item.quantity;
          }
        });
      });
      const topProducts = Object.entries(revenueMap)
        .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
        .slice(0, limit)
        .map(([productId, revenue]) => ({
          productId,
          revenue,
        }));
      return topProducts;
     }catch(error){
       if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
        throw new AppError(500, "Internal Server Error");
     }
  },
  getAllOrders: async (sellerId: string) => {
     try {
        const seller = await Seller.findById(sellerId);
        if (!seller) throw new AppError(404, "Seller not found");
        const getProducts = await Product.find({ sellerId: seller.id }).lean();
        const productIds = getProducts.map((product) => product._id.toString());
        const orders = await Order.find({ "orderItems.product": { $in: productIds } });
        return orders;
     }catch(error){
       if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
       throw new AppError(500, "Internal Server error")
     }
  },
  totalInventoryValue: async (sellerId: string) => {
      try {
          const seller = await Seller.findById(sellerId);
          if(!seller || seller.role !== "seller") throw new AppError(403, "Forbidden, You are not authorized to access this resource");
          const products = await Product.find({ sellerId: seller.id });
          const totalInventoryValue = products.reduce((total, product) => {
              return total + (product.price * (product.stock || 0));
          }, 0);
          return { totalInventoryValue };
      }catch(error){
        if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
        throw new AppError(500, "internal Server Error");
      }
  }
};
