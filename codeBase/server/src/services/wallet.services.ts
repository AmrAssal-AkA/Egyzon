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

      const{ totalRevenue: withdrawableRevenue } = await SellerServices.getTotalRevenue(sellerId, {minAgeDays: 30});
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
  setSellerBankAccount: async (sellerId: string, bankAccount: string) => {
    try {

    }catch (error) {
      
    }
  }
};
