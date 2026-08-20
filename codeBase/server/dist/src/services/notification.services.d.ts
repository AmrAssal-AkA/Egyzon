import { Notification as NotificationType } from "../types/notification.types";
export declare const NotificationServices: {
    createNotification: (notificationData: NotificationType) => Promise<import("mongoose").Document<unknown, {}, NotificationType, {}, import("mongoose").DefaultSchemaOptions> & NotificationType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=notification.services.d.ts.map