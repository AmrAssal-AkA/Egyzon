import express, { type Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

import {
  LoginSchema,
  RegisterSchema,
  updateUserSchema,
  forgetPasswordSchema,
  resetPasswordSchema
} from "../validators/user.validate";
import { validate } from "../middleware/validate";
import RegisterUser from "../controller/authentication/Register";
import LoginUser from "../controller/authentication/login";
import onBoarding from "../controller/authentication/onBoarding";
import RefreshToken from "../controller/authentication/refresh";
import verifyEmail from "../controller/authentication/verifyEmail";
import googleCallback from "../controller/authentication/continueWithGoogle";
import { sendSuccessResponse, sendErrorResponse } from "../utils/Responses";
import { verifyRefreshToken } from "../utils/jwt.util";
import User from "../models/userModel";
import { isAuthenticated } from "../middleware/Auth.middleware";
import type { jwtPayload } from "../types/auth.types";
import { passportAuthMW } from "../middleware/passportAuthMW";
import { RequestForgetPassword, ForgetPassword } from "../controller/authentication/forgetPassword";
import {authLimiter} from '../middleware/rateLimiter'
import RefreshTokenModel from "../models/refreshToken";

const router = express.Router();

router.get("/me", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = (req.user as jwtPayload | undefined)?.userId;
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }
    return res.json({ success: true, data: user });
  } catch (err) {
    return sendErrorResponse(res, 500, "Internal Server Error", err);
  }
});

// Register route
router.post(
  "/register",
  validate(RegisterSchema),
  authLimiter,
  (req: Request, res: Response) => {
    const userData = req.body;
    RegisterUser(userData, res, req);
  },
);
// Login route
router.post("/login",authLimiter, validate(LoginSchema), LoginUser);
// Refresh token route
router.patch(
  "/onBoarding",
  validate(updateUserSchema),
  isAuthenticated,
  onBoarding,
);
// Refresh token route
router.post("/refresh", RefreshToken);

// Logout route
router.post("/logout",async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refresh_token"];

  if (!refreshToken) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return sendSuccessResponse(res, 200, "Logged out successfully");
  }
  try {
    let userId: string | undefined;
    try {
      const decoded = verifyRefreshToken(refreshToken);
      userId = decoded.userId;
    } catch {
      const decodedExpire = jwt.decode(refreshToken) as {
        userId: string;
        exp: number;
      };
      if (decodedExpire && decodedExpire.userId) {
        userId = decodedExpire.userId;
      }
    }
    if (userId) {
        await RefreshTokenModel.deleteOne({ userId: userId, refreshToken: refreshToken });
    }
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return sendSuccessResponse(res, 200, "Logged out successfully");
  } catch (err) {
    return sendErrorResponse(res, 500, "Internal Server Error", err);
  }
});
// Email verification route
router.get("/verify-email",  verifyEmail);

router.get(
  "/continue-with-google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get( "/google/callback", passportAuthMW, googleCallback);
router.post('/forget-password', validate(forgetPasswordSchema),RequestForgetPassword);
router.patch('/reset-password', validate(resetPasswordSchema), ForgetPassword);

export default router;
