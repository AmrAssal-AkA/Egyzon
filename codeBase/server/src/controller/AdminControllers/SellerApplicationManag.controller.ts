import type { Request, Response } from "express";

import { sendErrorResponse, sendSuccessResponse } from "../../utils/Responses";
import { AdminService } from "../../services/admin.services";
import { SellerApplyApplovalTemplate } from "../../templates/SellerApplyApplicant";

export const ManageSellerApplicationsController = {
  getAllSellers: async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const allSellers = await AdminService.getAllSellers(
        Number(page),
        Number(limit),
      );
      return sendSuccessResponse(
        res,
        200,
        "Sellers retrieved successfully",
        allSellers,
      );
    } catch (error) {
      return sendErrorResponse(res, 500, "internal Server Error", error);
    }
  },
  getAllPendingSellerApplications: async (req: Request, res: Response) => {
    try {
      const applications = await AdminService.getAllPendingSellerApplications();
      return sendSuccessResponse(
        res,
        200,
        "Pending seller applications retrieved successfully",
        applications,
      );
    } catch (error) {
      return sendErrorResponse(
        res,
        500,
        "Internal Server Error",
        "An unexpected error occurred",
      );
    }
  },
  approveSeller: async (req: Request, res: Response) => {
    try {
      const sellerId = req.params.sellerId as string;
      if (!sellerId)
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          "Seller ID is required",
        );
      const updatedSeller = await AdminService.approveSeller(sellerId);
      await SellerApplyApplovalTemplate(
        updatedSeller.email,
        updatedSeller.FirstName,
        updatedSeller.storeName,
      );
      return sendSuccessResponse(
        res,
        200,
        "Seller approved successfully",
        updatedSeller,
      );
    } catch (error) {
      console.error("Error in approveSeller controller:", error);
      return sendErrorResponse(
        res,
        500,
        "Internal Server Error",
        "An unexpected error occurred",
      );
    }
  },
  requestAdditionalDocuments: async (req: Request, res: Response) => {
    try {
      const sellerId = req.params.sellerId as string;
      if (!sellerId)
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          "Seller ID is required",
        );
      const { message } = req.body;
      if (!message)
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          "Message is required",
        );
      const updatedSeller = await AdminService.requestAdditionalDocuments(
        sellerId,
        message,
      );
      return sendSuccessResponse(
        res,
        200,
        "Request for additional documents sent successfully",
        updatedSeller,
      );
    } catch (error) {
      return sendErrorResponse(
        res,
        500,
        "Internal Server Error",
        "An unexpected error occurred",
      );
    }
  },
  rejectseller: async (req: Request, res: Response) => {
    try {
      const sellerId = req.params.sellerId as string;
      if (!sellerId)
        return sendErrorResponse(
          res,
          400,
          "Bad Request",
          "Seller ID is required",
        );

      const updatedSeller = await AdminService.rejectSeller(sellerId);
      return sendSuccessResponse(
        res,
        200,
        "Seller rejected successfully",
        updatedSeller,
      );
    } catch (error) {
      return sendErrorResponse(
        res,
        500,
        "Internal Server Error",
        "An unexpected error occurred",
      );
    }
  },
};
