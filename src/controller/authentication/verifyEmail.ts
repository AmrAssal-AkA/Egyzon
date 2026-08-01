import type { Request, Response } from "express";
import User from "../../models/userModel";
import { hashToken } from "../../utils/cryptoTokens";
import { sendSuccessResponse, sendErrorResponse } from "../../utils/Responses";
import { AppError } from "../../utils/AppError";


const verifyEmail = async (req: Request, res: Response) => {
    const {token} = req.query;
    if (!token || typeof token !== "string") {
        sendErrorResponse(res, 400, "Token is required");
        return;
    }
    try {
        const hashedToken = hashToken(token);
        const user = await User.findOneAndUpdate(
            {
                emailVerificationToken: hashedToken,
                emailVerificationTokenExpiration: { $gt: Date.now() },
            },
            {
                $set: {isVerified: true},
                $unset: {
                    emailVerificationToken: "",
                    emailVerificationTokenExpiration: ""
                }
            },
            {new: true}
        )
        if (!user) {
            sendErrorResponse(res, 400, "Invalid or expired token");
            return;
        }
        sendSuccessResponse(res, 200, "Email verified successfully", {
            isVerified: user.isVerified,
        });
    }catch(error){
        if (error instanceof AppError) {
            sendErrorResponse(res, error.statusCode, error.message);
        } else {
            sendErrorResponse(res, 500, "Internal Server Error");
        }
    }
}

export default verifyEmail;