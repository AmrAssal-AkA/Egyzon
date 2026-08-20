
const onlineUsers = new Map<string, Set<string>>();

function addOnlineUser(userId: string, socketId: string) {
    if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
    onlineUsers.get(userId)?.add(socketId);
}
function removeOnlineUser(userId: string, socketId: string) {
    const socket = onlineUsers.get(userId);
    if (!socket) return;
    socket.delete(socketId);
    if (socket.size === 0) onlineUsers.delete(userId);
}
function getSockets(userId: string) {
    console.log(`Getting sockets for user ${userId}:`, onlineUsers.get(userId));
    return onlineUsers.get(userId) || new Set();
}

export { addOnlineUser, removeOnlineUser, getSockets };