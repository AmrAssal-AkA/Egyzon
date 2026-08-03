import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../types/product.types";

const productSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    AvgRating: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    SellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>("Product", productSchema);
