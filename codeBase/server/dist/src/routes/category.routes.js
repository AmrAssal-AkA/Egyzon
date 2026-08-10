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
const router = express_1.default.Router();
router.post("/addCategory", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), (0, validate_1.validate)(category_validate_1.createCategorySchema), upload_middleware_1.upload.single("image"), category_controller_1.CategoryController.createCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map