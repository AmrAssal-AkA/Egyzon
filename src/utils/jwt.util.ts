import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import {jwtPayload} from "../types/auth.types";


const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets are not defined in the environment variables.");
}

export const signAccessToken = async (payload: jwtPayload): Promise<string> => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export const signRefreshToken = async (payload: jwtPayload): Promise<string> => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}


export const verifyAccessToken = (token: string): jwtPayload => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as jwtPayload;
}

export const verifyRefreshToken = (token: string): jwtPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as jwtPayload;
}