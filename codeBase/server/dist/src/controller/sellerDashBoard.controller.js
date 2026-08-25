"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerDashboard = void 0;
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const Responses_1 = require("../utils/Responses");
exports.sellerDashboard = {
    salesPerformance: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                return (0, Responses_1.sendErrorResponse)(res, 404, "Seller not found");
            const totalOrders = await orderModel_1.default.countDocuments({ seller: sellerId });
            const totalRevenue = await orderModel_1.default.aggregate([
                { $match: { seller: sellerId } },
                { $group: { _id: null, total: { $sum: "$totalPrice" } } }
            ]);
            const revenue = totalRevenue[0]?.total || 0;
            const io = req.app.get("io");
            io.emit("salesPerformanceUpdate", { sellerId, totalOrders, revenue });
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Sales performance fetched successfully", {
                totalOrders,
                revenue
            });
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
        }
    }
};
//# sourceMappingURL=sellerDashBoard.controller.js.map