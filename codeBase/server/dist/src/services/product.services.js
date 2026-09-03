"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const AppError_1 = require("../utils/AppError");
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const client_1 = require("../config/client");
const Soft_TTL_Safely = 60 * 10; // 10 minutes
const Hard_TTL_Safely = 60 * 60 * 24 * 30; // 30 days
const Refresh_Lock_TTL = 30; // 30 seconds
let ClientPromise = null;
const getClient = async () => {
    if (!ClientPromise) {
        ClientPromise = (0, client_1.initializeRedisClient)();
    }
    return await ClientPromise;
};
// Service function to create a new product by a seller
exports.ProductServices = {
    createProduct: async (sellerId, productData) => {
        try {
            const category = await categoryModel_1.default.findOne({
                categoryName: productData.category,
            });
            if (!category) {
                throw new AppError_1.AppError(404, "Category not found");
            }
            const existingProduct = await productModel_1.default.findOne({
                name: productData.productName,
                sellerId,
            });
            if (existingProduct) {
                throw new AppError_1.AppError(400, "Product already exists");
            }
            const newProduct = await productModel_1.default.create({
                ...productData,
                category: category._id,
                sellerId: sellerId,
            });
            return newProduct;
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError(500, "Failed to create product");
        }
    },
    // Service function to apply a discount to a product by a seller
    ApplyDiscount: async (sellerId, productId, discount) => {
        const isObjectId = mongoose_1.default.Types.ObjectId.isValid(productId);
        const query = isObjectId
            ? { _id: productId, sellerId }
            : { sku: productId, sellerId };
        const product = await productModel_1.default.findOne(query);
        if (!product) {
            throw new AppError_1.AppError(404, "Product not found");
        }
        product.discount = discount;
        return await product.save();
    },
    // Service function to update a product by a seller
    UpdateProduct: async (sellerId, productId, productData) => {
        const seller = await sellerModel_1.default.findById(sellerId).populate("products");
        console.log(seller?.products);
        if (!seller)
            throw new AppError_1.AppError(404, "Seller not found");
        const isObjectId = mongoose_1.default.Types.ObjectId.isValid(productId);
        const query = isObjectId
            ? { _id: productId, sellerId }
            : { sku: productId, sellerId };
        console.log("Query for finding product:", query);
        const product = await productModel_1.default.findOne(query);
        if (!product)
            throw new AppError_1.AppError(404, "Product not found");
        if (product.sellerId.toString() !== sellerId) {
            throw new AppError_1.AppError(403, "Unauthorized to update this product");
        }
        if (!product)
            throw new AppError_1.AppError(404, "Product not found");
        const EditProduct = await productModel_1.default.findByIdAndUpdate(productId, {
            productName: productData.productName,
            description: productData.description,
            price: productData.price !== undefined ? Number(productData.price) : undefined,
            discount: productData.discount !== undefined ? Number(productData.discount) : undefined,
            stock: productData.stock !== undefined ? Number(productData.stock) : undefined,
            category: productData.category,
            imageUrl: productData.imageUrl,
        }, { new: true });
        return EditProduct;
    },
    // Service function to get all products with pagination
    getAllProducts: async (page, limit) => {
        const Client = await getClient();
        const cacheKey = `products:page:${page}:limit:${limit}`;
        const lockKey = `lock:${cacheKey}`;
        const FreshProduct = async () => {
            const [products, total] = await Promise.all([
                productModel_1.default.find()
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit),
                productModel_1.default.countDocuments(),
            ]);
            return { products, total };
        };
        try {
            if (!Client) {
                return await FreshProduct();
            }
            const writeCache = async (data) => {
                const payload = JSON.stringify({ data, cachedAt: Date.now() });
                try {
                    await Client.set(cacheKey, payload, { EX: Hard_TTL_Safely });
                }
                catch (error) {
                    console.log("Error writing products to cache:", error);
                }
            };
            try {
                const cached = await Client.get(cacheKey);
                if (cached) {
                    const { data, cachedAt } = JSON.parse(cached);
                    const age = (Date.now() - cachedAt) / 1000;
                    if (age < Soft_TTL_Safely) {
                        return data;
                    }
                    const acquired = await Client.set(lockKey, "locked", {
                        NX: true,
                        EX: Refresh_Lock_TTL,
                    });
                    if (acquired) {
                        FreshProduct()
                            .then(writeCache)
                            .catch((error) => {
                            console.log("Error refreshing products cache:", error);
                        })
                            .finally(() => {
                            Client.del(lockKey).catch(() => { });
                        });
                    }
                    return data;
                }
            }
            catch (error) {
                console.log("Error fetching products from cache:", error);
            }
            const acquired = await Client.set(lockKey, "locked", {
                NX: true,
                EX: Refresh_Lock_TTL,
            });
            if (!acquired) {
                await new Promise((r) => setTimeout(r, 100));
                const retryCache = await Client.get(cacheKey);
                if (retryCache)
                    return JSON.parse(retryCache).data;
            }
            try {
                const result = await FreshProduct();
                await writeCache(result);
                return result;
            }
            catch (error) {
                console.log("Error fetching products:", error);
                throw new AppError_1.AppError(500, "Failed to fetch products");
            }
            finally {
                if (acquired)
                    Client.del(lockKey).catch(() => { });
            }
        }
        catch (error) {
            console.log("fetching product", error);
            throw new AppError_1.AppError(500, "Invalid internal error");
        }
    },
    getProductById: async (productId) => {
        try {
            const isObjectId = mongoose_1.default.Types.ObjectId.isValid(productId);
            const query = isObjectId
                ? { $or: [{ _id: productId }, { sku: productId }] }
                : { sku: productId };
            const product = await productModel_1.default.findOne(query).populate("sellerId", "storeName FirstName LastName").populate("category", "categoryName");
            if (!product) {
                throw new AppError_1.AppError(404, "Product not found");
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
    getSellerProducts: async (sellerId) => {
        try {
            const products = await productModel_1.default.find({ sellerId }).populate("category", "categoryName");
            return products;
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError(500, "Failed to retrieve seller products");
        }
    },
    deleteProduct: async (sellerId, productId) => {
        try {
            const product = await productModel_1.default.findById(productId);
            if (!product) {
                throw new AppError_1.AppError(404, "Product not found");
            }
            if (product.sellerId.toString() !== sellerId) {
                throw new AppError_1.AppError(403, "Unauthorized to delete this product");
            }
            const deletedProduct = await productModel_1.default.findByIdAndDelete(productId);
            return deletedProduct;
        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            throw new AppError_1.AppError(500, "Failed to delete product");
        }
    }
};
//# sourceMappingURL=product.services.js.map