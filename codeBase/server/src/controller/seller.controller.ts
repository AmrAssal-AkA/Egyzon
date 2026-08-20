import type { Request, Response } from "express";

import {SellerServices} from "../services//seller.services";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";


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
  }
}