import mongoose from "mongoose";

import { Wallet } from "../models/wallet.model";
import Seller from "../models/sellerModel";
import Orders from "../models/orderModel";
import { SellerServices } from "./seller.services";
import { AppError } from "../utils/AppError";
import { TransactionStatus, TransactionType } from "../types/wallet.types";

export const WalletServices = {
  getWalletBalance: async (sellerId: string) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) throw new AppError(404, "Seller not found");
      let wallet = await Wallet.findOne({ seller: seller._id });
      if (!wallet) {
        wallet = await Wallet.create({
          seller: seller._id,
          balance: 0,
          currency: "EGP",
          transactionHistory: [],
        });
      }

      const { totalRevenue: withdrawableRevenue } =
        (await SellerServices.getTotalRevenue(sellerId, { minAgeDays: 2 })) ?? {
          totalRevenue: 0,
        };
      const totalWithdrawn = wallet.transactionHistory
        .filter(
          (t) =>
            t.transactionType === TransactionType.withdrawal &&
            t.status === TransactionStatus.completed,
        )
        .reduce((acc, t) => acc + t.amount, 0);
      const currentBalance = withdrawableRevenue - totalWithdrawn;
      wallet.balance = currentBalance;
      await wallet.save();
      return currentBalance;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Invalid Server Error");
    }
  },
  WithdrawFunds: async (sellerId: string, amount: number) => {
    if (amount <= 0)
      throw new AppError(400, "Withdrawal amount must be greater than zero");
    const session = await mongoose.startSession();
    try {
      let result;

      await session.withTransaction(async () => {
        const seller = await Seller.findById(sellerId)
          .select(
            "bankAccount.status bankAccount.last4 bankAccount.issuer bankAccount.bankCode bankAccount.fullName",
          )
          .session(session);
        if (!seller) throw new AppError(404, "Seller not found");
        if (!seller.bankAccount || !seller.bankAccount.last4)
          throw new AppError(400, "Bank account is not linked");
        if (!seller.bankAccount || seller.bankAccount.status !== "verified")
          throw new AppError(400, "Bank account is not verified");

        const wallet = await Wallet.findOne({ seller: seller._id }).session(
          session,
        );
        if (!wallet) throw new AppError(404, "Wallet not found");
        if (wallet.balance < amount)
          throw new AppError(400, "Insufficient balance");

        wallet.balance -= amount;
        const txnId = new mongoose.Types.ObjectId().toString();
        wallet.transactionHistory.push({
          id: txnId,
          transactionType: TransactionType.withdrawal,
          amount,
          currency: wallet.currency,
          status: TransactionStatus.pending,
          withdrawalId: txnId,
          date: new Date(),
        });
        const updatedWallet = await wallet.save({ session });

        result = {
          wallet: updatedWallet,
          bankAccount: {
            issuer: seller.bankAccount.issuer,
            fullName: seller.bankAccount.fullName,
            last4: seller.bankAccount.last4,
            bankCode: seller.bankAccount.bankCode,
          },
        };
      });
      return result;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Invalid Server Error");
    } finally {
      session.endSession();
    }
  },
  getTransactionHistory: async (
    sellerId: string,
    page: number,
    limit: number,
  ) => {
    try {
      const seller = await Seller.findById(sellerId);
      if (!seller) throw new AppError(404, "Seller not found");

      const currentPage = page > 0 ? page : 1;
      const currentLimit = limit > 0 ? limit : 10;
      const skip = (currentPage - 1) * currentLimit;

      const [wallet, totalTransactions] = await Promise.all([
        Wallet.findOne({ seller: seller._id }).select("transactionHistory"),
        Wallet.countDocuments({ seller: seller._id }),
      ]);

      if (!wallet) throw new AppError(404, "Wallet not found");

      const transactionHistory = wallet.transactionHistory
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(skip, skip + currentLimit);

      return {
        transactions: transactionHistory,
        totalTransactions,
        currentPage,
        totalPages: Math.ceil(totalTransactions / currentLimit),
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Invalid Server Error");
    }
  },
};
