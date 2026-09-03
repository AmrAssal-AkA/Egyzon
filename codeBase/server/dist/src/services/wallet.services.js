"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletServices = void 0;
const wallet_model_1 = require("../models/wallet.model");
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const seller_services_1 = require("./seller.services");
const AppError_1 = require("../utils/AppError");
const wallet_types_1 = require("../types/wallet.types");
exports.WalletServices = {
    getWalletBalance: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                throw new AppError_1.AppError(404, "Seller not found");
            let wallet = await wallet_model_1.Wallet.findOne({ seller: seller._id });
            if (!wallet) {
                wallet = await wallet_model_1.Wallet.create({
                    seller: seller._id,
                    balance: 0,
                    currency: "EGP",
                    transactionHistory: [],
                });
            }
            const { totalRevenue } = await seller_services_1.SellerServices.getTotalRevenue(sellerId);
            const totalWithdrawn = wallet.transactionHistory
                .filter((t) => t.transactionType === wallet_types_1.TransactionType.withdrawal &&
                t.status === wallet_types_1.TransactionStatus.completed)
                .reduce((acc, t) => acc + t.amount, 0);
            const currentBalance = totalRevenue - totalWithdrawn;
            wallet.balance = currentBalance;
            await wallet.save();
            return currentBalance;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw error;
            throw new AppError_1.AppError(500, "Invalid Server Error");
        }
    },
    getTransactionHistory: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                throw new AppError_1.AppError(404, "Seller not found");
            const wallet = await wallet_model_1.Wallet.findOne({ seller: seller._id });
            if (!wallet)
                throw new AppError_1.AppError(404, "Wallet not found");
            const transactionHistory = wallet.transactionHistory.sort((a, b) => b.date.getTime() - a.date.getTime());
            return transactionHistory;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw error;
            throw new AppError_1.AppError(500, "Invalid Server Error");
        }
    }
};
//# sourceMappingURL=wallet.services.js.map