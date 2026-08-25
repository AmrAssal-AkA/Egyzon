import {Server as HttpServer} from "http";
import {Server, Socket} from "socket.io";
import * as cookie from "cookie";

import {verifyAccessToken, verifyRefreshToken} from "../utils/jwt.util";
import { Notification } from "../types/notification.types";


export type AuthenticatedSocket = Socket & {
   user?: {userId: string, role: string};
};
const userSockets: Map<string, Set<string>> = new Map();
let ioInstance: Server | null = null;

export function initSocket(server: HttpServer) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.use((socket: AuthenticatedSocket, next) => {
        try {
            const rawCookie = socket.handshake.headers.cookie;
            if (!rawCookie) return next(new Error("Authentication error"));

            const parsedCookie = cookie.parseCookie(rawCookie);
            const accessToken = parsedCookie.token;
            const refreshToken = parsedCookie.refreshToken;
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
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${userId}`);
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