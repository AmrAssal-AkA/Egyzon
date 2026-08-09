import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../../models/userModel";
import { comparePasswords } from "../../utils/password.ustils";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.util";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/Responses";
import refreshTokenModel from "../../models/refreshToken";

const LoginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // Check if user exists and validate credentials
    if (!user) return sendErrorResponse(res, 404, "User not found");
    if (user.isBlocked) return sendErrorResponse(res, 403, "This account has been blocked");
    if (user.googleId && !user.password) return sendErrorResponse(res, 400, "This account is registered with Google. Please use Google login."); 
    // Validate password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) return sendErrorResponse(res, 401, "Invalid password");


    const token = await signAccessToken({ userId: user.id, role: user.role });
    const refreshToken = await signRefreshToken({
      userId: user.id,
      role: user.role,
    });

    const refreshTokenDoc = new refreshTokenModel({
      refreshToken: refreshToken,
      userId: user.id,
    });
    await refreshTokenDoc.save();

    res.cookie("Access_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    sendSuccessResponse(res, 200, "Login successful", { token, refreshToken });
  } catch (err) {
    sendErrorResponse(res, 500, "Something went wrong", (err as Error).message);
  }
};

export default LoginUser;
