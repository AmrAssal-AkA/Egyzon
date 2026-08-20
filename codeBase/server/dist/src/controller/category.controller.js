"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const cloudainry_config_1 = __importDefault(require("../config/cloudainry.config"));
const category_services_1 = require("../services/category.services");
const Responses_1 = require("../utils/Responses");
exports.CategoryController = {
    createCategory: async (req, res) => {
        try {
            const { categoryName, description } = req.body;
            if (!categoryName || !description) {
                return (0, Responses_1.sendErrorResponse)(res, 400, "All required fields must be provided");
            }
            const image = req.file;
            if (!image || !image.buffer) {
                return (0, Responses_1.sendErrorResponse)(res, 400, "Image file is required");
            }
            console.log("Image received:", image);
            const uploadedImage = await (0, cloudainry_config_1.default)(image.buffer, "Egyzon/Categories");
            if (!uploadedImage) {
                return (0, Responses_1.sendErrorResponse)(res, 400, "Image upload failed");
            }
            const categoryData = {
                categoryName,
                description,
                imageUrl: uploadedImage.secure_url,
                Products: [],
            };
            const category = await category_services_1.CategoryService.createCategory(categoryData);
            console.log("Category created successfully:", category);
            (0, Responses_1.sendSuccessResponse)(res, 201, "Category created successfully", category);
        }
        catch (error) {
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const categories = await category_services_1.CategoryService.getAllCategories();
            (0, Responses_1.sendSuccessResponse)(res, 200, "Categories fetched successfully", categories);
        }
        catch (error) {
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
    addProductToCategory: async (req, res) => {
        try {
            const sellerId = req.user?.userId;
            if (!sellerId) {
                return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized: Seller ID is missing");
            }
            const { categoryId, productId } = req.body;
            if (!categoryId || !productId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "Category ID and Product ID are required");
            const updatedCategory = await category_services_1.CategoryService.addProductToCategory(categoryId, productId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "Product added to category successfully", updatedCategory);
        }
        catch (error) {
            console.log(error);
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
    getProductsByCategory: async (req, res) => {
        try {
            const rawCategoryId = req.params.categoryId;
            const categoryId = Array.isArray(rawCategoryId) ? rawCategoryId[0] : rawCategoryId;
            if (!categoryId)
                return (0, Responses_1.sendErrorResponse)(res, 400, "Category ID is required");
            const products = await category_services_1.CategoryService.getProductsByCategory(categoryId);
            (0, Responses_1.sendSuccessResponse)(res, 200, "Products fetched successfully", products);
        }
        catch (error) {
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
};
//# sourceMappingURL=category.controller.js.map