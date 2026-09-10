import React, { createContext, useContext, useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";

declare const process: {
  env: Record<string, string | undefined>;
};

function getSocketServerUrl(): string {
  const apiUrl = process.env.REACT_APP_API_BASE_URL_WS;

  if (apiUrl === undefined) {
    throw new Error("REACT_APP_API_BASE_URL_WS is not configured");
  }

  return apiUrl;
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
