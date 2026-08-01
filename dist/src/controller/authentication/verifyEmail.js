"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/userModel"));
const cryptoTokens_1 = require("../../utils/cryptoTokens");
const Responses_1 = require("../../utils/Responses");
const AppError_1 = require("../../utils/AppError");
const verifyEmail = async (req, res) => {
    const { token } = req.query;
    if (!token || typeof token !== "string") {
        (0, Responses_1.sendErrorResponse)(res, 400, "Token is required");
        return;
    }
    try {
        const hashedToken = (0, cryptoTokens_1.hashToken)(token);
        const user = await userModel_1.default.findOneAndUpdate({
            emailVerificationToken: hashedToken,
            emailVerificationTokenExpiration: { $gt: Date.now() },
        }, {
            $set: { isVerified: true },
            $unset: {
                emailVerificationToken: "",
                emailVerificationTokenExpiration: ""
            }
        }, { new: true });
        if (!user) {
            (0, Responses_1.sendErrorResponse)(res, 400, "Invalid or expired token");
            return;
        }
        (0, Responses_1.sendSuccessResponse)(res, 200, "Email verified successfully", {
            isVerified: user.isVerified,
        });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        else {
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    }
};
exports.default = verifyEmail;
//# sourceMappingURL=verifyEmail.js.map