"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLoggingin = void 0;
const Responses_1 = require("../../utils/Responses");
const admin_services_1 = require("../../services/admin.services");
const AdminLoggingin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "Email and password are required");
        }
        const { accessToken, refreshToken, user } = await admin_services_1.AdminService.AdminLoggingin(email, password);
        res.cookie("Access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Admin logged in successfully", { user });
    }
    catch (error) {
        if (error instanceof Error) {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error.message);
        }
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", "An unexpected error occurred");
    }
};
exports.AdminLoggingin = AdminLoggingin;
//# sourceMappingURL=Adminloggin.controller.js.map