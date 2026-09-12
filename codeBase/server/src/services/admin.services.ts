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
import { BankAccountStatus, TransactionStatus } from "../types/wallet.types";
import { Wallet } from "../models/wallet.model";

export const AdminService = {
  AdminLoggingin: async (email: string, password: string) => {
    try {
      const existingAdmin = await Admin.findOne({ email }).select("+password");
      if (!existingAdmin) return;
      if (existingAdmin.role !== "admin") return;
      if (existingAdmin.isBlocked) return;

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
      if (!user) return;

      const existingAdmin = await Admin.findOne({ user: user._id });
      if (existingAdmin) return;

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
  blockUser: async (userId: string)=> {
    try {
      const user = await User.findById(userId);
      if (!user) return;

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
      if (!user) return;
      if (!isBlocked) return;
      const activateUser = await User.findByIdAndUpdate(
        userId,
        { isBlocked: false },
        { new: true },
      );
      if (!activateUser) return;
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
      if (!seller) throw new AppError(404, "Pending seller not found");
      const approvedSeller = await Seller.findOneAndUpdate(
        { _id: sellerId, applicantStatus: "pending" },
        { applicantStatus: "approved" },
        { returnDocument: "after" },
      );
      if (!approvedSeller)
        throw new AppError(409, "Seller could not be approved");
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
      if (!seller) throw new AppError(404, "Pending seller not found");
      const rejectSeller = await Seller.findOneAndUpdate(
        { _id: sellerId, applicantStatus: "pending" },
        { applicantStatus: "rejected" },
        { returnDocument: "after" },
      );
      if (!rejectSeller)
        throw new AppError(409, "Seller could not be rejected");
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
      if (!getSellerApplicationById) throw new AppError(404, "Seller application not found");
      const requestAdditionalDocuments = await Seller.findOneAndUpdate(
        { _id: sellerId, applicantStatus: "pending" },
        { applicantStatus: "additional_docs_requested", notes: message },
        { returnDocument: "after" },
      );
      if (!requestAdditionalDocuments) throw new AppError(409, "Request for additional documents could not be sent");
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
            categoryName: "$categoryInfo.categoryName",
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
      const totalRevenue = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]);
      const revenue =
        totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;
      return { totalRevenue: revenue };
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
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (error) {
      if (error instanceof AppError)
        throw new AppError(error.statusCode, error.message);
      throw new AppError(500, "Invalid Server Error");
    }
  },
  verifySellerBankAccount: async (
    sellerId: string,
    decision: "verified" | "rejected",
  ) => {
    try {
      const seller = await Seller.findById(sellerId).select("bankAccount");
      if (!seller) throw new AppError(404, "Seller not found");
      if (!seller.bankAccount || !seller.bankAccount.last4) {
        throw new AppError(400, "Seller does not have a bank account linked");
      }
      seller.bankAccount.status =
        decision === "verified"
          ? BankAccountStatus.VERIFIED
          : BankAccountStatus.REJECTED;
      await seller.save();
      return seller;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Internal server error");
    }
  },
  getAllSellerWithdrawlRequests: async (
    page: number,
    limit: number,
    status: "pending" | "completed" | "failed" | "rejected" | "all",
  ) => {
    try {
      const currentPage = Math.max(1, parseInt(String(page), 10) || 1);
      const currentLimit = Math.min(
        Math.max(1, parseInt(String(limit), 10) || 10),
        100,
      );
      const statusMatch =
        status && status !== "all"
          ? { "transactionHistory.status": status }
          : {};
      const pipeline = [
        { $unwind: "$transactionHistory" },
        { $match: statusMatch },
        { $sort: { "transactionHistory.date": -1 as const } },
        {
          $facet: {
            data: [
              { $skip: (currentPage - 1) * currentLimit },
              { $limit: currentLimit },
            ],
            totalCounts: [{ $count: "count" }],
          },
        },
      ];

      const result = await Wallet.aggregate(pipeline);
      const withdrawalRequests = result[0]?.data || [];
      const total = result[0]?.totalCounts?.[0]?.count || 0;

      await Wallet.populate(withdrawalRequests, {
        path: "seller",
        select: "FirstName LastName email storeName bankAccount",
      });

      return {
        withdrawalRequests,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total,
          totalPages: Math.ceil(total / currentLimit),
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Internal server error");
    }
  },
  approveSellerWithdrawalRequest: async (
    sellerId: string,
    transactionId: string,
    decision: "approved" | "rejected",
  ) => {
    try {
      const wallet = await Wallet.findOne({ seller: sellerId });
      if (!wallet) return;
      const transaction = wallet.transactionHistory.find(
        (t) => t.id === transactionId,
      );
      if (!transaction) throw new AppError(404, "Transaction not found");
      transaction.status =
        decision === "approved"
          ? TransactionStatus.completed
          : TransactionStatus.failed;

      await wallet.save();
      return wallet;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Invalid Server Error");
    }
  },
  getTotalSales: async () => {
    try {
      const totalSales = await Order.aggregate([
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalAmount" },
          },
        },
      ]);
      const sales = totalSales.length > 0 ? totalSales[0].totalSales : 0;
      return { totalSales: sales };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Invalid Server Error");
    }
  },
  getWithdrawalCompletedCount: async () => {
    try {
      const completedCount = await Wallet.find({
        "transactionHistory.status": TransactionStatus.completed,
      }).countDocuments();
      return { completedCount };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Invalid Server Error");
    }
  },
  getPendingWithdrawalCount: async () => {
    try {
      const pendingCount = await Wallet.find({
        "transactionHistory.status": TransactionStatus.pending,
      }).countDocuments();
      return { pendingCount };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Invalid Server Error");
    }
  },
};
