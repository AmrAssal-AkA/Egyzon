"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const paltformConfigSetting_1 = require("../models/paltformConfigSetting");
const refreshToken_1 = __importDefault(require("../models/refreshToken"));
const AppError_1 = require("../utils/AppError");
const password_ustils_1 = require("../utils//password.ustils");
const jwt_util_1 = require("../utils/jwt.util");
const logger_1 = __importDefault(require("../utils/logger"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
exports.AdminService = {
    AdminLoggingin: async (email, password) => {
        try {
            const existingAdmin = await adminModel_1.default.findOne({ email }).select("+password");
            if (!existingAdmin) {
                throw new AppError_1.AppError(401, "Invalid email or password");
            }
            if (existingAdmin.role !== "admin") {
                throw new AppError_1.AppError(403, "Access denied. Not an admin user");
            }
            if (existingAdmin.isBlocked) {
                throw new AppError_1.AppError(403, "Access denied. Admin account is blocked");
            }
            const isPasswordValid = await (0, password_ustils_1.comparePasswords)(password, existingAdmin.password);
            if (!isPasswordValid) {
                throw new AppError_1.AppError(401, "Invalid email or password");
            }
            const accessToken = await (0, jwt_util_1.signAccessToken)({
                userId: existingAdmin.id,
                role: existingAdmin.role,
            });
            const refreshToken = await (0, jwt_util_1.signRefreshToken)({
                userId: existingAdmin.id,
                role: existingAdmin.role,
            });
            const refreshTokenDoc = new refreshToken_1.default({
                refreshToken: refreshToken,
                userId: existingAdmin.id,
            });
            await refreshTokenDoc.save();
            return { accessToken, refreshToken, user: existingAdmin };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(500, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getAllUser: async () => {
        try {
            const getAllUsers = await userModel_1.default.find();
            return getAllUsers;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    // Promote User to Admin
    promoteToAdmin: async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId);
            if (!user)
                throw new AppError_1.AppError(404, "User not found");
            const existingAdmin = await adminModel_1.default.findOne({ user: user._id });
            if (existingAdmin)
                throw new AppError_1.AppError(400, "User is already an admin");
            const newAdmin = new adminModel_1.default({
                user: user._id,
                email: user.email,
                role: "admin",
                isBlocked: false,
            });
            await newAdmin.save();
            logger_1.default.info(`User ${user.email} promoted to admin successfully`);
            return newAdmin;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(error.statusCode, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    blockUser: async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId);
            if (!user)
                throw new AppError_1.AppError(404, "User not found");
            const blockUser = await userModel_1.default.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
            if (!blockUser)
                throw new AppError_1.AppError(500, "Failed to block user");
            logger_1.default.info(`Admin: User ${user.email} blocked successfully`);
            return blockUser;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(error.statusCode, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    activateUser: async (userId) => {
        try {
            const user = await userModel_1.default.findById(userId);
            const isBlocked = user?.isBlocked;
            if (!user)
                throw new AppError_1.AppError(404, "User not found");
            if (!isBlocked)
                throw new AppError_1.AppError(400, "User is already active");
            const activateUser = await userModel_1.default.findByIdAndUpdate(userId, { isBlocked: false }, { new: true });
            if (!activateUser)
                throw new AppError_1.AppError(500, "Failed to activate user");
            logger_1.default.info(`Admin: User ${user.email} activated successfully`);
            return activateUser;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    // Seller Application Management
    getAllSellers: async (page, limit) => {
        try {
            const currentPage = Number.isFinite(page) && page > 0 ? page : 1;
            const pageSize = Number.isFinite(limit) && limit > 0 ? limit : 10;
            const [sellers, total] = await Promise.all([
                sellerModel_1.default.find()
                    .select("-password -refreshToken -resetPasswordToken -resetPasswordTokenExpiration -emailVerificationToken -emailVerificationTokenExpiration -forgetPasswordToken -forgetPasswordTokenExpiration")
                    .sort({ createdAt: -1 })
                    .skip((currentPage - 1) * pageSize)
                    .limit(pageSize),
                sellerModel_1.default.countDocuments(),
            ]);
            return {
                sellers,
                pagination: {
                    page: currentPage,
                    limit: pageSize,
                    total,
                    totalPages: Math.ceil(total / pageSize),
                },
            };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getAllPendingSellerApplications: async () => {
        try {
            const applications = await sellerModel_1.default.find({
                applicantStatus: "pending",
            }).populate("user", "name email");
            return applications;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(error.statusCode, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    approveSeller: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findOne({
                _id: sellerId,
                applicantStatus: "pending",
            });
            if (!seller)
                throw new AppError_1.AppError(404, "No pending seller application found for the user");
            const approvedSeller = await sellerModel_1.default.findOneAndUpdate({ _id: sellerId, applicantStatus: "pending" }, { applicantStatus: "approved" }, { returnDocument: "after" });
            if (!approvedSeller)
                throw new AppError_1.AppError(500, "Failed to approve seller application");
            return approvedSeller;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    rejectSeller: async (sellerId) => {
        try {
            const seller = await sellerModel_1.default.findOne({
                _id: sellerId,
                applicantStatus: "pending",
            });
            if (!seller)
                throw new AppError_1.AppError(404, "No pending seller application found for the seller");
            const rejectSeller = await sellerModel_1.default.findOneAndUpdate({ _id: sellerId, applicantStatus: "pending" }, { applicantStatus: "rejected" }, { returnDocument: "after" });
            if (!rejectSeller)
                throw new AppError_1.AppError(500, "Failed to reject seller application");
            return rejectSeller;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    requestAdditionalDocuments: async (sellerId, message) => {
        logger_1.default.info(`Admin requesting additional documents for seller: ${sellerId}`);
        const seller = await userModel_1.default.findById(sellerId);
        try {
            const getSellerApplicationById = await sellerModel_1.default.findById(sellerId);
            if (!getSellerApplicationById)
                throw new AppError_1.AppError(404, "No pending seller application found for the user");
            const requestAdditionalDocuments = await sellerModel_1.default.findOneAndUpdate({ _id: sellerId, applicantStatus: "pending" }, { applicantStatus: "additional_docs_requested", notes: message }, { returnDocument: "after" });
            if (!requestAdditionalDocuments)
                throw new AppError_1.AppError(500, "Failed to request additional documents for seller application");
            return requestAdditionalDocuments;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    setPlatformFee: async (feePercentage, taxRate, adminId) => {
        try {
            const admin = await adminModel_1.default.findById(adminId);
            if (!admin)
                throw new AppError_1.AppError(404, "Admin not found");
            if (feePercentage < 0 ||
                feePercentage > 100 ||
                taxRate < 0 ||
                taxRate > 100)
                throw new AppError_1.AppError(400, "Invalid fee or tax rate  . Must be between 0 and 100");
            const updatedPlatformConfig = await paltformConfigSetting_1.PlatformConfigSetting.findOneAndUpdate({}, {
                PlatformFeePercentage: feePercentage,
                taxRate: taxRate,
                updatedBy: admin._id,
                updateAt: new Date(),
            }, { new: true, upsert: true });
            if (!updatedPlatformConfig)
                throw new AppError_1.AppError(500, "Failed to update platform fee");
            return updatedPlatformConfig;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(error.statusCode, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getPlatformFee: async () => {
        try {
            const platformFee = await paltformConfigSetting_1.PlatformConfigSetting.findOne();
            if (!platformFee)
                throw new AppError_1.AppError(404, "Platform configuration not found");
            return platformFee;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw new AppError_1.AppError(error.statusCode, error.message);
            }
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getAllSellerActiveCounts: async () => {
        try {
            const totalSellersActive = await sellerModel_1.default.countDocuments({ applicantStatus: "approved" });
            const growthPercentage = await sellerModel_1.default.aggregate([
                {
                    $match: { applicantStatus: "approved" },
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        previousCount: {
                            $sum: {
                                $cond: [
                                    { $lt: ["$createdAt", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] },
                                    1,
                                    0,
                                ],
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        growthPercentage: {
                            $cond: [
                                { $eq: ["$previousCount", 0] },
                                null,
                                {
                                    $multiply: [
                                        { $divide: [{ $subtract: ["$count", "$previousCount"] }, "$previousCount"] },
                                        100,
                                    ],
                                },
                            ],
                        },
                    },
                },
            ]);
            const growth = growthPercentage.length > 0 ? growthPercentage[0].growthPercentage : null;
            return { totalSellersActive, growth };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getAllSellerPendingCounts: async () => {
        try {
            const totalSellersPending = await sellerModel_1.default.countDocuments({ applicantStatus: "pending" });
            return { totalSellersPending };
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getSellerProductsCategory: async () => {
        try {
            const getCategoryTypes = await categoryModel_1.default.find().select("categoryName");
            return getCategoryTypes;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    }
};
//# sourceMappingURL=admin.services.js.map