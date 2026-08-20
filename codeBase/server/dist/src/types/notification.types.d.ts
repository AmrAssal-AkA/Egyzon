export type NotificationType = "info" | "success" | "warning" | "error";
export interface Notification {
    user: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    createdAt: Date;
}
export interface AuthUser {
    userId: string;
    role: "seller" | "admin";
    sellerId?: string;
}
//# sourceMappingURL=notification.types.d.ts.map