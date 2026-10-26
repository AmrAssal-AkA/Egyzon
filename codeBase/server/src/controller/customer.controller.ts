import { Request, Response } from "express";
import mongoose from "mongoose";


import { AppError } from "../utils/AppError";
import User from "../models/userModel";
import Customer from "../models/customerModel";
import Order from "../models/orderModel";
import { hashPassword, comparePasswords } from "../utils/password.ustils";
import changePasswordTemplate from "../templates/changePasswordTemp";
import { sendSuccessResponse, sendErrorResponse } from "../utils/Responses";
import logger from "../utils/logger";


export const CustomerController = {
  changePassword: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) return sendErrorResponse(res, 401, "Unauthorized");
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const user = await User.findById(userId);
      if (!user) return sendErrorResponse(res, 404, "User not found");
       {/* see the user password correct or non correct */}
      const isCurrentPasswordCorrect = await comparePasswords(currentPassword, user.password);
      if (!isCurrentPasswordCorrect) return sendErrorResponse(res, 400, "Current password is incorrect");
      {/*. new password */}
      if (newPassword !== confirmPassword) return sendErrorResponse(res, 400, "New password and confirm password do not match");

      const newHashedPassword = await hashPassword(newPassword);

      user.password = newHashedPassword;
      await user.save();
      try {
        changePasswordTemplate(user.email, user.FirstName);
      } catch (err) {
        logger.error("Error sending password change email:", err);
      }
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
  getTotalSpend: async (req: Request, res: Response) => {
    try{
    const isUser = req.user?.userId;
    if(!isUser) return;
      const totalSpent = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(isUser) } },
        { $unwind: "$orders" },
        {
          $lookup: {
            from: "orders",
            localField: "orders",
            foreignField: "_id",
            as: "orderDetails"
          }
        },
        { $unwind: "$orderDetails" },
        {
          $group: {
            _id: null,
            totalSpent: { $sum: "$orderDetails.totalAmount" }
          }
        }
      ]);
      const totalAmountSpent = totalSpent.length > 0 ? totalSpent[0].totalSpent : 0;
      return sendSuccessResponse(res, 200, "Total amount spent retrieved successfully", { totalAmountSpent });
    }catch(error){
      if(error instanceof AppError) return sendErrorResponse(res,error.statusCode,error.status ,error.message);
      return sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
};
