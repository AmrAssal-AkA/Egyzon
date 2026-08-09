"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPassword = exports.RequestForgetPassword = void 0;
const forgetPassword_1 = require("../../templates/forgetPassword");
const password_ustils_1 = require("../../utils/password.ustils");
const Responses_1 = require("../../utils/Responses");
const AppError_1 = require("../../utils/AppError");
const userModel_1 = __importDefault(require("../../models/userModel"));
const cryptoTokens_1 = require("../../utils/cryptoTokens");
const RequestForgetPassword = async (req, res) => {
    try {
        const { emailAddress } = req.body;
        if (!emailAddress)
            return (0, Responses_1.sendErrorResponse)(res, 404, "the emailAddress notFound");
        const user = await userModel_1.default.findOne({ email: emailAddress });
        if (!user)
            return (0, Responses_1.sendErrorResponse)(res, 404, "the user notFound");
        const { token, haashedToken, expiration } = JSON.parse((0, cryptoTokens_1.generateToken)());
        user.forgetPasswordToken = haashedToken;
        user.forgetPasswordTokenExpiration = expiration;
        await user.save();
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/forgetPassword/resetPassword?token=${token}&email=${emailAddress}`;
        await (0, forgetPassword_1.forgetPasswordTemplate)(emailAddress, token, resetPasswordUrl);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Reset password email sent successfully", { token });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal server Error");
    }
};
exports.RequestForgetPassword = RequestForgetPassword;
const ForgetPassword = async (req, res) => {
    try {
        const token = req.query?.token ?? req.params?.token ?? (process.env.NODE_ENV === "production" ? req.body?.token : undefined);
        if (!token)
            return (0, Responses_1.sendErrorResponse)(res, 404, "the token notFound");
        const hashedToken = (0, cryptoTokens_1.hashToken)(token);
        const user = await userModel_1.default.findOne({ forgetPasswordToken: hashedToken });
        if (!user)
            return (0, Responses_1.sendErrorResponse)(res, 404, "the user notFound");
        if (user.forgetPasswordTokenExpiration &&
            user.forgetPasswordTokenExpiration < new Date())
            return (0, Responses_1.sendErrorResponse)(res, 400, "the token is expired");
        const { newPassword, confirmNewPassword } = req.body;
        if (newPassword !== confirmNewPassword ||
            newPassword.length < 8 ||
            newPassword.trim() === "")
            return (0, Responses_1.sendErrorResponse)(res, 400, "the newPassword and confirmNewPassword are not match or invalid");
        const hashedPassword = await (0, password_ustils_1.hashPassword)(newPassword);
        user.password = hashedPassword;
        await userModel_1.default.deleteMany({
            forgetPasswordToken: hashedToken,
            forgetPasswordTokenExpiration: { $lt: new Date() },
        });
        await user.save();
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Password reset successfully");
    }
    catch (error) {
        if (error instanceof AppError_1.AppError)
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal server Error");
    }
};
exports.ForgetPassword = ForgetPassword;
//# sourceMappingURL=forgetPassword.js.map