"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const AppError_1 = require("../utils/AppError");
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
            const newProduct = await productModel_1.default.create({
                ...productData,
                SellerId: sellerId,
            });
            const existingProduct = await productModel_1.default.findOne({
                productId: newProduct.productId,
                SellerId: sellerId,
            });
            if (existingProduct) {
                throw new AppError_1.AppError(400, "Product already exists");
            }
            return newProduct;
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError(500, "Failed to create product");
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
        const Client = await getClient();
        const cacheKey = `products:page:${page}:limit:${limit}`;
        const lockKey = `lock:${cacheKey}`;
        try {
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
            const product = await productModel_1.default.findOne({ productId });
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
};
//# sourceMappingURL=product.services.js.map