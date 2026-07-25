import { validate } from "../middleware/validate"
import express, {type  Request, Response } from "express";
import jwt from "jsonwebtoken";

import { LoginSchema, RegisterSchema, updateUserSchema } from "../validators/user.validate";
import RegisterUser from "../controller/authentication/Register";
import LoginUser from "../controller/authentication/login";
import onBoarding from "../controller/authentication/onBoarding";
import RefreshToken from "../controller/authentication/refresh";
import { sendSuccessResponse, sendErrorResponse } from "../utils/Responses";
import {verifyRefreshToken} from "../utils/jwt.util";
import User from "../models/userModel";
import {isAuthenticated} from "../middleware/Auth.middleware";




const router = express.Router();

router.post("/register", validate(RegisterSchema), (req: Request, res: Response) => {
    const userData = req.body;
    RegisterUser(userData, res, req);
});

router.post("/login", validate(LoginSchema), LoginUser);

router.patch("/onBoarding", validate(updateUserSchema),onBoarding);
router.post("/refresh", RefreshToken);

// Logout route
router.post("/logout", isAuthenticated, async (req: Request, res: Response) => {
    const refreshToken = req.cookies["refresh_token"];
    
    if (!refreshToken) {
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return sendSuccessResponse(res, 200, "Logged out successfully");
    }
    try {
        let userId: string | undefined;
        try{
            const decoded = verifyRefreshToken(refreshToken);
            userId = decoded.userId;
        }catch(err){
            const decodedExpire = jwt.decode(refreshToken) as { userId: string, exp: number };
            if(decodedExpire && decodedExpire.userId){
                userId = decodedExpire.userId;
            }
        }
        if(userId){
            await User.updateOne(
                {_id: userId, refreshToken},
                {$set: {refreshToken: null}}
            );
        }
        res.clearCookie("refresh_token", {
                httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return sendSuccessResponse(res, 200, "Logged out successfully");
    }catch(err){
        return sendErrorResponse(res, 500, "Internal Server Error", err);
    }
})




export default router;