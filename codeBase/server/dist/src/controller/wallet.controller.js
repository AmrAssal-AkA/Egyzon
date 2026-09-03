"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletBalance = void 0;
const wallet_services_1 = require("../services/wallet.services");
const AppError_1 = require("../utils/AppError");
const Responses_1 = require("../utils/Responses");
const getWalletBalance = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const seller = req.user?.role;
        if (!userId || seller !== "seller")
            return (0, Responses_1.sendErrorResponse)(res, 403, "Unauthorized access");
        const balance = await wallet_services_1.WalletServices.getWalletBalance(userId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Wallet balance retrieved successfully", { balance });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        return (0, Responses_1.sendErrorResponse)(res, 500, "Invalid Server Error");
    }
};
exports.getWalletBalance = getWalletBalance;
const getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const seller = req.user?.role;
        if (!userId || seller !== "seller")
            return (0, Responses_1.sendErrorResponse)(res, 403, "Unauthorized access");
        const transactionHistory = await wallet_services_1.WalletServices.getTransactionHistory(userId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Transaction history retrieved successfully", { transactionHistory });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        return (0, Responses_1.sendErrorResponse)(res, 500, "Invalid Server Error");
    }
};
//# sourceMappingURL=wallet.controller.js.map