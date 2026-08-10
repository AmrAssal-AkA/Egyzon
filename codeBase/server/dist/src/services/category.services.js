"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const AppError_1 = require("../utils/AppError");
exports.CategoryService = {
    createCategory: async (categoryData) => {
        try {
            const existingCategory = await categoryModel_1.default.findOne({ categoryName: categoryData.categoryName });
            if (existingCategory) {
                throw new AppError_1.AppError(400, 'Category already exists');
            }
            const category = new categoryModel_1.default(categoryData);
            await category.save();
            return category;
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