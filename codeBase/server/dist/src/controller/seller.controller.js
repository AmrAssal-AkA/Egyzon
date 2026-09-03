"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const seller_services_1 = require("../services//seller.services");
const Responses_1 = require("../utils/Responses");
const AppError_1 = require("../utils/AppError");
const analytics_services_1 = require("../services/analytics.services");
const socket_1 = require("../config/socket");
const analyticalData_types_1 = require("../types/analyticalData.types");
exports.SellerController = {
    getTotalProducts: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const totalProducts = await seller_services_1.SellerServices.getTotalProductsBySeller(sellerId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "Total products fetched successfully", totalProducts);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal server Error");
        }
    },
    getTotalOrders: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const totalOrders = await seller_services_1.SellerServices.getTotalOrder(sellerId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "Total orders fetched successfully", totalOrders);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal server Error");
        }
    },
    getTotalRevenue: async (req, res) => {
        try {
            const sellerId = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.sellerId : undefined);
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            console.log("sellerId:", sellerId);
            const totalRevenue = await seller_services_1.SellerServices.getTotalRevenue(sellerId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "Total revenue fetched successfully", totalRevenue);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal server Error");
        }
    },
    getTopSellingProducts: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const topSellingProducts = await seller_services_1.SellerServices.getTopProductsByRevenue(sellerId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "Top selling products fetched successfully", topSellingProducts);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal server Error");
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const allOrders = await seller_services_1.SellerServices.getAllOrders(sellerId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "All orders fetched successfully", allOrders);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal server Error");
        }
    },
    totalInventoryValue: async (req, res) => {
        try {
            const seller = req.user?.userId;
            const role = req.user?.role;
            if (!seller || role !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "forbidden", " You are not authorized to access this resource");
            const totalInventory = await seller_services_1.SellerServices.totalInventoryValue(seller);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "total Inventory Value Fetched", totalInventory);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal server error");
        }
    },
    changeOrderStatus: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const { orderId, newStatus } = req.body;
            const updatedOrder = await seller_services_1.SellerServices.changeOrderStatus(sellerId, orderId, newStatus);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Order status updated successfully", updatedOrder);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
    getAvgOrderValue: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const avgOrderValue = await seller_services_1.SellerServices.getAvgOrderValue(sellerId);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Average order value fetched successfully", avgOrderValue);
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.status, error.message);
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
    salesPerformanceIndicator: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const { timeframe } = req.query;
            const validTimeframes = Object.values(analyticalData_types_1.AnalyticalDateTimeframe);
            const safeTimeframe = validTimeframes.includes(timeframe) ? timeframe : analyticalData_types_1.AnalyticalDateTimeframe.SEVEN_DAYS;
            const data = await analytics_services_1.Analytical.getSellerAnalytics(sellerId, safeTimeframe);
            if ((0, socket_1.isUserConnected)(sellerId)) {
                (0, socket_1.getIo)().to(`user-${sellerId}`).emit("sales-indicator:subscribe", data);
            }
            (0, Responses_1.sendSuccessResponse)(res, 200, "Sales performance indicator fetched successfully", data);
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.status, error.message);
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
    getSalesByCategory: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            const seller = req.user?.role;
            if (!sellerId || seller !== "seller")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
            const salesByCategory = await seller_services_1.SellerServices.getSalesByCategory(sellerId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "Sales by category fetched successfully", salesByCategory);
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.status, error.message);
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    }
};
//# sourceMappingURL=seller.controller.js.map