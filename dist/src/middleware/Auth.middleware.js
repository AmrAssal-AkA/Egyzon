"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const isAuthenticated = (req, res, next) => {
    const sessionToken = req.cookies["session_token"];
    if (!sessionToken) {
        return res
            .status(401)
            .json({ error: "Unauthanticated: No session token provided" });
    }
    const refreshAccessToken = req.cookies["refresh_token"];
    try {
        let payload;
        payload = (0, jwt_util_1.verifyAccessToken)(sessionToken);
        req.user = payload;
        payload = (0, jwt_util_1.verifyRefreshToken)(refreshAccessToken);
        req.user = payload;
        next();
    }
    catch (error) {
        next();
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=Auth.middleware.js.map