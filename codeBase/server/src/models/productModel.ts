import mongoose, { Schema, HydratedDocument } from "mongoose";
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
      default: function (): string {
        const categoryPart = this.category
          ? this.category.toString().slice(0, 4).toUpperCase()
          : "GEN";
        const namePart = this.productName
          ? this.productName.replace(/\s+/g, "").slice(0, 4).toUpperCase()
          : "PROD";
        const datePart = new Date()
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");
        const randomPart = Math.random()
          .toString(36)
          .substring(2, 6)
          .toUpperCase();
        return `${categoryPart}-${namePart}-${datePart}-${randomPart}`;
      },
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
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true },
);

productSchema.pre("validate", async function () {
  if (this.sku) return;
  if (!this.category) return;

  const categoryDoc = await Category.findById(this.category)
    .select("categoryName")
    .exec();
  if (!categoryDoc) return;

  const categoryPart = categoryDoc.categoryName.slice(0, 4).toUpperCase();
  const namePart = this.productName
    .replace(/\s+/g, "")
    .slice(0, 4)
    .toUpperCase();
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  this.sku = `${categoryPart}-${namePart}-${datePart}-${randomPart}`;
});

productSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    const productId = this._id;
    const categoryId = this.category;

    await Promise.all([
      mongoose.model("Review").deleteMany({ productId }),
      mongoose
        .model("category")
        .updateOne({ _id: categoryId }, { $pull: { products: productId } }),
      mongoose
        .model("Seller")
        .updateMany(
          { products: productId },
          { $pull: { products: productId } },
        ),
      mongoose
        .model("Order")
        .updateMany(
          { "products.productId": productId },
          { $pull: { products: { productId } } },
        ),
      mongoose
        .model("wishlist")
        .updateMany(
          { products: productId },
          { $pull: { products: productId } },
        ),
    ]);
  },
);

export default mongoose.model<IProduct>("Product", productSchema);
