import express from "express";
import { getNotificationForUser, markNotificationAsRead, markAllNotificationsAsReadForUser, clearNotificationsForUser } from "../controller/notification.controller";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";

const router = express.Router();

router.get("/", isAuthenticated, Authorize(userRole.Customer, userRole.Seller, userRole.Admin), getNotificationForUser);
router.patch("/:id/markAsRead", isAuthenticated, Authorize(userRole.Customer, userRole.Seller, userRole.Admin), markNotificationAsRead);
router.patch("/markAllAsRead", isAuthenticated, Authorize(userRole.Customer, userRole.Seller, userRole.Admin), markAllNotificationsAsReadForUser);
router.delete("/clear", isAuthenticated, Authorize(userRole.Customer, userRole.Seller, userRole.Admin), clearNotificationsForUser);

export default router;