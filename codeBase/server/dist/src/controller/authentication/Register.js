"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Import necessary modules and utilities
const userModel_1 = __importDefault(require("../../models/userModel"));
const password_ustils_1 = require("../../utils/password.ustils");
const jwt_util_1 = require("../../utils/jwt.util");
const Responses_1 = require("../../utils/Responses");
const cryptoTokens_1 = require("../../utils/cryptoTokens");
const verifyEmailTemplate_1 = __importDefault(require("../../templates/verifyEmailTemplate"));
const refreshToken_1 = __importDefault(require("../../models/refreshToken"));
const RegisterUser = async (userData, res, req) => {
    try {
        const { FirstName, LastName, email, password } = userData;
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: "User already exists" });
        console.log("Registering user:", { FirstName, LastName, email, password });
        const hashedPassword = await (0, password_ustils_1.hashPassword)(password);
        const newUser = new userModel_1.default({
            FirstName,
            LastName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = await (0, jwt_util_1.signAccessToken)({
            userId: newUser.id,
            role: newUser.role,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshToken)({
            userId: newUser.id,
            role: newUser.role,
        });
        const refreshTokenDoc = new refreshToken_1.default({
            refreshToken: refreshToken,
            userId: newUser.id,
        });
        await refreshTokenDoc.save();
        const emailToken = (0, cryptoTokens_1.generateToken)();
        const { token: emailTokenValue, haashedToken, expiration, } = JSON.parse(emailToken);
        newUser.emailVerificationToken = haashedToken;
        newUser.emailVerificationTokenExpiration = expiration;
        await newUser.save();
        const verificationUrl = `${process.env.FRONTEND_URL}/verifyEmail?token=${emailTokenValue}`;
        await (0, verifyEmailTemplate_1.default)(email, emailTokenValue, verificationUrl);
        res.cookie("Access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        console.log("User registered successfully:", newUser);
        (0, Responses_1.sendSuccessResponse)(res, 201, "User created successfully", {
            token,
            refreshToken: refreshToken,
        });
    }
    catch (err) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Something went wrong", err.message);
        return;
    }
};
exports.default = RegisterUser;
//# sourceMappingURL=Register.js.map