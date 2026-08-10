import Admin from "../models/adminModel";
import User from "../models/userModel";
import Seller from "../models/sellerModel";
import { IAdmin, ISeller, IUser } from "../types/User.types";
import refreshTokenModel from "../models/refreshToken";
import { AppError } from "../utils/AppError";
import { comparePasswords } from "../utils//password.ustils";
import { signAccessToken, signRefreshToken } from "../utils/jwt.util";

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
      return newAdmin;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  // Block User
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
      return blockUser;
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError(error.statusCode, error.message);
      }
      throw new AppError(500, "Internal Server Error");
    }
  },
  // Seller Application Management
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
  approveSeller: async (userId: string): Promise<ISeller> => {
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "User not found");

    const sellerApplication = await Seller.findOne({
      user: userId,
      applicantStatus: "pending",
    });
    if (!sellerApplication)
      throw new AppError(
        404,
        "no Applications Seller needs to review and approve",
      );

    const approveSeller = await Seller.findOneAndUpdate(
      { user: userId, applicantStatus: "pending" },
      { applicantStatus: "approved" },
      { new: true },
    );
    if (!approveSeller)
      throw new AppError(500, "Failed to approve seller application");
    return approveSeller;
  },
  rejectSeller: async (userId: string): Promise<ISeller> => {
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "User not found");
    try {
      const getSellerApplication = await Seller.findOne({
        user: userId,
        applicantStatus: "pending",
      });
      if (!getSellerApplication)
        throw new AppError(
          404,
          "No pending seller application found for the user",
        );

      const rejectSeller = await Seller.findOneAndUpdate(
        { user: userId, applicantStatus: "pending" },
        { applicantStatus: "rejected" },
        { new: true },
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
  requestAdditionalDocuments: async (userId: string, message: string): Promise<ISeller> => {
    const user = await User.findById(userId);
    try {
      const getSellerApplicationById = await Seller.findById(user);
      if (!getSellerApplicationById)
        throw new AppError(
          404,
          "No pending seller application found for the user",
        );
      const requestAdditionalDocuments = await Seller.findOneAndUpdate(
        { user, applicantStatus: "pending" },
        { applicantStatus: "additional_docs_requested", notes: message },
        { new: true },
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
};
