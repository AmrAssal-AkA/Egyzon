import Category from "../models/categoryModel";
import Seller from "../models/sellerModel";
import Product from "../models/productModel";
import { ICategory } from "../types/product.types";
import { AppError } from "../utils/AppError";



export const CategoryService = {
    createCategory: async (categoryData: ICategory) => {
        try {
           const existingCategory = await Category.findOne({ categoryName: categoryData.categoryName });
           if (existingCategory) {
               throw new AppError(400, "Category with this name already exists");
           }
           const category = new Category(categoryData);
           await category.save();
           return category;
        }catch (error) {
            console.error("Error creating category:", error);
            if (error instanceof AppError){
                
                throw new AppError(500, error.message);
            }
            throw new AppError(500, "Internal Server Error");
        }
    },
    getAllCategories: async () => {
        try{
            const categories = await Category.find({});
            return categories;
        }catch(error){
            if (error instanceof AppError){
                throw new AppError(500, error.message);
            }
            throw new AppError(500, "Internal Server Error");
        }
    },
    addProductToCategory: async (categoryId: string, productId: string) => {
        try {
            const category = await Category.findById(categoryId);
            if (!category) {
                throw new AppError(404, "Category not found");
            }
            const product = await Product.findById(productId);
            if (!product) {
                throw new AppError(404, "Product not found");
            }
            category.Products.push(product._id);
            await category.save();
            return category;
        }catch (error) {
            console.error("Error adding product to category:", error);
            if (error instanceof AppError){
                throw new AppError(500, error.message);
            }
            throw new AppError(500, "Internal Server Error");
        }
    },
    getProductsByCategory: async (categoryId: string) => {
        try {
            const category = await Category.findById(categoryId).populate("Products");
            if (!category) throw new AppError(404, "Category not found");
            return category.Products;
        }catch (error) {
            if (error instanceof AppError){
                throw new AppError(500, error.message);
            }
            throw new AppError(500, "Internal Server Error");
        }
    }
}