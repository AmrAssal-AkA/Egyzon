"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const AppError_1 = require("../utils/AppError");
// Service function to create a new product by a seller
exports.ProductServices = {
    createProduct: async (sellerId, productData) => {
        try {
            const newProduct = await productModel_1.default.create({
                ...productData,
                SellerId: sellerId,
            });
            const existingProduct = await productModel_1.default.findOne({ productId: newProduct.productId, SellerId: sellerId });
            if (existingProduct) {
                throw new AppError_1.AppError(400, 'Product already exists');
            }
            return newProduct;
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError(500, 'Failed to create product');
        }
    },
    // Service function to apply a discount to a product by a seller
    ApplyDiscount: async (SellerId, productId, discount) => {
        const product = await productModel_1.default.findOne({ productId, SellerId: SellerId });
        if (!product) {
            throw new AppError_1.AppError(404, "Product not found");
        }
        product.price = product.price - product.price * discount;
        return await product.save();
    },
    // Service function to update a product by a seller
    UpdateProduct: async (SellerId, productId, productData) => {
        const product = await productModel_1.default.findOne({ productId, SellerId: SellerId });
        if (!product) {
            throw new AppError_1.AppError(404, "Product not found");
        }
        Object.assign(product, productData);
        return await product.save();
    },
    // Service function to get all products with pagination
    getAllProducts: async (page, limit) => {
        try {
            const [products, total] = await Promise.all([
                productModel_1.default.find()
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit),
                productModel_1.default.countDocuments(),
            ]);
            return { products, total };
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError(500, 'Failed to get products');
        }
    },
    getProductById: async (productId) => {
        try {
            const product = await productModel_1.default.findOne({ productId });
            if (!product) {
                throw new AppError_1.AppError(404, 'Product not found');
            }
            return product;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.log(error);
            throw new AppError_1.AppError(500, "Failed To get the product");
        }
    },
};
//# sourceMappingURL=product.services.js.map