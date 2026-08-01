"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const validate_1 = require("../middleware/validate");
const product_validate_1 = require("../validators/product.validate");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = express_1.default.Router();
router.get('/', (0, validate_1.validate)(product_validate_1.getAllProductsSchema), productController_1.default.getAllProducts);
router.post('/addProduct', upload_middleware_1.upload.array('image', 3), Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), (0, validate_1.validate)(product_validate_1.createProductSchema), productController_1.default.createProduct);
router.patch('/seller/product/:productId', Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), (0, validate_1.validate)(product_validate_1.updateProductSchema), productController_1.default.applyDiscount);
exports.default = router;
//# sourceMappingURL=product.route.js.map