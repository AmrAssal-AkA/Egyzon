import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
// Import necessary modules and utilities
import User from "../../models/userModel";
import { hashPassword } from "../../utils/password.ustils";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.util";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/Responses";
import { generateToken } from "../../utils/cryptoTokens";
import verifyEmailTemplate from "../../templates/verifyEmailTemplate";
import RefreshTokenModel from "../../models/refreshToken";
import logger from "../../utils/logger";

const RegisterUser = async (userData: any, res: Response, req: Request) => {
  try {
    const { FirstName, LastName, email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = await signAccessToken({
      userId: newUser.id,
      role: newUser.role,
    });
    const refreshToken = await signRefreshToken({
      userId: newUser.id,
      role: newUser.role,
    });
    const refreshTokenDoc = new RefreshTokenModel({
      refreshToken: refreshToken,
      userId: newUser.id,
    });
    await refreshTokenDoc.save();
    const emailToken = generateToken();
    const {
      token: emailTokenValue,
      hashedToken,
      expiration,
    } = JSON.parse(emailToken);
    newUser.emailVerificationToken = hashedToken;
    newUser.emailVerificationTokenExpiration = expiration;
  
    await newUser.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/verifyEmail?token=${emailTokenValue}`;
    // Send verification email
    try {
      verifyEmailTemplate(email, verificationUrl);
    }catch (err) {
      logger.error("Error sending verification email:", err);
    }
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15 ,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Send success response with token and refresh token
    sendSuccessResponse(res, 201, "User created successfully", {
      token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    sendErrorResponse(res, 500, "Something went wrong", (err as Error).message);
    return;
  }
};

export default RegisterUser;
