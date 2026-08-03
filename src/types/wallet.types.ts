import {Types} from "mongoose"

export interface IWallet {
    _id: Types.ObjectId
    sellerId: Types.ObjectId;
    Amount: number;
    currency: string;
    transactionType: string;
    transactionHistory: {
        transactionId: string;
        amount: number;
        currency: string;
        transactionType: string;
        date: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}