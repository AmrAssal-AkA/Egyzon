import type { Request, Response } from "express";

import {WalletServices} from "../services/wallet.services";
import { AppError } from "../utils/AppError";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";

export const WalletController = {
    getWalletBalance: async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const seller = req.user?.role;
        if (!userId || seller !== "seller") return sendErrorResponse(res, 403, "Unauthorized access");
        const balance = await WalletServices.getWalletBalance(userId);
        return sendSuccessResponse(res, 200, "Wallet balance retrieved successfully", {balance});
    }catch (error) {
        if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
        return sendErrorResponse(res, 500, "Invalid Server Error");
    }
},
    withdrawFunds: async (req: Request, res: Response) => {
        try {
            const isUser = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.sellerId : undefined);
            const isSeller = req.user?.role || (process.env.NODE_ENV !== "production" ? "seller" : undefined);
            if (!isUser || isSeller !== "seller") return sendErrorResponse(res, 403, "Unauthorized access");
            const { amount } = req.body;
            if (typeof amount !== "number" || amount <= 0) return sendErrorResponse(res, 400, "Invalid withdrawal amount");
            const updatedWallet = await WalletServices.WithdrawFunds(isUser, amount);
            return sendSuccessResponse(res, 200, "Withdrawal request submitted successfully", {updatedWallet});
        }catch (error) {
            if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
            return sendErrorResponse(res, 500, "Invalid Server Error");
        }
    },
    getTransactionHistory: async (req: Request, res: Response) => {
        try {
            const isUser = req.user?.userId || (process.env.NODE_ENV !== "production" ? req.body.sellerId : undefined);
            const isSeller = req.user?.role || (process.env.NODE_ENV !== "production" ? "seller" : undefined);
            if (!isUser || isSeller !== "seller") return sendErrorResponse(res, 403, "Unauthorized access");
            const { page = 1, limit = 10 } = req.query;
            const transactionHistory = await WalletServices.getTransactionHistory(isUser, Number(page), Number(limit));
            return sendSuccessResponse(res, 200, "Transaction history retrieved successfully", {transactionHistory});
        }catch(error){
            if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
            return sendErrorResponse(res, 500, "Invalid Server Error");
        }
    }
}