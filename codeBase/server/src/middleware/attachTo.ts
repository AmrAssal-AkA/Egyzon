import type { Request, Response, NextFunction } from "express";
import type { Server } from "socket.io";

export function attachTo(io: Server){
    return (req: Request, res: Response, next: NextFunction) => {
        req.io = io
        next();
    }
}