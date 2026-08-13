"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageSellerApplicationsController = void 0;
const Responses_1 = require("../../utils/Responses");
const admin_services_1 = require("../../services/admin.services");
exports.ManageSellerApplicationsController = {
    getAllSellers: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const allSellers = await admin_services_1.AdminService.getAllSellers(Number(page), Number(limit));
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Sellers retrieved successfully", allSellers);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "internal Server Error", error);
        }
    },
    getAllPendingSellerApplications: async (req, res) => {
        try {
            const applications = await admin_services_1.AdminService.getAllPendingSellerApplications();
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Pending seller applications retrieved successfully", applications);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", "An unexpected error occurred");
        }
    },
    approveSeller: async (req, res) => {
        try {
            const sellerId = req.params.sellerId;
            if (!sellerId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Seller ID is required");
            const updatedSeller = await admin_services_1.AdminService.approveSeller(sellerId);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Seller approved successfully", updatedSeller);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", "An unexpected error occurred");
        }
    },
    requestAdditionalDocuments: async (req, res) => {
        try {
            const sellerId = req.params.sellerId;
            if (!sellerId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Seller ID is required");
            const { message } = req.body;
            if (!message)
                return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Message is required");
            const updatedSeller = await admin_services_1.AdminService.requestAdditionalDocuments(sellerId, message);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Request for additional documents sent successfully", updatedSeller);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", "An unexpected error occurred");
        }
    },
    rejectseller: async (req, res) => {
        try {
            const sellerId = req.params.sellerId;
            if (!sellerId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Seller ID is required");
            const updatedSeller = await admin_services_1.AdminService.rejectSeller(sellerId);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Seller rejected successfully", updatedSeller);
        }
        catch (error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", "An unexpected error occurred");
        }
    },
};
//# sourceMappingURL=SellerApplicationManag.controller.js.map