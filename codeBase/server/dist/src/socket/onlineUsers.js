"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOnlineUser = addOnlineUser;
exports.removeOnlineUser = removeOnlineUser;
exports.getSockets = getSockets;
const onlineUsers = new Map();
function addOnlineUser(userId, socketId) {
    if (!onlineUsers.has(userId))
        onlineUsers.set(userId, new Set());
    onlineUsers.get(userId)?.add(socketId);
}
function removeOnlineUser(userId, socketId) {
    const socket = onlineUsers.get(userId);
    if (!socket)
        return;
    socket.delete(socketId);
    if (socket.size === 0)
        onlineUsers.delete(userId);
}
function getSockets(userId) {
    console.log(`Getting sockets for user ${userId}:`, onlineUsers.get(userId));
    return onlineUsers.get(userId) || new Set();
}
//# sourceMappingURL=onlineUsers.js.map