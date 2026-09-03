import Admin from "../models/adminModel";
import User from "../models/userModel";
import Seller from "../models/sellerModel";
import { IPlatformConfig } from "../types/platformConfig.types";
import { IAdmin, ISeller, IUser } from "../types/User.types";
import refreshTokenModel from "../models/refreshToken";
import { AppError } from "../utils/AppError";
import { comparePasswords } from "../utils//password.ustils";
import { signAccessToken, signRefreshToken } from "../utils/jwt.util";
import logger from "../utils/logger";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import { Platform } from "../models/paltformConfigSetting";

export const AdminService = {
  AdminLoggingin: async (email: string, password: string) => {
    try {
      const existingAdmin = await Admin.findOne({ email }).select("+password");
      if (!existingAdmin) {
        throw new AppError(401, "Invalid email or password");
      }
      if (existingAdmin.role !== "admin") {
        throw new AppError(403, "Access denied. Not an admin user");
      }
      if (existingAdmin.isBlocked) {
        throw new AppError(403, "Access denied. Admin account is blocked");
      }

      const isPasswordValid = await comparePasswords(
        password,
        existingAdmin.password,
      );
      if (!isPasswordValid) {
        throw new AppError(401, "Invalid email or password");
      }
      const accessToken = await signAccessToken({
        userId: existingAdmin.id,
        role: existingAdmin.role,
      });
      const refreshToken = await signRefreshToken({
        userId: existingAdmin.id,
        role: existingAdmin.role,
      });
      const refreshTokenDoc = new refreshTokenModel({
        refreshToken: refreshToken,
        userId: existingAdmin.id,
      });
      await refreshTokenDoc.save();
      return { accessToken, refreshToken, user: existingAdmin };
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(500, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  getAllUser: async () => {
    try {
      const getAllUsers = await User.find();
      return getAllUsers;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  // Promote User to Admin
  promoteToAdmin: async (userId: string) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new AppError(404, "User not found");

      const existingAdmin = await Admin.findOne({ user: user._id });
      if (existingAdmin) throw new AppError(400, "User is already an admin");

      const newAdmin = new Admin({
        user: user._id,
        email: user.email,
        role: "admin",
        isBlocked: false,
      });
      await newAdmin.save();
      logger.info(`User ${user.email} promoted to admin successfully`);
      return newAdmin;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  blockUser: async (userId: string): Promise<IUser> => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new AppError(404, "User not found");

      const blockUser = await User.findByIdAndUpdate(
        userId,
        { isBlocked: true },
        { new: true },
      );
      if (!blockUser) throw new AppError(500, "Failed to block user");
      logger.info(`Admin: User ${user.email} blocked successfully`);
      return blockUser;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  activateUser: async (userId: string) => {
    try {
      const user = await User.findById(userId);
      const isBlocked = user?.isBlocked;
      if (!user) throw new AppError(404, "User not found");
      if (!isBlocked) throw new AppError(400, "User is already active");
      const activateUser = await User.findByIdAndUpdate(
        userId,
        { isBlocked: false },
        { new: true },
      );
      if (!activateUser) throw new AppError(500, "Failed to activate user");
      logger.info(`Admin: User ${user.email} activated successfully`);
      return activateUser;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  // Seller Application Management
  getAllSellers: async (page: number, limit: number) => {
    try {
      const currentPage = Number.isFinite(page) && page > 0 ? page : 1;
      const pageSize = Number.isFinite(limit) && limit > 0 ? limit : 10;

      const [sellers, total] = await Promise.all([
        Seller.find()
          .select(
            "-password -refreshToken -resetPasswordToken -resetPasswordTokenExpiration -emailVerificationToken -emailVerificationTokenExpiration -forgetPasswordToken -forgetPasswordTokenExpiration",
          )
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * pageSize)
          .limit(pageSize),
        Seller.countDocuments(),
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
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getAllPendingSellerApplications: async () => {
    try {
      const applications = await Seller.find({
        applicantStatus: "pending",
      }).populate("user", "name email");
      return applications;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  approveSeller: async (sellerId: string): Promise<ISeller> => {
    try {
      const seller = await Seller.findOne({
        _id: sellerId,
        applicantStatus: "pending",
      });
      if (!seller)
        throw new AppError(
          404,
          "No pending seller application found for the user",
        );
      const approvedSeller = await Seller.findOneAndUpdate(
        { _id: sellerId, applicantStatus: "pending" },
        { applicantStatus: "approved" },
        { returnDocument: "after" },
      );
      if (!approvedSeller)
        throw new AppError(500, "Failed to approve seller application");
      return approvedSeller;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  rejectSeller: async (sellerId: string): Promise<ISeller> => {
    try {
      const seller = await Seller.findOne({
        _id: sellerId,
        applicantStatus: "pending",
      });
      if (!seller)
        throw new AppError(
          404,
          "No pending seller application found for the seller",
        );
      const rejectSeller = await Seller.findOneAndUpdate(
        { _id: sellerId, applicantStatus: "pending" },
        { applicantStatus: "rejected" },
        { returnDocument: "after" },
      );
      if (!rejectSeller)
        throw new AppError(500, "Failed to reject seller application");
      return rejectSeller;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  requestAdditionalDocuments: async (
    sellerId: string,
    message: string,
  ): Promise<ISeller> => {
    logger.info(
      `Admin requesting additional documents for seller: ${sellerId}`,
    );
    const seller = await User.findById(sellerId);
    try {
      const getSellerApplicationById = await Seller.findById(sellerId);
      if (!getSellerApplicationById)
        throw new AppError(
          404,
          "No pending seller application found for the user",
        );
      const requestAdditionalDocuments = await Seller.findOneAndUpdate(
        { _id: sellerId, applicantStatus: "pending" },
        { applicantStatus: "additional_docs_requested", notes: message },
        { returnDocument: "after" },
      );
      if (!requestAdditionalDocuments)
        throw new AppError(
          500,
          "Failed to request additional documents for seller application",
        );
      return requestAdditionalDocuments;
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  setPlatformFee: async (
    feePercentage: number,
    taxRate: number,
    adminId: string,
  ): Promise<IPlatformConfig> => {
    try {
      const admin = await Admin.findById(adminId);
      if (!admin) throw new AppError(404, "Admin not found");
      if (
        feePercentage < 0 ||
        feePercentage > 100 ||
        taxRate < 0 ||
        taxRate > 100
      )
        throw new AppError(
          400,
          "Invalid fee or tax rate  . Must be between 0 and 100",
        );

      const updatedPlatformConfig = await Platform.findOneAndUpdate(
        {},
        {
          PlatformFeePercentage: feePercentage,
          taxRate: taxRate,
          updatedBy: admin._id,
          updateAt: new Date(),
        },
        { new: true, upsert: true },
      );
      if (!updatedPlatformConfig)
        throw new AppError(500, "Failed to update platform fee");
      return updatedPlatformConfig;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  getPlatformFee: async (): Promise<IPlatformConfig> => {
    try {
      const platformFee = await Platform.findOne();
      if (!platformFee)
        throw new AppError(404, "Platform configuration not found");
      return platformFee;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  getAllSellerActiveCounts: async () => {
    try {
      const totalSellersActive = await Seller.countDocuments({
        applicantStatus: "approved",
      });
      const growthPercentage = await Seller.aggregate([
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
                  {
                    $lt: [
                      "$createdAt",
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    ],
                  },
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
                    {
                      $divide: [
                        { $subtract: ["$count", "$previousCount"] },
                        "$previousCount",
                      ],
                    },
                    100,
                  ],
                },
              ],
            },
          },
        },
      ]);
      const growth =
        growthPercentage.length > 0
          ? growthPercentage[0].growthPercentage
          : null;
      return { totalSellersActive, growth };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getAllSellerPendingCounts: async () => {
    try {
      const totalSellersPending = await Seller.countDocuments({
        applicantStatus: "pending",
      });
      return { totalSellersPending };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getSellerProductsCategory: async () => {
    try {
      const productDistribution = await Product.aggregate([
        {
          $group: {
            _id: { category: "$category", sellerId: "$sellerId" },
          },
        },
        {
          $group: {
            _id: "$_id.category",
            sellerCount: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        { $unwind: "$categoryInfo" },
        {
          $project: {
            _id: 0,
            categoryId: "$categoryInfo._id",
            categoryName: "$categoryInfo.name",
            sellerCount: 1,
          },
        },
        { $sort: { sellerCount: -1 } },
      ]);
      const total = productDistribution.reduce(
        (acc, curr) => acc + curr.sellerCount,
        0,
      );
      return {
        total,
        categories: productDistribution.map((c) => ({
          ...c,
          percentage: total > 0 ? (c.sellerCount / total) * 100 : 0,
        })),
      };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Internal Server Error");
    }
  },
  getTotalRevenueInPlatform: async () => {
    try {
      
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Invalid Server Error");
    }
  },
  getAllOrdersOnPlatform: async (
    adminId: string,
    page: number,
    limit: number,
  ) => {
    try {
      const admin = await Admin.findById(adminId);
      if (!admin)
        throw new AppError(
          403,
          "Forbidden you are not authorized to access this resources",
        );

      const currentPage = Math.max(1, parseInt(String(page), 10) || 1);
      const currentLimit = Math.min(
        Math.max(1, parseInt(String(limit), 10) || 10),
        100,
      );

      const [orders, total] = await Promise.all([
        Order.find()
          .populate("customer", "FirstName LastName email")
          .populate("orderItems.seller", "storeName email")
          .populate("orderItems.product", "productName imageUrl category")
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * currentLimit)
          .limit(currentLimit)
          .limit(currentLimit),
        Order.countDocuments(),
      ]);
      return {
        orders,
        pagination: {
          page: currentPage,
          limit: currentPage,
          total,
          totalPage: Math.ceil(total / currentLimit),
        },
      };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Invalid Server Error");
    }
  },
};
