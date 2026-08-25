import type {Request, Response} from "express";

import Seller from "../models/sellerModel";
import { NotificationServices } from "../services/notification.services";
import Order from "../models/orderModel";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";



export const sellerDashboard = {
    salesPerformance: async (req: Request, res: Response) => {
        try {
            const sellerId = req.user?.userId;
            const seller = await Seller.findById(sellerId);
            if (!seller) return sendErrorResponse(res, 404, "Seller not found");
            const totalOrders = await Order.countDocuments({ seller: sellerId });
            const totalRevenue = await Order.aggregate([
                { $match: { seller: sellerId } },
                { $group: { _id: null, total: { $sum: "$totalPrice" } } }
            ]);
            const revenue = totalRevenue[0]?.total || 0;
            const io = req.app.get("io");
            io.emit("salesPerformanceUpdate", { sellerId, totalOrders, revenue });
            return sendSuccessResponse(res, 200, "Sales performance fetched successfully", {
                totalOrders,
                revenue
            });
        }catch(error){
            return sendErrorResponse(res, 500, "Internal Server Error", error);
        }
    }
}