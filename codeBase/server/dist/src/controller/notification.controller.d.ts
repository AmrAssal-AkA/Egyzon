import type { Request, Response } from "express";
declare const getNotificationForUser: (req: Request, res: Response) => Promise<void>;
declare const markNotificationAsRead: (req: Request, res: Response) => Promise<void>;
declare const markAllNotificationsAsReadForUser: (req: Request, res: Response) => Promise<void>;
declare const clearNotificationsForUser: (req: Request, res: Response) => Promise<void>;
export { getNotificationForUser, markNotificationAsRead, markAllNotificationsAsReadForUser, clearNotificationsForUser };
//# sourceMappingURL=notification.controller.d.ts.map