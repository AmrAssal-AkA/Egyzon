import type { Request, Response } from "express";

import {WalletServices} from "../services/wallet.services";
import { AppError } from "../utils/AppError";
import { sendErrorResponse, sendSuccessResponse } from "../utils/Responses";

const getWalletBalance = async (req: Request, res: Response) => {
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
}
const getTransactionHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const seller = req.user?.role;
        if (!userId || seller !== "seller") return sendErrorResponse(res, 403, "Unauthorized access");
        const transactionHistory = await WalletServices.getTransactionHistory(userId);
        return sendSuccessResponse(res, 200, "Transaction history retrieved successfully", {transactionHistory});
    }catch(error){
        if (error instanceof AppError) return sendErrorResponse(res, error.statusCode, error.message);
        return sendErrorResponse(res, 500, "Invalid Server Error");
        
    }
}



export {getWalletBalance};