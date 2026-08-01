"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets are not defined in the environment variables.");
}
const signAccessToken = async (payload) => {
    return jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = async (payload) => {
    return jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
exports.signRefreshToken = signRefreshToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.util.js.map