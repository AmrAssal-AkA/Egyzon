"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const wishlist_controller_1 = require("../controller/wishlist.controller");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
router.post("/", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), wishlist_controller_1.addToWishlist);
router.delete("/remove", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), wishlist_controller_1.removeFromWishlist);
router.get("/", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), wishlist_controller_1.getWishlist);
router.post("/move-to-cart", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), wishlist_controller_1.moveToCart);
exports.default = router;
//# sourceMappingURL=wishlist.route.js.map