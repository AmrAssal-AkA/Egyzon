import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt.util";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionToken = req.cookies["session_token"];
  if (!sessionToken) {
    return res
      .status(401)
      .json({ error: "Unauthanticated: No session token provided" });
  }
  const refreshAccessToken = req.cookies["refresh_token"];
  try {
    let payload;
    payload = verifyAccessToken(sessionToken);
    req.user = payload;

    payload = verifyRefreshToken(refreshAccessToken);
    req.user = payload;

    next();
  } catch (error) {
    next();
  }
};
