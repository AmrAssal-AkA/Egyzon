import { createNotificationInput } from "../types/notification.types";
export declare const NotificationServices: {
    createNotification: (notificationData: createNotificationInput) => Promise<import("mongoose").Document<unknown, {}, import("../types/notification.types").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../types/notification.types").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getNotificationsForUser: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../types/notification.types").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../types/notification.types").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    markNotificationAsRead: (notificationId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/notification.types").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("../types/notification.types").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    markAllNotificationsAsReadForUser: (userId: string) => Promise<import("mongoose").UpdateWriteOpResult>;
    clearNotificationsForUser: (userId: string) => Promise<import("mongodb").DeleteResult>;
};
//# sourceMappingURL=notification.services.d.ts.map