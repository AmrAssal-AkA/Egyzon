import {io, Socket} from "socket.io-client";
import type {ServerToClientEvents, ClientToServerEvents} from "../types/socket-events";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8080", {
    withCredentials: true,
    transports: ["websocket"],
    autoConnect: false,
});