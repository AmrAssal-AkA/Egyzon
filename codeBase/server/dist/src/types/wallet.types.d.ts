import { Types } from "mongoose";
export declare enum TransactionType {
    sale = "sale",
    refund = "refund",
    withdrawal = "withdrawal",
    deposit = "deposit"
}
export declare enum TransactionStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed",
    cancelled = "cancelled"
}
export interface ITransaction {
    transactionType: TransactionType;
    amount: number;
    currency: string;
    status: TransactionStatus;
    orderId?: Types.ObjectId;
    withdrawalId?: string;
    date: Date;
}
export interface IWallet {
    _id: Types.ObjectId;
    seller: Types.ObjectId;
    balance: number;
    currency: string;
    transactionHistory: ITransaction[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=wallet.types.d.ts.map