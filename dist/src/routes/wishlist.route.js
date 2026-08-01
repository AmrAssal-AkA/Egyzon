"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const wishlistController_1 = require("../controller/wishlistController");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
router.post("/", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), wishlistController_1.addToWishlist);
router.delete("/remove", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), wishlistController_1.removeFromWishlist);
router.get("/", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Customer), wishlistController_1.getWishlist);
exports.default = router;
//# sourceMappingURL=wishlist.route.js.map