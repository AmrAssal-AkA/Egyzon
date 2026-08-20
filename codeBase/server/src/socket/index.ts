import type { Server } from "socket.io";
import {AuthMiddleware} from "./AuthMiddleware";
import {getSockets, addOnlineUser, removeOnlineUser} from "./onlineUsers"

export const initSocket = (io: Server): void => {
    io.use(AuthMiddleware);

    io.on("connection", (socket: any) => {
        const {userId, role} = socket.user

        addOnlineUser(userId, socket.id);
        if (role === "admin") socket.join("admin");
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
        socket.on("disconnect", () => {
            removeOnlineUser(userId, socket.id);
        });
    }
    );
}

export default {getSockets};