type NotificationType = "info" | "warning" | "error" | "success";
export type createNotificationInput = {
    user: string;
    title?: string;
    type: NotificationType;
    message: string;
    isRead?: boolean;
    createdAt?: Date;
};
export interface Notification {
    user: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    createdAt: Date;
}
export {};
//# sourceMappingURL=notification.types.d.ts.map