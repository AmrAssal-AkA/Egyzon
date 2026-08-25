"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_services_1 = require("../services/product.services");
const notification_services_1 = require("../services/notification.services");
const Responses_1 = require("../utils/Responses");
const cloudainry_config_1 = __importDefault(require("../config/cloudainry.config"));
const createProduct = async (req, res) => {
    try {
        const sellerId = req.user?.userId ||
            req.user?._id ||
            req.user?.id;
        if (!sellerId) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized: Seller ID not found");
        }
        const { productName, productDescription, price, discount, stock, category, } = req.body;
        if (!productName ||
            !productDescription ||
            price === undefined ||
            stock === undefined) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "All required product fields must be provided");
        }
        const images = req.files;
        if (!images || images.length === 0 || !images[0]?.buffer) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Image file is required");
        }
        const imageUrl = await Promise.all(images.map((image) => (0, cloudainry_config_1.default)(image.buffer, "Egyzon/Products")));
        if (!imageUrl || imageUrl.length === 0) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Image upload failed");
        }
        const newProduct = await product_services_1.ProductServices.createProduct(sellerId, {
            productName,
            productDescription,
            price: Number(price),
            discount: discount !== undefined ? Number(discount) : 0,
            stock: Number(stock),
            category,
            imageUrl: imageUrl.map((url) => url.secure_url),
        });
        await notification_services_1.NotificationServices.createNotification({
            user: sellerId,
            type: "success",
            message: `Product "${newProduct.productName}" created successfully.`,
            isRead: false,
            createdAt: new Date(),
        });
        (0, Responses_1.sendSuccessResponse)(res, 201, "Product created successfully", newProduct);
    }
    catch (error) {
        console.log(error);
        (0, Responses_1.sendErrorResponse)(res, error.statusCode || 500, error.message || "Internal Server Error");
    }
};
const applyDiscount = async (req, res) => {
    try {
        const sellerId = req.user?.userId ||
            req.user?._id ||
            req.user?.id;
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
    const productId = req.params.productId ||
        (process.env.NODE_ENV !== "production" && req.body.productId);
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
const updateProduct = async (req, res) => {
    try {
        const user = req.user?.userId;
        const seller = req.user?.role;
        if (!user || seller !== "seller")
            return (0, Responses_1.sendErrorResponse)(res, 403, "Forbidden", "You are not authorized to access this resource");
        const productId = req.params.productId;
        if (!productId)
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Product ID is required");
        const { productName, productDescription, price, discount, stock, category } = req.body;
        const images = req.files;
        let imageUrl;
        if (images && images.length > 0) {
            imageUrl = await Promise.all(images.map((image) => (0, cloudainry_config_1.default)(image.buffer, "Egyzon/Products"))).then((urls) => urls.map((url) => url.secure_url));
        }
        const editProduct = await product_services_1.ProductServices.UpdateProduct(user, productId, {
            productName,
            productDescription,
            price: price !== undefined ? Number(price) : undefined,
            discount: discount !== undefined ? Number(discount) : undefined,
            stock: stock !== undefined ? Number(stock) : undefined,
            category,
            imageUrl,
        });
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Product updated successfully", editProduct);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
    }
};
const getSellerProducts = async (req, res) => {
    try {
        const sellerId = req.user?.userId ||
            req.user?._id ||
            req.user?.id;
        if (!sellerId) {
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized: Seller ID not found");
        }
        const products = await product_services_1.ProductServices.getSellerProducts(sellerId);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Seller products retrieved successfully", products);
    }
    catch (error) {
        console.log(error);
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
const deleteProduct = async (req, res) => {
    try {
        const sellerId = req.user?.userId ||
            req.user?._id ||
            req.user?.id;
        const productId = req.params.productId;
        const deletedProduct = await product_services_1.ProductServices.deleteProduct(sellerId, productId);
        (0, Responses_1.sendSuccessResponse)(res, 200, "Product deleted successfully", deletedProduct);
    }
    catch (error) {
        console.log(error);
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.default = {
    createProduct,
    applyDiscount,
    getAllProducts,
    updateProduct,
    getProductById,
    getSellerProducts,
    deleteProduct,
};
//# sourceMappingURL=product.controller.js.map