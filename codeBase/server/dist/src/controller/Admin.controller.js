"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_services_1 = require("../services/admin.services");
const Responses_1 = require("../utils/Responses");
exports.AdminController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await admin_services_1.AdminService.getAllUser();
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Users retrieved successfully", users);
        }
        catch (error) {
            (0, Responses_1.sendErrorResponse)(res, 500, "internal server Error");
        }
    },
    promoteToAdmin: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!userId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "userId is required");
            const promotedUser = await admin_services_1.AdminService.promoteToAdmin(userId);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "User promoted to admin successfully", promotedUser);
        }
        catch (error) {
            (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error);
        }
    },
    BlockUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!userId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "userId is required");
            const blockedUser = await admin_services_1.AdminService.blockUser(userId);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "User blocked successfully", blockedUser);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error);
        }
    },
    activateUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            if (!userId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "userId is required");
            const activateUser = await admin_services_1.AdminService.activateUser(userId);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "user is back to active state", activateUser);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error);
        }
    },
    setPlatformFee: async (req, res) => {
        try {
            const adminId = req.user?.userId;
            const role = req.user?.role;
            if (!adminId || role !== "admin")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Unauthorized access");
            const { feePercentage, taxRate } = req.body;
            if (feePercentage === undefined)
                return (0, Responses_1.sendErrorResponse)(res, 400, "feePercentage is required");
            if (taxRate === undefined)
                return (0, Responses_1.sendErrorResponse)(res, 400, "taxRate is required");
            const updatedPlatformConfig = await admin_services_1.AdminService.setPlatformFee(feePercentage, taxRate, adminId);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Platform fee updated successfully", updatedPlatformConfig);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error);
        }
    },
    getPlatformFee: async (req, res) => {
        try {
            const platformConfig = await admin_services_1.AdminService.getPlatformFee();
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Platform fee retrieved successfully", platformConfig);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error);
        }
    },
    getAllSellerActiveCounts: async (req, res) => {
        try {
            const adminId = req.user?.userId;
            const role = req.user?.role;
            if (!adminId || role !== "admin")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Unauthorized access");
            const sellerCounts = await admin_services_1.AdminService.getAllSellerActiveCounts();
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Seller counts retrieved successfully", sellerCounts);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error);
        }
    },
    getAllSellerPendingCounts: async (req, res) => {
        try {
            const adminId = req.user?.userId;
            const role = req.user?.role;
            if (!adminId || role !== "admin")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Unauthorized access");
            const sellerCounts = await admin_services_1.AdminService.getAllSellerPendingCounts();
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Seller counts retrieved successfully", sellerCounts);
        }
        catch (error) {
            if (error instanceof Error)
                return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error.message);
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error");
        }
    },
    getSellerProductsCategory: async (req, res) => {
        try {
            const adminId = req.user?.userId;
            const role = req.user?.role;
            if (!adminId || role !== "admin")
                return (0, Responses_1.sendErrorResponse)(res, 403, "Unauthorized access");
            const sellerProductsCategory = await admin_services_1.AdminService.getSellerProductsCategory();
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Seller products category retrieved successfully", sellerProductsCategory);
        }
        catch (error) {
            if (error instanceof Error)
                return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error.message);
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error");
        }
    }
};
//# sourceMappingURL=Admin.controller.js.map