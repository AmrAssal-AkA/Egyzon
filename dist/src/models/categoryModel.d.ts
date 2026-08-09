import mongoose from "mongoose";
import { ICategory } from "../types/product.types";
declare const Category: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory, {}, mongoose.DefaultSchemaOptions> & ICategory & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, ICategory>;
export default Category;
//# sourceMappingURL=categoryModel.d.ts.map