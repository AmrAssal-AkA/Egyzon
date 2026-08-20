import type { Socket } from "socket.io";
import { AuthUser } from "../types/notification.types";
import type { ExtendedError } from "socket.io";
declare module "socket.io" {
    interface Socket {
        user: AuthUser;
    }
}
export declare const AuthMiddleware: (socket: Socket, next: (err?: ExtendedError) => void) => void;
//# sourceMappingURL=AuthMiddleware.d.ts.map