import type { Request, Response } from "express";


import { forgetPasswordTemplate } from "../../templates/forgetPassword";
import { hashPassword } from "../../utils/password.ustils";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/Responses";
import { AppError } from "../../utils/AppError";
import User from "../../models/userModel";
import { generateToken, hashToken } from "../../utils/cryptoTokens";
import logger from "../../utils/logger";

const RequestForgetPassword = async (req: Request, res: Response) => {
  try {
    const { emailAddress } = req.body;
    if (!emailAddress)
      return sendErrorResponse(res, 404, "the emailAddress notFound");

    const user = await User.findOne({ email: emailAddress });
    if (!user) return sendErrorResponse(res, 404, "the user notFound");

    const { token, hashedToken, expiration } = JSON.parse(generateToken());
    user.forgetPasswordToken = hashedToken;
    user.forgetPasswordTokenExpiration = expiration;
    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/forgetPassword/resetPassword?token=${token}&email=${emailAddress}`;
    try {
          await forgetPasswordTemplate(emailAddress, token, resetPasswordUrl);
    } catch (error) {
      logger.error("Error sending email:", error);
      return sendErrorResponse(res, 500, "Failed to send reset password email");
    }

    return sendSuccessResponse(
      res,
      200,
      "Reset password email sent successfully",
      { token },
    );
  } catch (error) {
    if (error instanceof AppError)
      return sendErrorResponse(res, error.statusCode, error.message);
    return sendErrorResponse(res, 500, "Internal server Error");
  }
};

const ForgetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.query?.token ?? req.params?.token ?? (process.env.NODE_ENV === "production" ? req.body?.token : undefined); 
    if (!token) return sendErrorResponse(res, 404, "the token notFound");
    const hashedToken = hashToken(token);
    const user = await User.findOne({ forgetPasswordToken: hashedToken });
    if (!user) return sendErrorResponse(res, 404, "the user notFound");
    if (
      user.forgetPasswordTokenExpiration &&
      user.forgetPasswordTokenExpiration < new Date()
    )
      return sendErrorResponse(res, 400, "the token is expired");

    const { newPassword, confirmNewPassword } = req.body;
    if (
      newPassword !== confirmNewPassword ||
      newPassword.length < 8 ||
      newPassword.trim() === ""
    )
      return sendErrorResponse(
        res,
        400,
        "the newPassword and confirmNewPassword are not match or invalid",
      );

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await User.deleteMany({
      forgetPasswordToken: hashedToken,
      forgetPasswordTokenExpiration: { $lt: new Date() },
    });
    await user.save();
    return sendSuccessResponse(res, 200, "Password reset successfully");
  } catch (error) {
    if (error instanceof AppError)
      return sendErrorResponse(res, error.statusCode, error.message);
    return sendErrorResponse(res, 500, "Internal server Error");
  }
};

export { RequestForgetPassword, ForgetPassword };