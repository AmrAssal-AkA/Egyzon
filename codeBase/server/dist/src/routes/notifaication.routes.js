"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controller/notification.controller");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const router = express_1.default.Router();
router.get("/", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer, auth_types_1.userRole.Seller, auth_types_1.userRole.Admin), notification_controller_1.getNotificationForUser);
router.patch("/:id/markAsRead", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer, auth_types_1.userRole.Seller, auth_types_1.userRole.Admin), notification_controller_1.markNotificationAsRead);
router.patch("/markAllAsRead", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer, auth_types_1.userRole.Seller, auth_types_1.userRole.Admin), notification_controller_1.markAllNotificationsAsReadForUser);
router.delete("/clear", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer, auth_types_1.userRole.Seller, auth_types_1.userRole.Admin), notification_controller_1.clearNotificationsForUser);
exports.default = router;
//# sourceMappingURL=notifaication.routes.js.map