"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerServices = void 0;
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const admin_services_1 = require("./admin.services");
const AppError_1 = require("../utils/AppError");
const SellerApplyApplicant_1 = require("../templates/SellerApplyApplicant");
exports.SellerServices = {
    ApplyAsPartner: async (sellerData, userId) => {
        const userModel = sellerModel_1.default.db.model("User");
        const user = await userModel.findById(userId);
        if (!user)
            throw new AppError_1.AppError(404, "User not found");
        if (user.role === "seller")
            throw new AppError_1.AppError(400, "User is already a seller");
        const SaveSellerData = await userModel.collection.findOneAndUpdate({ _id: user._id }, {
            $set: {
                role: "seller",
                storeName: sellerData.storeName,
                commercialRegisterNumber: sellerData.commercialRegisterNumber,
                taxCardNumber: sellerData.taxCardNumber,
                sellerDocuments: sellerData.sellerDocuments,
                applicantStatus: "pending",
            },
        }, { returnDocument: "after" });
        console.log("SaveSellerData:", SaveSellerData);
        try {
            await (0, SellerApplyApplicant_1.SellerApplyApplicantTemplate)(user.email, user.FirstName, sellerData.storeName);
        }
        catch (err) {
            console.error("Error sending email to applicant:", err);
        }
        return SaveSellerData;
    },
    checkExistingSeller: async (userId) => {
        const user = await userModel_1.default.findById(userId);
        console.log("user:", user);
        if (!user)
            throw new AppError_1.AppError(404, "user not found");
        const existingSeller = await sellerModel_1.default.findOne({ user: user._id });
        if (existingSeller)
            throw new AppError_1.AppError(400, "User has already applied to be a seller");
        return existingSeller;
    },
    setupStore: async (storeData, userId) => {
        try {
            const seller = await sellerModel_1.default.findOne({ user: userId });
            if (!seller) {
                throw new AppError_1.AppError(404, "Seller not found");
            }
            if (seller.applicantStatus !== "approved") {
                throw new AppError_1.AppError(403, "Seller is not approved to set up a store");
            }
            const { storeLogo, storeBanner, storeDescription, storeType, storephysicalAddress, storeOnlineAddress, } = storeData;
            seller.storeManagement = {
                storeLogo,
                storeBanner,
                storeDescription,
                storeType,
                storephysicalAddress,
                storeOnlineAddress,
            };
            await seller.save();
            return seller;
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getTotalProductsBySeller: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                throw new AppError_1.AppError(404, "Seller not found");
            const totalProductCounts = await productModel_1.default.countDocuments({
                sellerId: seller.id,
            });
            return { totalProductCounts };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(error.statusCode, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getTotalOrder: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                throw new AppError_1.AppError(404, "Seller not found");
            const getProducts = await productModel_1.default.find({ sellerId: seller.id });
            const productIds = getProducts.map((product) => product._id);
            const totalOrders = await orderModel_1.default.countDocuments({
                "orderItems.product": { $in: productIds },
            });
            return { totalOrders };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getTotalRevenue: async (sellerId) => {
        const seller = await sellerModel_1.default.findById(sellerId);
        if (!seller)
            throw new AppError_1.AppError(404, "Seller not found");
        const getPlatformFee = await admin_services_1.AdminService.getPlatformFee();
        try {
            const getProducts = await productModel_1.default.find({ sellerId: seller.id });
            const productIds = getProducts.map((product) => product._id.toString());
            const orders = await orderModel_1.default.find({
                "orderItems.product": { $in: productIds },
            });
            const subRevenue = orders.reduce((total, order) => {
                const orderTotal = order.orderItems.reduce((orderSum, item) => {
                    if (productIds.includes(item.product.toString())) {
                        return orderSum + item.unitPrice * item.quantity;
                    }
                    return orderSum;
                }, 0);
                return total + orderTotal;
            }, 0);
            const platformFeePercentage = getPlatformFee.PlatformFeePercentage;
            const PlatformFee = (subRevenue * platformFeePercentage) / 100;
            const totalRevenue = subRevenue - PlatformFee;
            return { totalRevenue };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getTopProductsByRevenue: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                throw new AppError_1.AppError(404, "Seller not found");
            const getProducts = await productModel_1.default.find({ sellerId: seller.id });
            const productIds = getProducts.map((product) => product._id.toString());
            const orders = await orderModel_1.default.find({
                "orderItems.product": { $in: productIds },
            });
            const productRevenueMap = {};
            const productSalesMap = {};
            orders.forEach((order) => {
                order.orderItems.forEach((item) => {
                    if (productIds.includes(item.product.toString())) {
                        const productId = item.product.toString();
                        const revenue = item.unitPrice * item.quantity;
                        productRevenueMap[productId] =
                            (productRevenueMap[productId] || 0) + revenue;
                        productSalesMap[productId] =
                            (productSalesMap[productId] || 0) + item.quantity;
                    }
                });
            });
            const topProducts = Object.entries(productRevenueMap)
                .sort(([, revenueA], [, revenueB]) => revenueB - revenueA)
                .slice(0, 5)
                .map(([productId, revenue]) => {
                const product = getProducts.find((p) => p._id.toString() === productId);
                return {
                    productId,
                    name: product?.productName ?? "Unknown product",
                    image: product?.imageUrl?.[0] ?? null,
                    sales: productSalesMap[productId] ?? 0,
                    revenue,
                };
            });
            return topProducts;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getAllOrders: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                throw new AppError_1.AppError(404, "Seller not found");
            const getProducts = await productModel_1.default.find({ sellerId: seller.id }).lean();
            const productIds = getProducts.map((product) => product._id.toString());
            const orders = await orderModel_1.default.find({
                "orderItems.product": { $in: productIds },
            });
            return orders;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server error");
        }
    },
    totalInventoryValue: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller || seller.role !== "seller")
                throw new AppError_1.AppError(403, "Forbidden, You are not authorized to access this resource");
            const products = await productModel_1.default.find({ sellerId: seller.id });
            const totalInventoryValue = products.reduce((total, product) => {
                return total + product.price * (product.stock || 0);
            }, 0);
            return { totalInventoryValue };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "internal Server Error");
        }
    },
    // seller should change order status from pending to process to shipped only
    changeOrderStatus: async (sellerId, orderId, newStatus) => {
        try {
            const seller = await sellerModel_1.default.findById(sellerId);
            if (!seller)
                throw new AppError_1.AppError(404, "Seller not found");
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
};
//# sourceMappingURL=seller.services.js.map