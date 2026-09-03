"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const AppError_1 = require("../utils/AppError");
const Responses_1 = require("../utils/Responses");
const ALLOWED_SORT_FIELDS = new Set(["price", "productName", "createdAt"]);
const searchProducts = async (req, res) => {
    try {
        const { q: query, category, sort, } = req.query;
        if (!query || typeof query !== "string") {
            throw new AppError_1.AppError(400, "Query parameter is required and must be a string");
        }
        const pageNumber = Math.max(1, parseInt(req.query.page) || 1);
        const limitNumber = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
        const skip = (pageNumber - 1) * limitNumber;
        const searchCriteria = {
            $text: { $search: query },
        };
        if (category && typeof category === "string") {
            searchCriteria.category = category;
        }
        const sortCriteria = {};
        let projection = undefined;
        if (sort && typeof sort === "string") {
            const parts = sort.split(":");
            const field = parts[0] || "";
            const order = parts[1] || "asc";
            if (field && ALLOWED_SORT_FIELDS.has(field)) {
                sortCriteria[field] = order === "desc" ? -1 : 1;
            }
        }
        else {
            projection = { score: { $meta: "textScore" } };
            sortCriteria.score = { $meta: "textScore" };
        }
        const [products, total] = await Promise.all([
            productModel_1.default.find(searchCriteria, projection)
                .sort(sortCriteria)
                .skip(skip)
                .limit(limitNumber),
            productModel_1.default.countDocuments(searchCriteria),
        ]);
        const totalPages = Math.ceil(total / limitNumber);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Products retrieved successfully", {
            products,
            total,
            totalPages,
            currentPage: pageNumber,
        });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.searchProducts = searchProducts;
//# sourceMappingURL=search.controller.js.map