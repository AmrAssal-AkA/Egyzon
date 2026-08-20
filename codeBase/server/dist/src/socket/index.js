"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const AuthMiddleware_1 = require("./AuthMiddleware");
const onlineUsers_1 = require("./onlineUsers");
const initSocket = (io) => {
    io.use(AuthMiddleware_1.AuthMiddleware);
    io.on("connection", (socket) => {
        const { userId, role } = socket.user;
        (0, onlineUsers_1.addOnlineUser)(userId, socket.id);
        if (role === "admin")
            socket.join("admin");
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
        socket.on("disconnect", () => {
            (0, onlineUsers_1.removeOnlineUser)(userId, socket.id);
        });
    });
};
exports.initSocket = initSocket;
exports.default = { getSockets: onlineUsers_1.getSockets };
//# sourceMappingURL=index.js.map