import { ICategory } from "../types/product.types";
export declare const CategoryService: {
    createCategory: (categoryData: ICategory) => Promise<import("mongoose").Document<unknown, {}, ICategory, {}, import("mongoose").DefaultSchemaOptions> & ICategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=category.services.d.ts.map