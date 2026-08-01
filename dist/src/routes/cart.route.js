"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controller/cart.controller");
const cart_validate_1 = require("../validators/cart.validate");
const validate_1 = require("../middleware/validate");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const router = express_1.default.Router();
router.post("/", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), (0, validate_1.validate)(cart_validate_1.cartSchema), cart_controller_1.createCart);
exports.default = router;
//# sourceMappingURL=cart.route.js.map