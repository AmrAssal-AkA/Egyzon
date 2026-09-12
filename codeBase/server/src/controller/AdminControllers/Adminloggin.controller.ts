import type {Request, Response} from "express";


import { sendErrorResponse, sendSuccessResponse } from "../../utils/Responses";
import{ AdminService } from "../../services/admin.services";


const AdminLoggingin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return sendErrorResponse(res, 400, "Bad Request", "Email and password are required");
        }
        const loginResult = await AdminService.AdminLoggingin(email, password);
        if (!loginResult) {
            return sendErrorResponse(res, 500, "Internal Server Error", "Admin login failed");
        }
        const { accessToken, refreshToken, user } = loginResult;

        res.cookie("Access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        return sendSuccessResponse(res, 200, "Admin logged in successfully", { user });
    }catch (error) {
        if (error instanceof Error) {
            return sendErrorResponse(res, 500, "Internal Server Error", error.message);
        }
        return sendErrorResponse(res, 500, "Internal Server Error", "An unexpected error occurred");
    }
}




export { AdminLoggingin };