"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : req.cookies?.Access_token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        req.user = (0, jwt_util_1.verifyAccessToken)(token);
        next();
    }
    catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=Auth.middleware.js.map