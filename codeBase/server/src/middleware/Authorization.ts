import {Request, Response, NextFunction} from "express";
import {jwtPayload} from "../types/auth.types"

export const Authorize = (...allowedRoles: jwtPayload['role'][]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({error: 'Forbidden: You do not have permission to access this resource'});
        } 
        next();
    }
}