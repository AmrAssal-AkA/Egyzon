import mongoose, {Schema} from "mongoose"
import {IWallet, TransactionType} from "../types/wallet.types"


const walletSchema = new Schema<IWallet>({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        default: "EGP",
    },
    transactionHistory: [
        {
            transactionType: {
                type: String,
                enum: Object.values(TransactionType),
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            currency: {
                type: String,
                required: true,
                default: "EGP", 
            },
            status: {
                type: String,
                enum: ["pending", "completed", "failed", "cancelled"],
                required: true,
            },
            withdrawalId: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, {timestamps: true})


export const Wallet = mongoose.model<IWallet>("Wallet", walletSchema)