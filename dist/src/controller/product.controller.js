"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_services_1 = require("../services/product.services");
const Responses_1 = require("../utils/Responses");
const cloudainry_config_1 = __importDefault(require("../config/cloudainry.config"));
const createProduct = async (req, res) => {
    try {
        const sellerId = req.user?.id;
        if (!sellerId) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized: Seller ID not found");
        }
        const { productName, productDescription, price, discount, stock } = req.body;
        const images = req.files;
        if (!images || images.length === 0 || !images[0]?.buffer) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Image file is required");
        }
        const imageUrl = await (0, cloudainry_config_1.default)(images[0]?.buffer, "Eguzon/Products");
        if (!imageUrl) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Image upload failed");
        }
        const newProduct = await product_services_1.ProductServices.createProduct(sellerId, {
            productName,
            productDescription,
            price,
            discount,
            stock,
            imageUrl,
        });
        (0, Responses_1.sendSuccessResponse)(res, 201, "Product created successfully", newProduct);
    }
    catch (error) {
        console.log(error);
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
const applyDiscount = async (req, res) => {
    try {
        const sellerId = req.user?.id;
        const productId = req.params.productId;
        const discount = req.body.discount;
        const updatedProduct = await product_services_1.ProductServices.ApplyDiscount(sellerId, productId, discount);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Discount applied successfully", updatedProduct);
    }
    catch (error) {
        console.log(error);
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
const getAllProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const products = await product_services_1.ProductServices.getAllProducts(Number(page), Number(limit));
        (0, Responses_1.sendSuccessResponse)(res, 200, "Products retrieved successfully", products);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
const getProductById = async (req, res) => {
    const productId = req.params.productId || (process.env.NODE_ENV !== 'production' && req.body.productId);
    ;
    if (!productId) {
        return (0, Responses_1.sendErrorResponse)(res, 400, "productId not fount");
    }
    try {
        const getProduct = await product_services_1.ProductServices.getProductById(productId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Product retrieved successfully", getProduct);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
exports.default = {
    createProduct,
    applyDiscount,
    getAllProducts,
    getProductById,
};
//# sourceMappingURL=product.controller.js.map