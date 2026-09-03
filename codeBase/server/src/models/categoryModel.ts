import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/product.types";

const categorySchema: Schema<ICategory> = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      default: "Generic",
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    Products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);



const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
