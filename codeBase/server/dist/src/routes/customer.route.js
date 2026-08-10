"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateCustomer_Controller_1 = require("../controller/customer/updateCustomer.Controller");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const validate_1 = require("../middleware/validate");
const user_validate_1 = require("../validators/user.validate");
const router = express_1.default.Router();
router.put("/change-password", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), (0, validate_1.validate)(user_validate_1.resetPasswordSchema), updateCustomer_Controller_1.CustomerController.changePassword);
exports.default = router;
//# sourceMappingURL=customer.route.js.map