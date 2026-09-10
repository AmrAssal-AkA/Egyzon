import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../utils/jwt.util";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/Responses";
import User from "../../models/userModel";
import RefreshTokenModel from "../../models/refreshToken";

const RefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken) {
    return res.status(404).json({ message: "Refresh token not found" });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const newAccessToken = await signAccessToken({
      userId: user.id,
      role: user.role,
    });
    const newRefreshToken = await signRefreshToken({
      userId: user.id,
      role: user.role,
    });

    const RefreshTokenDoc = new RefreshTokenModel({
      refreshToken: newRefreshToken,
      userId: user.id,
    });
    await RefreshTokenDoc.save();

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    sendSuccessResponse(res, 200, "Token refreshed successfully", {
      accessToken: newAccessToken,
    });
  } catch (err) {
    sendErrorResponse(res, 500, "Internal Server Error", err);
  }
};

export default RefreshToken;
