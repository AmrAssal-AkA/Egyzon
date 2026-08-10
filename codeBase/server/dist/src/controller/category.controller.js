"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const cloudainry_config_1 = __importDefault(require("../config/cloudainry.config"));
const category_services_1 = require("../services/category.services");
exports.CategoryController = {
    createCategory: async (req, res) => {
        try {
            const { categoryName, description } = req.body;
            if (!categoryName || !description) {
                return res
                    .status(400)
                    .json({ message: "Category name and description are required" });
            }
            const categoryImage = req.file;
            if (!categoryImage) {
                return res.status(400).json({ message: "Category image is required" });
            }
            const upload = await (0, cloudainry_config_1.default)(categoryImage.buffer, "categories");
            const categoryData = {
                categoryName,
                description,
                imageUrl: upload.secure_url,
                Products: [],
            };
            const category = await category_services_1.CategoryService.createCategory(categoryData);
            res
                .status(201)
                .json({ message: "Category created successfully", category });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
};
//# sourceMappingURL=category.controller.js.map