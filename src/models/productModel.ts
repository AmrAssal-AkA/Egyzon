import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../types/product.types";
import Category from "./categoryModel";

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
    sku: {
      type: String,
      required: true,
      unique: true,
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

productSchema.pre("validate", async function () {
  if (this.sku) return;
  if (!this.categoryId) return;

  const categoryDoc = await Category.findById(this.categoryId).select("categoryName").exec();
  if (!categoryDoc) return;

  const categoryPart = categoryDoc.categoryName.slice(0, 4).toUpperCase();
  const namePart = this.productName.replace(/\s+/g, "").slice(0, 4).toUpperCase();
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  this.sku = `${categoryPart}-${namePart}-${datePart}-${randomPart}`;
});

export default mongoose.model<IProduct>("Product", productSchema);
