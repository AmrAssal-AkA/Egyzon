import mongoose, { Schema } from "mongoose";
import { ISeller } from "../types/User.types";
import User from "./userModel";
import { paymobIssuar, paymobBankCode } from "../types/wallet.types";

const bankAccountSchema = new Schema({
    issuer: {
      type: String,
      enum: Object.values(paymobIssuar),
      default: paymobIssuar.BANK_CARD
    },
    fullName: {
      type: String
    },
    bankCardNumber: {
      type: String,
      select: false
    },
    last4: {
      type: String
    },
    BankCode: {
      type: String,
      enum: Object.values(paymobBankCode)
    },
    status: {
      type: String,
              enum: ["pending_verification", "verified", "rejected"],
        default: "pending_verification",
    }
}, {_id: false, timestamp: true})

const SellerSchema = new Schema<ISeller>(
  {
    commercialRegisterNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    taxCardNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    storeName: {
      type: String,
      unique: true,
      sparse: true,
    },
    sellerDocuments: {
      commercialRegisterUrl: {
        type: String,
        default: "",
      },
      taxCardUrl: {
        type: String,
        default: "",
      },
    },
    applicantStatus: {
      type: String,
      enum: [
        "pending",
        "under-review",
        "additional_docs_requested",
        "approved",
        "rejected",
      ],
      default: "pending",
    },
    storeManagement: {
      storeLogo: { type: String },
      storeBanner: { type: String },
      storeDescription: { type: String, default: "No description provided" },
      storeType: {
        type: String,
        enum: ["physical", "online", "both"],
        default: "physical",
      },
      storephysicalAddress: { type: String },
      storeOnlineAddress: { type: String },
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      }
    ],
    bankAccount: {
      type: bankAccountSchema,
      default: () => {}
    },
    createdAt: {
      type: Date,
    }
  });

export default User.discriminator<ISeller>("Seller", SellerSchema, "seller");

