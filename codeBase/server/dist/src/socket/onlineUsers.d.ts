declare function addOnlineUser(userId: string, socketId: string): void;
declare function removeOnlineUser(userId: string, socketId: string): void;
declare function getSockets(userId: string): Set<string>;
export { addOnlineUser, removeOnlineUser, getSockets };
//# sourceMappingURL=onlineUsers.d.ts.map