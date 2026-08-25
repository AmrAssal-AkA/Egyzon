import mongoose, { Schema } from "mongoose";
import { ISeller } from "../types/User.types";
import User from "./userModel";

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
        ref: "Product",
      }
    ],
    createdAt: {
      type: Date,
    }
  });

export default User.discriminator<ISeller>("Seller", SellerSchema, "seller");

