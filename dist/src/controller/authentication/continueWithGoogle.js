"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const refreshToken_1 = __importDefault(require("../../models/refreshToken"));
const AppError_1 = require("../../utils/AppError");
const jwt_util_1 = require("../../utils/jwt.util");
const Responses_1 = require("../../utils/Responses");
dotenv_1.default.config();
passport_1.default.serializeUser((user, done) => {
    done(null, user.userId);
});
passport_1.default.deserializeUser(async (userId, done) => {
    try {
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return done(null, false);
        }
        done(null, { userId: user.id, role: user.role });
    }
    catch (error) {
        done(error, null);
    }
});
passport_1.default.use(new passport_google_oauth20_1.default.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(null, false);
        }
        let user = await userModel_1.default.findOne({ googleId: profile.id });
        if (!user) {
            user = await userModel_1.default.findOne({ email });
            if (user) {
                user.googleId = profile.id;
                await user.save();
            }
            else {
                user = await userModel_1.default.create({
                    email,
                    FirstName: profile.name?.givenName || "",
                    LastName: profile.name?.familyName || "",
                    phoneNumber: profile.phone || "",
                    googleId: profile.id,
                    isVerified: true,
                });
            }
        }
        return done(null, { userId: user.id, role: user.role });
    }
    catch (error) {
        console.error("Error in GoogleStrategy:", error);
        return done(error, false);
    }
}));
const googleCallback = async (req, res) => {
    try {
        const user = req.user;
        const accessToken = await (0, jwt_util_1.signAccessToken)({
            userId: user.userId,
            role: user.role,
        });
        const refreshToken = await (0, jwt_util_1.signRefreshToken)({
            userId: user.userId,
            role: user.role,
        });
        await refreshToken_1.default.create({
            userId: user.userId,
            refreshToken,
        });
        const redirectUrl = new URL(`${process.env.FRONTEND_URL}/api/auth/googleCallback`);
        redirectUrl.searchParams.set("token", accessToken);
        redirectUrl.searchParams.set("refreshToken", refreshToken);
        res.redirect(redirectUrl.toString());
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.default = googleCallback;
//# sourceMappingURL=continueWithGoogle.js.map