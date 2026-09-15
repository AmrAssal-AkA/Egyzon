import {Server as HttpServer} from "http";
import {Server, Socket} from "socket.io";
import * as cookie from "cookie";

import {verifyAccessToken, verifyRefreshToken} from "../utils/jwt.util";
import { Notification } from "../types/notification.types";
import {Analytical} from "../services/analytics.services";
import {AnalyticalDateTimeframe} from "../types/analyticalData.types"
import logger from "../utils/logger";



export type AuthenticatedSocket = Socket & {
   user?: {userId: string, role: string};
};
const userSockets: Map<string, Set<string>> = new Map();
let ioInstance: Server | null = null;

export function initSocket(server: HttpServer) {
    const io = new Server(server, {
        cors: {
            origin: [process.env.FRONTEND_URL, process.env.ADMIN_FRONTEND_URL]
                .filter((origin): origin is string => Boolean(origin)),
            methods: ["GET", "POST"],
            credentials: true,
        },
        transports: ["websocket", "polling"],
    });
    io.use((socket: AuthenticatedSocket, next) => {
        try {
            const rawCookie = socket.handshake.headers.cookie;
            if (!rawCookie) return next(new Error("Authentication error"));
            logger.info(`Raw cookie received: ${rawCookie}`);
            const parsedCookie = cookie.parseCookie(rawCookie);
            const accessToken = parsedCookie['Access_token'];
            const refreshToken = parsedCookie['refresh_token'];
            if (!accessToken || !refreshToken) return next(new Error("Authentication error"));

            const accessTokenPayload = verifyAccessToken(accessToken);
            const refreshTokenPayload = verifyRefreshToken(refreshToken);
            if (!accessTokenPayload || !refreshTokenPayload) return next(new Error("Authentication error"));

            socket.user = {
                userId: accessTokenPayload.userId,
                role: accessTokenPayload.role,
            };
            next();
        }catch(error){
            next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket: AuthenticatedSocket) => {
        const userId = socket.user?.userId;
        if (userId) {
            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId)!.add(socket.id);
            socket.join(`user-${userId}`);

        }

        socket.on("sales-indicator:subscribe",async (timeframe: AnalyticalDateTimeframe) => {
            if (!userId || socket.user?.role !== "seller") return;

            const validTimeframes = Object.values(AnalyticalDateTimeframe);
            const safeTimeframe = validTimeframes.includes(timeframe) ? timeframe : AnalyticalDateTimeframe.SEVEN_DAYS;

            const data = await Analytical.getSellerAnalytics(userId, safeTimeframe);
            socket.emit("sales-Indicator:snapshot", data);
        })
        socket.on("platform-revenue:subscribe",async (timeframe: AnalyticalDateTimeframe) => {
            if (!userId || socket.user?.role !== "seller") return;
            
            const validTimeframes = Object.values(AnalyticalDateTimeframe);
            const safeTimeframe = validTimeframes.includes(timeframe) ? timeframe : AnalyticalDateTimeframe.SEVEN_DAYS;

            const data = await Analytical.getSellerAnalytics(userId, safeTimeframe);
            socket.emit("platform-revenue:snapshot", data);
        })

        socket.on("disconnect", () => {
            if(userId) {
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

export function getIo(): Server {
    if (!ioInstance)    throw new Error("Socket.io not initialized");
    return ioInstance;
}
export function isUserConnected(userId: string): boolean {
    return userSockets.has(userId);
}

export function emitNotificationToUser(userId: string, notification: Notification) {
    if (!ioInstance)  return;
    ioInstance.to(`user-${userId}`).emit("notification", notification);
}

export async function emitSalesIndicatorUpdate(sellerId: string, timeframe: AnalyticalDateTimeframe = AnalyticalDateTimeframe.SEVEN_DAYS): Promise<void> {
    if (!isUserConnected(sellerId)) return;

    const data = await Analytical.getSellerAnalytics(sellerId, timeframe);
    getIo().to(`user-${sellerId}`).emit("sales-indicator:subscribe", data);
}

