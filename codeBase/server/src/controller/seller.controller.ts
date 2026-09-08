import type { Request, Response } from "express";

import {SellerServices} from "../services//seller.services";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";
import {AppError} from "../utils/AppError";
import {Analytical} from "../services/analytics.services";
import {getIo, isUserConnected} from "../config/socket";
import {AnalyticalDateTimeframe} from "../types/analyticalData.types"
import { addBankAccountInput, addBankAccountSchema } from "../validators/seller.validate";


export const SellerController = {
      getTotalProducts: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      const seller = req.user?.role
      if (!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const totalProducts = await SellerServices.getTotalProductsBySeller(sellerId);
      sendSuccessResponse(res, 200, "Total products fetched successfully", totalProducts);
    }catch(error){
      return sendErrorResponse(res, 500, "internal server Error")
    }
  },
  getTotalOrders: async (req: Request, res: Response) => {
    try {
        const sellerId = req.user?.userId;
      const seller = req.user?.role
      if (!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const totalOrders = await SellerServices.getTotalOrder(sellerId);
      sendSuccessResponse(res, 200, "Total orders fetched successfully", totalOrders);
    }catch(error){
        return sendErrorResponse(res, 500, "internal server Error")
    }
  },
  getTotalRevenue: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.sellerId as string : undefined);
      const seller = req.user?.role
      if (!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      console.log("sellerId:", sellerId);
      const totalRevenue = await SellerServices.getTotalRevenue(sellerId);
      sendSuccessResponse(res, 200, "Total revenue fetched successfully", totalRevenue);
    }catch(error){
        return sendErrorResponse(res, 500, "internal server Error")
    }
  },
  getTopSellingProducts: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      const seller = req.user?.role
      if (!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const topSellingProducts = await SellerServices.getTopProductsByRevenue(sellerId)
      sendSuccessResponse(res, 200, "Top selling products fetched successfully", topSellingProducts);
    }catch(error){
        return sendErrorResponse(res, 500, "internal server Error")
    }
  },
  getAllOrders: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      const seller = req.user?.role
      if (!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const allOrders = await SellerServices.getAllOrders(sellerId);
      sendSuccessResponse(res, 200, "All orders fetched successfully", allOrders);
    }catch(error){
        return sendErrorResponse(res, 500, "internal server Error")
    }
  },
  totalInventoryValue: async (req: Request, res: Response) => {
    try {
        const seller = req.user?.userId
        const role = req.user?.role
      if (!seller || role !== "seller") return sendErrorResponse(res, 403, "forbidden", " You are not authorized to access this resource");
      const totalInventory = await SellerServices.totalInventoryValue(seller);
      return sendSuccessResponse(res, 200, "total Inventory Value Fetched", totalInventory);
    }catch(error){
       return sendErrorResponse(res, 500, "internal server error")
    }
  },
  changeOrderStatus: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      const seller = req.user?.role;
      if(!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const { orderId, newStatus } = req.body;
      const updatedOrder = await SellerServices.changeOrderStatus(sellerId, orderId, newStatus);
      return sendSuccessResponse(res, 200, "Order status updated successfully", updatedOrder);
    }catch(error){
      return sendErrorResponse(res, 500, "Internal Server Error")
    }
  },
  getAvgOrderValue: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      const seller = req.user?.role;
      if(!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const avgOrderValue = await SellerServices.getAvgOrderValue(sellerId);
      return sendSuccessResponse(res, 200, "Average order value fetched successfully", avgOrderValue);
    }catch(error){
      if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.status, error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  salesPerformanceIndicator: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      const seller = req.user?.role;
      if(!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const { timeframe } = req.query as { timeframe: AnalyticalDateTimeframe };
      const validTimeframes = Object.values(AnalyticalDateTimeframe);
      const safeTimeframe = validTimeframes.includes(timeframe) ? timeframe as AnalyticalDateTimeframe : AnalyticalDateTimeframe.SEVEN_DAYS;
      const data = await Analytical.getSellerAnalytics(sellerId, safeTimeframe);
     if (isUserConnected(sellerId)) {
         getIo().to(`user-${sellerId}`).emit("sales-indicator:subscribe", data);
      }
      sendSuccessResponse(res, 200, "Sales performance indicator fetched successfully", data);
    }catch(error){
        if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.status, error.message);
        return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  getSalesByCategory: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId;
      const seller = req.user?.role;
      if(!sellerId || seller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const salesByCategory = await SellerServices.getSalesByCategory(sellerId);
      sendSuccessResponse(res, 200, "Sales by category fetched successfully", salesByCategory);
    }catch(error){
      if(error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.status, error.message);
       return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  getStoreDetails: async (req: Request, res: Response) => {
    try{
      const sellerId = req.params.sellerId as string;
      if(!sellerId) return sendErrorResponse(res, 400, "Bad Request", "Seller ID is required");
      const storeDetails = await SellerServices.getStoreFront(sellerId);
      sendSuccessResponse(res, 200, "Store details fetched successfully", storeDetails);
    }catch(error){
      if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.status, error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  AddBankAccount: async (req: Request, res: Response) => {
    try {
      const sellerId = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.sellerId as string : undefined);
      const isSeller = req.user?.role || (process.env.NODE_ENV !== "production" ? req.body.role as string : undefined);
      if(!sellerId || isSeller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const input = req.body as addBankAccountInput;
      if(!input.bankCardNumber || !input.bankCode) return sendErrorResponse(res, 400, "Bad Request", "Bank card number and bank code are required");
      const saveBankAccount = await SellerServices.AddBankAccount(sellerId, input);
      sendSuccessResponse(res, 200, "Bank account added successfully", saveBankAccount);
    }catch (error){
      if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.status, error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  getBankAccount: async (req: Request, res: Response) => {
    try {
      const isUser = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.sellerId as string : undefined);
      const isSeller = req.user?.role || (process.env.NODE_ENV !== "production" ? req.body.role as string : undefined);
      if(!isUser || isSeller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const bankAccount = await SellerServices.getBankAccoount(isUser);
      if(!bankAccount) return sendErrorResponse(res, 404, "Not Found", "Bank account not found");
      sendSuccessResponse(res, 200, "Bank account fetched successfully", bankAccount);
    }catch(error){
      if(error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.status, error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  removeBankAccount: async (req: Request, res: Response) => {
    try{
      const isUser = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.sellerId as string : undefined);
      const isSeller = req.user?.role || (process.env.NODE_ENV !== "production" ? req.body.role as string : undefined);
      if(!isUser || isSeller !== "seller") return sendErrorResponse(res, 403, "Forbidden", "You are not authorized to access this resource");
      const removedBankAccount = await SellerServices.removeBankAccount(isUser);
      sendSuccessResponse(res, 200, "Bank account removed successfully", removedBankAccount);
    }catch(error){
      if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.status, error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
}