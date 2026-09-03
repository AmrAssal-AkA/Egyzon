import {Types} from "mongoose"

export enum TransactionType {
     sale = "sale",
        refund = "refund",
        withdrawal = "withdrawal",
        deposit = "deposit",
}

export enum TransactionStatus {
        pending = "pending",
        completed = "completed",
        failed = "failed",
        cancelled = "cancelled",
}

export interface ITransaction {
    transactionType: TransactionType;
    amount: number;
    currency: string;
    status: TransactionStatus;
    withdrawalId?: string; 
    date: Date;
}

export interface IWallet {
    _id: Types.ObjectId
    seller: Types.ObjectId;
    balance: number;
    currency: string;
    transactionHistory: ITransaction[];
    createdAt: Date;
    updatedAt: Date;
}