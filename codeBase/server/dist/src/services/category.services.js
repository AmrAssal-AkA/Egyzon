"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const AppError_1 = require("../utils/AppError");
exports.CategoryService = {
    createCategory: async (categoryData) => {
        try {
            const existingCategory = await categoryModel_1.default.findOne({ categoryName: categoryData.categoryName });
            if (existingCategory) {
                throw new AppError_1.AppError(400, "Category with this name already exists");
            }
            const category = new categoryModel_1.default(categoryData);
            await category.save();
            return category;
        }
        catch (error) {
            console.error("Error creating category:", error);
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(500, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getAllCategories: async () => {
        try {
            const categories = await categoryModel_1.default.find({});
            return categories;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(500, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    addProductToCategory: async (categoryId, productId) => {
        try {
            const category = await categoryModel_1.default.findById(categoryId);
            if (!category) {
                throw new AppError_1.AppError(404, "Category not found");
            }
            const product = await productModel_1.default.findById(productId);
            if (!product) {
                throw new AppError_1.AppError(404, "Product not found");
            }
            category.Products.push(product._id);
            await category.save();
            return category;
        }
        catch (error) {
            console.error("Error adding product to category:", error);
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(500, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getProductsByCategory: async (categoryId) => {
        try {
            const category = await categoryModel_1.default.findById(categoryId).populate("Products");
            if (!category)
                throw new AppError_1.AppError(404, "Category not found");
            return category.Products;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(500, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    }
};
//# sourceMappingURL=category.services.js.map