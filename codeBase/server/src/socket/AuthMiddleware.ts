import jwt from "jsonwebtoken";
import type { Socket } from "socket.io";
import { AuthUser } from "../types/notification.types";
import type { ExtendedError } from "socket.io";

declare module "socket.io" {
  interface Socket {
    user: AuthUser;
  }
}

export const AuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError) => void,
): void => {
  try {
    const authToken = socket.handshake.auth?.token as string | undefined;
    const authHeader = socket.handshake.headers.authorization as
      | string
      | undefined;
    const cookieHeader = socket.handshake.headers.cookie as string | undefined;

    let token = authToken;

    if (!token && authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token && cookieHeader) {
      const cookieNames = ["Access_token", "token"];

      for (const cookieName of cookieNames) {
        const cookie = cookieHeader
          .split(";")
          .map((item) => item.trim())
          .find((item) => item.startsWith(`${cookieName}=`));

        if (cookie) {
          token = decodeURIComponent(cookie.split("=").slice(1).join("="));
          break;
        }
      }
    }

    if (!token) {
      return next(new Error("Unauthorized: no token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
    socket.user = decoded;
    console.log("socket token found:", !!token);
    console.log("decoded socket user", decoded);
    next();
  } catch (error) {
    console.error("Socket auth failed:", error);
    next(new Error("Unauthorized"));
  }
};
