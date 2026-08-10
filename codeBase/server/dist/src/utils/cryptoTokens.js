"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExpiration = exports.verifyToken = exports.hashToken = exports.generateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const tokenBytes = 32;
const tokenExpiration = 60 * 60 * 1000;
exports.tokenExpiration = tokenExpiration;
const hashToken = (token) => {
    return crypto_1.default.createHash("sha256").update(token).digest("hex");
};
exports.hashToken = hashToken;
const generateToken = () => {
    const token = crypto_1.default.randomBytes(tokenBytes).toString("hex");
    const haashedToken = hashToken(token);
    const expiration = new Date(Date.now() + tokenExpiration);
    return JSON.stringify({ token, haashedToken, expiration });
};
exports.generateToken = generateToken;
const verifyToken = (token, hashedToken, expiration) => {
    if (!token || !hashedToken) {
        return false;
    }
    if (new Date(expiration).getTime() < Date.now()) {
        return false;
    }
    const isComingHashedToken = hashToken(token);
    const a = Buffer.from(isComingHashedToken);
    const b = Buffer.from(hashedToken);
    if (a.length !== b.length) {
        return false;
    }
    return crypto_1.default.timingSafeEqual(a, b);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=cryptoTokens.js.map