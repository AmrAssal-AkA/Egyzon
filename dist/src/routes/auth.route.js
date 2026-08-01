"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../middleware/validate");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_validate_1 = require("../validators/user.validate");
const Register_1 = __importDefault(require("../controller/authentication/Register"));
const login_1 = __importDefault(require("../controller/authentication/login"));
const onBoarding_1 = __importDefault(require("../controller/authentication/onBoarding"));
const refresh_1 = __importDefault(require("../controller/authentication/refresh"));
const verifyEmail_1 = __importDefault(require("../controller/authentication/verifyEmail"));
const Responses_1 = require("../utils/Responses");
const jwt_util_1 = require("../utils/jwt.util");
const userModel_1 = __importDefault(require("../models/userModel"));
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const router = express_1.default.Router();
router.post("/register", (0, validate_1.validate)(user_validate_1.RegisterSchema), (req, res) => {
    const userData = req.body;
    (0, Register_1.default)(userData, res, req);
});
router.post("/login", (0, validate_1.validate)(user_validate_1.LoginSchema), login_1.default);
router.patch("/onBoarding", (0, validate_1.validate)(user_validate_1.updateUserSchema), onBoarding_1.default);
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
router.get("/verify-email", verifyEmail_1.default);
exports.default = router;
//# sourceMappingURL=auth.route.js.map