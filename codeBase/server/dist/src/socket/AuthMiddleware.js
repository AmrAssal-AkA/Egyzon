"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (socket, next) => {
    try {
        const authToken = socket.handshake.auth?.token;
        const authHeader = socket.handshake.headers.authorization;
        const cookieHeader = socket.handshake.headers.cookie;
        let token = authToken;
        if (!token && authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        if (!token && cookieHeader) {
            const cookieNames = ["Access_token", "token"];
            for (const cookieName of cookieNames) {
                const cookie = cookieHeader
                    .split(";")
                    .map((item) => item.trim())
                    .find((item) => item.startsWith(`${cookieName}=`));
                if (cookie) {
                    token = decodeURIComponent(cookie.split("=").slice(1).join("="));
                    break;
                }
            }
        }
        if (!token) {
            return next(new Error("Unauthorized: no token provided"));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        console.log("socket token found:", !!token);
        console.log("decoded socket user", decoded);
        next();
    }
    catch (error) {
        console.error("Socket auth failed:", error);
        next(new Error("Unauthorized"));
    }
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map