import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util";
import {jwtPayload} from "../types/auth.types"

export interface AutheRequest extends Request {
  user?: jwtPayload;
}


export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer')? authHeader.split(' ')[1] : req.cookies?.Access_token;

  if(!token){
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
    try {
    req.user = verifyAccessToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
