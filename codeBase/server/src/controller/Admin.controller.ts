import type { Request, Response } from "express";

import { AdminService } from "../services/admin.services";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";
import { NotificationServices } from "../services/notification.services";
import { Analytical } from "../services/analytics.services";
import {getIo, isUserConnected} from "../config/socket";
import {AnalyticalDateTimeframe} from "../types/analyticalData.types"

export const AdminController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await AdminService.getAllUser();
      return sendSuccessResponse(
        res,
        200,
        "Users retrieved successfully",
        users,
      );
    } catch (error) {
      sendErrorResponse(res, 500, "internal server Error");
    }
  },
  promoteToAdmin: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      if (!userId) return sendErrorResponse(res, 400, "userId is required");
      const promotedUser = await AdminService.promoteToAdmin(userId);
      return sendSuccessResponse(
        res,
        200,
        "User promoted to admin successfully",
        promotedUser,
      );
    } catch (error) {
      sendErrorResponse(res, 500, "internal Server Error", error);
    }
  },
  BlockUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      if (!userId) return sendErrorResponse(res, 400, "userId is required");
      const blockedUser = await AdminService.blockUser(userId);
      return sendSuccessResponse(
        res,
        200,
        "User blocked successfully",
        blockedUser,
      );
    } catch (error) {
      return sendErrorResponse(res, 500, "internal Server Error", error);
    }
  },
  activateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      if (!userId) return sendErrorResponse(res, 400, "userId is required");
      const activateUser = await AdminService.activateUser(userId);
      return sendSuccessResponse(
        res,
        200,
        "user is back to active state",
        activateUser,
      );
    } catch (error) {
      return sendErrorResponse(res, 500, "internal Server Error", error);
    }
  },
  setPlatformFee: async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.userId;
      const role = req.user?.role;
      if (!adminId || role !== "admin")
        return sendErrorResponse(res, 403, "Unauthorized access");
      const { feePercentage, taxRate } = req.body;
      if (feePercentage === undefined)
        return sendErrorResponse(res, 400, "feePercentage is required");
      if (taxRate === undefined)
        return sendErrorResponse(res, 400, "taxRate is required");
      const updatedPlatformConfig = await AdminService.setPlatformFee(
        feePercentage,
        taxRate,
        adminId,
      );
     await NotificationServices.createNotification({
         user: adminId,
         title: "Platform Fee Updated",
         message: `The platform fee has been updated to ${feePercentage}% and tax rate to ${taxRate}%.`,
         type: "info",
     })

      return sendSuccessResponse(
        res,
        200,
        "Platform fee updated successfully",
        updatedPlatformConfig,
      );
    } catch (error) {
      return sendErrorResponse(res, 500, "internal Server Error", error);
    }
  },
  getPlatformFee: async (req: Request, res: Response) => {
    try {
      const platformConfig = await AdminService.getPlatformFee();
      return sendSuccessResponse(
        res,
        200,
        "Platform fee retrieved successfully",
        platformConfig,
      );
    } catch (error) {
      return sendErrorResponse(res, 500, "internal Server Error", error);
    }
  },
  getAllSellerActiveCounts: async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.userId;
      const role = req.user?.role;
      if (!adminId || role !== "admin")
        return sendErrorResponse(res, 403, "Unauthorized access");
      const sellerCounts = await AdminService.getAllSellerActiveCounts();
      return sendSuccessResponse(
        res,
        200,
        "Seller counts retrieved successfully",
        sellerCounts,
      );
    } catch (error) {
      return sendErrorResponse(res, 500, "internal Server Error", error);
    }
  },
  getAllSellerPendingCounts: async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.userId;
      const role = req.user?.role;
      if (!adminId || role !== "admin")
        return sendErrorResponse(res, 403, "Unauthorized access");
      const sellerCounts = await AdminService.getAllSellerPendingCounts();
      return sendSuccessResponse(
        res,
        200,
        "Seller counts retrieved successfully",
        sellerCounts,
      );
    }catch(error){
        if (error instanceof Error) return sendErrorResponse(res, 500, "internal Server Error", error.message);
        return sendErrorResponse(res, 500, "internal Server Error");
    }
  },
  getSellerProductsCategory: async (req: Request, res: Response) => {
    try{
      const adminId = req.user?.userId;
      const role = req.user?.role;
      if (!adminId || role !== "admin")
        return sendErrorResponse(res, 403, "Unauthorized access");
        const sellerProductsCategory = await AdminService.getSellerProductsCategory();
        return sendSuccessResponse(
          res,
          200,
          "Seller products category retrieved successfully",
          sellerProductsCategory,
        );
    }catch(error){
        if (error instanceof Error) return sendErrorResponse(res, 500, "internal Server Error", error.message);
        return sendErrorResponse(res, 500, "internal Server Error");
    }
  },
  getTotalRevenueInPlatform: async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.userId;
      const admin = req.user?.role;
      if (!adminId || admin !== "admin") return sendErrorResponse(res, 403, "Unauthorized access");
      const totalRevenue = await AdminService.getTotalRevenueInPlatform();
      return sendSuccessResponse(
        res,
        200,
        "Total revenue retrieved successfully",
        totalRevenue,
      );
    }catch(error){
      if (error instanceof Error) return sendErrorResponse(res, 500, "internal Server Error", error.message);
      return sendErrorResponse(res, 500, "internal Server Error");
    }
  },
  getAllOrderOnPlatform: async (req: Request, res: Response) => {
    try {
      const adminId = req.user?.userId;
      const admin = req.user?.role;
      if (!adminId || admin !== "admin") return sendErrorResponse(res, 403, "Unauthorized access");
      const {page = 1, limit = 10} = req.query;
      const getAllOrders = await AdminService.getAllOrdersOnPlatform(adminId, Number(page), Number(limit));
      return sendSuccessResponse(res, 200, "All orders retrieved successfully", getAllOrders);
    }catch(error){
      if (error instanceof Error) return sendErrorResponse(res, 500, "internal Server Error", error.message);
      return sendErrorResponse(res, 500, "internal Server Error");
    }
  },
  getPlatformRevenueGrowth: async (req: Request, res: Response) => {
    try {
    const user = req.user?.userId;
    const admin = req.user?.role;
    if (!user || admin !== 'admin') return sendErrorResponse(res, 403, "Unauthorized access");

    const { timeframe } = req.query as { timeframe: AnalyticalDateTimeframe };
    const validTimeframes = Object.values(AnalyticalDateTimeframe);
    const safeTimeframe = validTimeframes.includes(timeframe) ? timeframe : AnalyticalDateTimeframe.SEVEN_DAYS;
      const data = await Analytical.getRevenueGrowthOfPlatform(safeTimeframe);
      if(isUserConnected(user)){
        getIo().to(`user-${user}`).emit("platform-revenue:snapshot", data);
      }
      sendSuccessResponse(res, 200, "Platform revenue growth data retrieved successfully", data);
    }catch(error){
      if (error instanceof Error) return sendErrorResponse(res, 500, "internal Server Error", error.message);
      return sendErrorResponse(res, 500, "internal Server Error");
    }
  }
};
