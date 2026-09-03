"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controller/category.controller");
const validate_1 = require("../middleware/validate");
const category_validate_1 = require("../validators/category.validate");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const upload_middleware_1 = require("../middleware/upload.middleware");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = express_1.default.Router();
router.post("/addCategory", rateLimiter_1.uploadLimiter, upload_middleware_1.upload.single("image"), Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), (0, validate_1.validate)(category_validate_1.createCategorySchema), category_controller_1.CategoryController.createCategory);
router.get("/getAllCategories", category_controller_1.CategoryController.getAllCategories);
router.post("/addProductToCategory", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), category_controller_1.CategoryController.addProductToCategory);
router.get("/getProductsByCategory/:categoryId", category_controller_1.CategoryController.getProductsByCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map