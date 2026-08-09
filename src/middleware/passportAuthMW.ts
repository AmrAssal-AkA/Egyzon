import type { Request, Response, NextFunction } from "express";
import passport from "passport"
import { AppError } from "../utils/AppError";
import { sendErrorResponse } from "../utils/Responses";

export const passportAuthMW = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
        if (err) {
            if (err instanceof AppError){
                return sendErrorResponse(res, err.statusCode, err.message);
            }
            return sendErrorResponse(res, 500, "Internal Server Error");
        }
        if (!user) {
            return res.redirect("/login");
        }
    req.user = user;
    next();
    })(req, res, next);
    }
