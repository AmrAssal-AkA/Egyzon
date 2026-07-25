import mongoose, {Schema} from "mongoose"
import {IWallet} from "../types/wallet.types"


const walletSchema = new Schema<IWallet>({
    walletId: {
        type: String,
        required: true,
        unique: true,
    },
    sellerId: {
        type: String,
        ref: "Seller",
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
        default: 0,
    },
    currency: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    transactionHistory: [{
        transactionId: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        transactionType: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true})


export const Wallet = mongoose.model<IWallet>("Wallet", walletSchema)