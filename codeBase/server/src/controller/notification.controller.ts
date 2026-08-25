import type { Request, Response } from "express";

import {NotificationServices} from "../services/notification.services";
import {sendErrorResponse, sendSuccessResponse} from "../utils/Responses"

 const getNotificationForUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return sendErrorResponse(res, 401, "Unauthorized");
        
        const NotificationPerUser = await NotificationServices.getNotificationsForUser(userId);
        return sendSuccessResponse(res, 200, "User Notification retrieved successfully", NotificationPerUser)
    }catch(errpr){
        sendErrorResponse(res, 500, "Internal Server Error");
    }
}

const markNotificationAsRead = async (req: Request, res: Response) => {
    try {
        const notificationId = req.params.id as string;
        if (!notificationId) return sendErrorResponse(res, 400, "Notification ID is required");
        
        const updatedNotification = await NotificationServices.markNotificationAsRead(notificationId);
        return sendSuccessResponse(res, 200, "Notification marked as read successfully", updatedNotification)
    }catch(error){
        sendErrorResponse(res, 500, "Internal Server Error");
    }
}

const markAllNotificationsAsReadForUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return sendErrorResponse(res, 401, "Unauthorized");
        
        const result = await NotificationServices.markAllNotificationsAsReadForUser(userId);
        return sendSuccessResponse(res, 200, "All notifications marked as read successfully", result)
    }catch(error){
        sendErrorResponse(res, 500, "Internal Server Error");
    }
}

const clearNotificationsForUser = async (req: Request, res: Response) => {
    try{
        const userId = req.user?.userId;
        if(!userId) return sendErrorResponse(res, 401, "Unauthorized");
        
        const result = await NotificationServices.clearNotificationsForUser(userId);
        return sendSuccessResponse(res, 200, "All notifications cleared successfully", result)
    }catch(error){
        sendErrorResponse(res, 500, "Internal Server Error");
    }
}

export { getNotificationForUser, markNotificationAsRead, markAllNotificationsAsReadForUser, clearNotificationsForUser };