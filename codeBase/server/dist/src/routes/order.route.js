"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controller/order.controller");
const validate_1 = require("../middleware/validate");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const order_validator_1 = require("../validators/order.validator");
const router = express_1.default.Router();
router.post("/placeOrder", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), (0, validate_1.validate)(order_validator_1.orderBaseSchema), order_controller_1.placeOrder);
router.get("/getUserOrders", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), order_controller_1.getUserOrders);
exports.default = router;
//# sourceMappingURL=order.route.js.map