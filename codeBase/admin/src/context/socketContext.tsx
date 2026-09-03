import React, { createContext, useContext, useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";

declare const process: {
  env: Record<string, string | undefined>;
};

function getSocketServerUrl(): string {
  if (process.env.REACT_APP_SOCKET_URL) {
    return process.env.REACT_APP_SOCKET_URL;
  }

  const apiUrl = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080";
  return apiUrl.replace(/\/api\/?$/, "");
}

const socketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket] = useState<Socket>(() =>
    io(getSocketServerUrl(), {
      transports: ["websocket", "polling"],
      autoConnect: true,
      withCredentials: true,
    })
  );

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = (): Socket => {
  const socket = useContext(socketContext);

  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return socket;
};
