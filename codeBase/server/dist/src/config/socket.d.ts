import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { Notification } from "../types/notification.types";
export type AuthenticatedSocket = Socket & {
    user?: {
        userId: string;
        role: string;
    };
};
export declare function initSocket(server: HttpServer): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export declare function getIo(): Server;
export declare function isUserConnected(userId: string): boolean;
export declare function emitNotificationToUser(userId: string, notification: Notification): void;
//# sourceMappingURL=socket.d.ts.map