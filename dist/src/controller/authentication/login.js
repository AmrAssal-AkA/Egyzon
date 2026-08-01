"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userModel_1 = __importDefault(require("../../models/userModel"));
const password_ustils_1 = require("../../utils/password.ustils");
const jwt_util_1 = require("../../utils/jwt.util");
const Responses_1 = require("../../utils/Responses");
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (user.isBlocked) {
            res.status(403).json({ message: "This account has been blocked" });
            return;
        }
        const isPasswordValid = await (0, password_ustils_1.comparePasswords)(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        const token = await (0, jwt_util_1.signAccessToken)({ userId: user.id, role: user.role });
        const refreshToken = await (0, jwt_util_1.signRefreshToken)({
            userId: user.id,
            role: user.role,
        });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("Access_token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        (0, Responses_1.sendSuccessResponse)(res, 200, "Login successful", { token, refreshToken });
    }
    catch (err) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Something went wrong", err.message);
    }
};
exports.default = LoginUser;
//# sourceMappingURL=login.js.map