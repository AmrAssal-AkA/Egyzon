import { Request, Response } from "express";


import { AppError } from "../utils/AppError";
import User from "../models/userModel";
import Customer from "../models/customerModel";
import { hashPassword, comparePasswords } from "../utils/password.ustils";
import changePasswordTemplate from "../templates/changePasswordTemp";
import { sendSuccessResponse, sendErrorResponse } from "../utils/Responses";

export const CustomerController = {
  changePassword: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      const customer = await User.findById(userId);
      const { newPassword, confirmPassword } = req.body;
      if (!userId) return sendErrorResponse(res, 401, "Unauthorized");
      if (!newPassword || !confirmPassword)
        return sendErrorResponse(
          res,
          400,
          "New password and confirm password are required",
        );
      if (newPassword !== confirmPassword)
        return sendErrorResponse(res, 400, "Passwords do not match");
      if (!customer) return sendErrorResponse(res, 404, "Customer not found");

      const hashedPassword = await hashPassword(newPassword);
      customer.password = hashedPassword;

      await customer.save();
      await changePasswordTemplate(customer.email, customer.FirstName);
      return sendSuccessResponse(res, 200, "Password changed successfully");
    } catch (error) {
      if (error instanceof AppError) {
        return sendErrorResponse(res, error.statusCode, error.message);
      }
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },
  getCustomerOrderHistory: async (req: Request, res: Response) => {
     try {
        const userId = req.user?.userId || (process.env.NODE_ENV !== "production"? req.body.userId : null);
        if (!userId) return sendErrorResponse(res, 401, "Unauthorized");
        const customer = await Customer.findById(userId).populate({
          path: "orders",
          select: "orderNumber orderStatus orderDate totalAmount subTotal discount payment",
          populate: {
             path: "orderItems.product",
             select: "productName sku price imageUrl",
          }
        });
        if (!customer) return sendErrorResponse(res, 404, "Customer not found");
        return sendSuccessResponse(res, 200, "Customer order history retrieved successfully", customer);
     }catch (error) {
        if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
        return sendErrorResponse(res, 500, "Internal Server Error");
     }
  },
  getTotalOrders: async (req: Request, res: Response) => {
    try{
      const userId = req.user?.userId;
      if(!userId) return sendErrorResponse(res, 401, "Unauthorized");
      const customer = await Customer.findById(userId).populate("orders");
      if(!customer) return sendErrorResponse(res, 404, "Customer not found");
      const totalOrders = customer.orders.length;
      return sendSuccessResponse(res, 200, "Total orders retrieved successfully", { totalOrders });
    }catch (error) {
      if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  },

};
