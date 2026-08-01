"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_util_1 = require("../../utils/jwt.util");
const Responses_1 = require("../../utils/Responses");
const userModel_1 = __importDefault(require("../../models/userModel"));
const RefreshToken = async (req, res) => {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
        return res.status(404).json({ message: "Refresh token not found" });
    }
    try {
        const decoded = (0, jwt_util_1.verifyRefreshToken)(refreshToken);
        const user = await userModel_1.default.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = await (0, jwt_util_1.signAccessToken)({ userId: user.id, role: user.role });
        const newRefreshToken = await (0, jwt_util_1.signRefreshToken)({ userId: user.id, role: user.role });
        user.refreshToken = newRefreshToken;
        await user.save();
        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        (0, Responses_1.sendSuccessResponse)(res, 200, "Token refreshed successfully", { accessToken: newAccessToken });
    }
    catch (err) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", err);
    }
};
exports.default = RefreshToken;
//# sourceMappingURL=refresh.js.map