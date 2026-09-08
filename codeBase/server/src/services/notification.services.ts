import Notification from "../models/notificationModel";
import {createNotificationInput, PartnerApplicant } from "../types/notification.types";
import {emitNotificationToUser} from "../config/socket";
import User from "../models/userModel";
import { AppError } from "../utils/AppError";

export const NotificationServices = {
    createNotification: async (notificationData: createNotificationInput) => {
        try {
            const notification = new Notification(notificationData);
            await notification.save();
            emitNotificationToUser(notificationData.user, notification.toObject());
            
            return notification;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    getNotificationsForUser: async (userId: string) => {
        try {
            const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
            return notifications;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    markNotificationAsRead: async (notificationId: string) => {
        try {
            const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
            if (!notification) throw new AppError(404, "Notification not found");
            return notification;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    markAllNotificationsAsReadForUser: async (userId: string) => {
        try {
            const result = await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
            return result;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    clearNotificationsForUser: async (userId: string) => {
        try {
            const result = await Notification.deleteMany({ user: userId });
            return result;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    notifyPartenerApplicantsToAdmin: async (notificationData: PartnerApplicant) => {
        try {
            const adminUser = await User.find({ role: "admin" }, "_id");
            if (!adminUser || adminUser.length === 0) throw new AppError(404, "Admin user not found");
            const messages = `new partner applicant ${notificationData.shopName} with applicant name ${notificationData.applicantName} has applied for partnership`;
            const data = {
                applicantId: notificationData.applicantId,
                applicationId: notificationData.applicationId,
                applicantName: notificationData.applicantName,
                shopName: notificationData.shopName,
            };
           const notificationsPromises = adminUser.map(async (admin) => {
             const notification = new Notification({
                type: "partner_Applicant",
                message: messages,
                data: data,
                user: admin._id.toString(),
                isRead: false,
             });
                return notification.save();
           })
           const notifications = await Promise.all(notificationsPromises);
              notifications.forEach((notification) => {
                emitNotificationToUser(notification.user.toString(), notification.toObject());
              });
              return notifications;
        }catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    notifySellerAdminForNewOrder: async (notificationData: { orderId: string; sellerId: string; buyerName: string; }) => {
        try {
            const adminUser = await User.find({ role: "admin" }, "_id");
            const sellerUser = await User.findById(notificationData.sellerId, "_id");
            if (!adminUser || adminUser.length === 0) throw new AppError(404, "Admin user not found");
            if (!sellerUser) throw new AppError(404, "Seller user not found");
            const messages = `new order ${notificationData.orderId} has been placed by ${notificationData.buyerName}`;
            const data = {
                orderId: notificationData.orderId,
                buyerName: notificationData.buyerName,
            };
           const notificationsPromises = [...adminUser, sellerUser].map(async (user) => {
             const notification = new Notification({
                type: "new_order",
                message: messages,
                data: data,
                user: user._id.toString(),
                isRead: false,
             });
                return notification.save();
           })
           const notifications = await Promise.all(notificationsPromises);
              notifications.forEach((notification) => {
                emitNotificationToUser(notification.user.toString(), notification.toObject());
              });
              return notifications;
        }catch (error){
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    }
}