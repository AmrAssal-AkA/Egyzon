import Category from "../models/categoryModel";
import { ICategory } from "../types/product.types";
import { AppError } from "../utils/AppError";


export const CategoryService = {
    createCategory: async (categoryData: ICategory) => {
        try {
            const existingCategory = await Category.findOne({ categoryName: categoryData.categoryName });
            if (existingCategory) {
                throw new AppError(400, 'Category already exists');
            }
            const category = new Category(categoryData);
            await category.save();
            return category;
        }catch (error) {
            if (error instanceof AppError){
                throw new AppError(500, error.message);
            }
            throw new AppError(500, "Internal Server Error");
        }
    }
}