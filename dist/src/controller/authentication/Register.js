"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userModel_1 = __importDefault(require("../../models/userModel"));
const customerModel_1 = __importDefault(require("../../models/customerModel"));
const password_ustils_1 = require("../../utils/password.ustils");
const jwt_util_1 = require("../../utils/jwt.util");
const Responses_1 = require("../../utils/Responses");
const cryptoTokens_1 = require("../../utils/cryptoTokens");
const verifyEmailTemplate_1 = __importDefault(require("../../templates/verifyEmailTemplate"));
const RegisterUser = async (userData, res, req) => {
    const { FirstName, LastName, email, password } = userData;
    const existingUser = await userModel_1.default.findOne({ email });
    if (existingUser) {
        res.status(409).json({ message: "User already exists" });
        return;
    }
    try {
        const hashedPassword = await (0, password_ustils_1.hashPassword)(password);
        const refreshToken = "";
        const newUser = new userModel_1.default({
            FirstName,
            LastName,
            email,
            password: hashedPassword,
            refreshToken,
        });
        await newUser.save();
        await customerModel_1.default.create({ user: newUser._id });
        const token = await (0, jwt_util_1.signAccessToken)({
            userId: newUser.id,
            role: newUser.role,
        });
        const newrefreshToken = await (0, jwt_util_1.signRefreshToken)({
            userId: newUser.id,
            role: newUser.role,
        });
        newUser.refreshToken = newrefreshToken;
        const emailToken = (0, cryptoTokens_1.generateToken)();
        const { token: emailTokenValue, haashedToken, expiration } = JSON.parse(emailToken);
        newUser.emailVerificationToken = haashedToken;
        newUser.emailVerificationTokenExpiration = expiration;
        await newUser.save();
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${emailTokenValue}`;
        await (0, verifyEmailTemplate_1.default)(email, emailTokenValue, verificationUrl);
        res.cookie("Access_token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });
        res.cookie("refresh_token", newrefreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        (0, Responses_1.sendSuccessResponse)(res, 201, "User created successfully", {
            token,
            refreshToken: newrefreshToken,
        });
    }
    catch (err) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Something went wrong", err.message);
        return;
    }
};
exports.default = RegisterUser;
//# sourceMappingURL=Register.js.map