"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
exports.getIo = getIo;
exports.isUserConnected = isUserConnected;
exports.emitNotificationToUser = emitNotificationToUser;
exports.emitSalesIndicatorUpdate = emitSalesIndicatorUpdate;
const socket_io_1 = require("socket.io");
const cookie = __importStar(require("cookie"));
const jwt_util_1 = require("../utils/jwt.util");
const analytics_services_1 = require("../services/analytics.services");
const analyticalData_types_1 = require("../types/analyticalData.types");
const userSockets = new Map();
let ioInstance = null;
function initSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ["websocket", "polling"],
    });
    io.use((socket, next) => {
        try {
            const rawCookie = socket.handshake.headers.cookie;
            if (!rawCookie)
                return next(new Error("Authentication error"));
            const parsedCookie = cookie.parseCookie(rawCookie);
            const accessToken = parsedCookie.token;
            const refreshToken = parsedCookie.refreshToken;
            if (!accessToken || !refreshToken)
                return next(new Error("Authentication error"));
            const accessTokenPayload = (0, jwt_util_1.verifyAccessToken)(accessToken);
            const refreshTokenPayload = (0, jwt_util_1.verifyRefreshToken)(refreshToken);
            if (!accessTokenPayload || !refreshTokenPayload)
                return next(new Error("Authentication error"));
            socket.user = {
                userId: accessTokenPayload.userId,
                role: accessTokenPayload.role,
            };
            next();
        }
        catch (error) {
            next(new Error("Authentication error"));
        }
    });
    io.on("connection", (socket) => {
        const userId = socket.user?.userId;
        if (userId) {
            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId).add(socket.id);
            socket.join(`user-${userId}`);
        }
        socket.on("sales-indicator:subscribe", async (timeframe) => {
            if (!userId || socket.user?.role !== "seller")
                return;
            const validTimeframes = Object.values(analyticalData_types_1.AnalyticalDateTimeframe);
            const safeTimeframe = validTimeframes.includes(timeframe) ? timeframe : analyticalData_types_1.AnalyticalDateTimeframe.SEVEN_DAYS;
            const data = await analytics_services_1.Analytical.getSellerAnalytics(userId, safeTimeframe);
            socket.emit("sales-Indicator:snapshot", data);
        });
        socket.on("disconnect", () => {
            if (userId) {
                const userSocketSet = userSockets.get(userId);
                userSocketSet?.delete(socket.id);
                if (userSocketSet?.size === 0) {
                    userSockets.delete(userId);
                }
            }
        });
    });
    ioInstance = io;
    return io;
}
function getIo() {
    if (!ioInstance)
        throw new Error("Socket.io not initialized");
    return ioInstance;
}
function isUserConnected(userId) {
    return userSockets.has(userId);
}
function emitNotificationToUser(userId, notification) {
    if (!ioInstance)
        return;
    ioInstance.to(`user-${userId}`).emit("notification", notification);
}
async function emitSalesIndicatorUpdate(sellerId, timeframe = analyticalData_types_1.AnalyticalDateTimeframe.SEVEN_DAYS) {
    if (!isUserConnected(sellerId))
        return;
    const data = await analytics_services_1.Analytical.getSellerAnalytics(sellerId, timeframe);
    getIo().to(`user-${sellerId}`).emit("sales-indicator:subscribe", data);
}
//# sourceMappingURL=socket.js.map