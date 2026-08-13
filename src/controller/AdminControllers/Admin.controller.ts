import type { Request, Response } from "express"

import {AdminService} from "../../services/admin.services"
import { sendErrorResponse, sendSuccessResponse } from "../../utils/Responses"

export const AdminController = {
    getAllUsers: async(req: Request, res: Response) => {
       try {
        const users = await AdminService.getAllUser();
        return sendSuccessResponse(res, 200, "Users retrieved successfully", users);
       }catch(error){
         sendErrorResponse(res, 500, "internal server Error")
       }
    },
    promoteToAdmin: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId as string;
            if(!userId) return sendErrorResponse(res, 400, "userId is required");
            const promotedUser = await AdminService.promoteToAdmin(userId);
            return sendSuccessResponse(res, 200, "User promoted to admin successfully", promotedUser);
        }catch(error){
            sendErrorResponse(res, 500, "internal Server Error", error)
        }
    },
    BlockUser: async (req: Request, res: Response) => {
        try{
            const userId = req.params.userId as string;
            if(!userId) return sendErrorResponse(res, 400, "userId is required");
            const blockedUser = await AdminService.blockUser(userId);
            return sendSuccessResponse(res, 200, "User blocked successfully", blockedUser);
        }catch(error){
            return sendErrorResponse(res, 500, "internal Server Error", error)
        }
    },
    activateUser: async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId as string;
            if(!userId) return sendErrorResponse(res, 400, "userId is required");
            const activateUser = await AdminService.activateUser(userId);
            return sendSuccessResponse(res, 200, "user is back to active state", activateUser);
        }catch(error){
            return sendErrorResponse(res, 500, "internal Server Error", error)
        }
    }
}