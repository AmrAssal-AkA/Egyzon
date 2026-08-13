"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const refreshToken_1 = __importDefault(require("../models/refreshToken"));
const AppError_1 = require("../utils/AppError");
const password_ustils_1 = require("../utils//password.ustils");
const jwt_util_1 = require("../utils/jwt.util");
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
    approveSeller: async (userId) => {
        const user = await userModel_1.default.findById(userId);
        if (!user)
            throw new AppError_1.AppError(404, "User not found");
        const sellerApplication = await sellerModel_1.default.findOne({
            user: userId,
            applicantStatus: "pending",
        });
        if (!sellerApplication)
            throw new AppError_1.AppError(404, "no Applications Seller needs to review and approve");
        const approveSeller = await sellerModel_1.default.findOneAndUpdate({ user: userId, applicantStatus: "pending" }, { applicantStatus: "approved" }, { new: true });
        if (!approveSeller)
            throw new AppError_1.AppError(500, "Failed to approve seller application");
        return approveSeller;
    },
    rejectSeller: async (userId) => {
        const user = await userModel_1.default.findById(userId);
        if (!user)
            throw new AppError_1.AppError(404, "User not found");
        try {
            const getSellerApplication = await sellerModel_1.default.findOne({
                user: userId,
                applicantStatus: "pending",
            });
            if (!getSellerApplication)
                throw new AppError_1.AppError(404, "No pending seller application found for the user");
            const rejectSeller = await sellerModel_1.default.findOneAndUpdate({ user: userId, applicantStatus: "pending" }, { applicantStatus: "rejected" }, { new: true });
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
    requestAdditionalDocuments: async (userId, message) => {
        const user = await userModel_1.default.findById(userId);
        try {
            const getSellerApplicationById = await sellerModel_1.default.findById(user);
            if (!getSellerApplicationById)
                throw new AppError_1.AppError(404, "No pending seller application found for the user");
            const requestAdditionalDocuments = await sellerModel_1.default.findOneAndUpdate({ user, applicantStatus: "pending" }, { applicantStatus: "additional_docs_requested", notes: message }, { new: true });
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
};
//# sourceMappingURL=admin.services.js.map