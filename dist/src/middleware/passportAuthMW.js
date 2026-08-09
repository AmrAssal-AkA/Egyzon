"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportAuthMW = void 0;
const passport_1 = __importDefault(require("passport"));
const AppError_1 = require("../utils/AppError");
const Responses_1 = require("../utils/Responses");
const passportAuthMW = (req, res, next) => {
    passport_1.default.authenticate("google", { session: false }, (err, user, info) => {
        if (err) {
            if (err instanceof AppError_1.AppError) {
                return (0, Responses_1.sendErrorResponse)(res, err.statusCode, err.message);
            }
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
        if (!user) {
            return res.redirect("/login");
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.passportAuthMW = passportAuthMW;
//# sourceMappingURL=passportAuthMW.js.map