"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_validate_1 = require("../validators/user.validate");
const validate_1 = require("../middleware/validate");
const Register_1 = __importDefault(require("../controller/authentication/Register"));
const login_1 = __importDefault(require("../controller/authentication/login"));
const onBoarding_1 = __importDefault(require("../controller/authentication/onBoarding"));
const refresh_1 = __importDefault(require("../controller/authentication/refresh"));
const verifyEmail_1 = __importDefault(require("../controller/authentication/verifyEmail"));
const continueWithGoogle_1 = __importDefault(require("../controller/authentication/continueWithGoogle"));
const Responses_1 = require("../utils/Responses");
const jwt_util_1 = require("../utils/jwt.util");
const userModel_1 = __importDefault(require("../models/userModel"));
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const passportAuthMW_1 = require("../middleware/passportAuthMW");
const forgetPassword_1 = require("../controller/authentication/forgetPassword");
const router = express_1.default.Router();
router.get("/me", Auth_middleware_1.isAuthenticated, async (req, res) => {
    try {
        const userId = req.user?.userId;
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return (0, Responses_1.sendErrorResponse)(res, 404, "User not found");
        }
        return res.json({ success: true, data: user });
    }
    catch (err) {
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", err);
    }
});
// Register route
router.post("/register", (0, validate_1.validate)(user_validate_1.RegisterSchema), (req, res) => {
    const userData = req.body;
    (0, Register_1.default)(userData, res, req);
});
// Login route
router.post("/login", (0, validate_1.validate)(user_validate_1.LoginSchema), login_1.default);
// Refresh token route
router.patch("/onBoarding", (0, validate_1.validate)(user_validate_1.updateUserSchema), Auth_middleware_1.isAuthenticated, onBoarding_1.default);
// Refresh token route
router.post("/refresh", refresh_1.default);
// Logout route
router.post("/logout", Auth_middleware_1.isAuthenticated, async (req, res) => {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Logged out successfully");
    }
    try {
        let userId;
        try {
            const decoded = (0, jwt_util_1.verifyRefreshToken)(refreshToken);
            userId = decoded.userId;
        }
        catch (err) {
            const decodedExpire = jsonwebtoken_1.default.decode(refreshToken);
            if (decodedExpire && decodedExpire.userId) {
                userId = decodedExpire.userId;
            }
        }
        if (userId) {
            await userModel_1.default.updateOne({ _id: userId, refreshToken }, { $set: { refreshToken: null } });
        }
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Logged out successfully");
    }
    catch (err) {
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", err);
    }
});
// Email verification route
router.get("/verify-email", Auth_middleware_1.isAuthenticated, verifyEmail_1.default);
router.get("/continue-with-google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passportAuthMW_1.passportAuthMW, continueWithGoogle_1.default);
router.post('/forget-password', (0, validate_1.validate)(user_validate_1.forgetPasswordSchema), forgetPassword_1.RequestForgetPassword);
router.patch('/reset-password', (0, validate_1.validate)(user_validate_1.resetPasswordSchema), forgetPassword_1.ForgetPassword);
exports.default = router;
//# sourceMappingURL=auth.route.js.map