"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
{ /* Seller Routes */ }
const StoreCreation_controller_1 = __importDefault(require("../controller/seller/StoreCreation.controller"));
const upload_middleware_1 = require("../middleware/upload.middleware");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const validate_1 = require("../middleware/validate");
const seller_validate_1 = require("../validators/seller.validate");
const seller_controller_1 = require("../controller/seller.controller");
const router = express_1.default.Router();
router.post("/apply", Auth_middleware_1.isAuthenticated, upload_middleware_1.upload.fields([{ name: 'commercialRegisterImage', maxCount: 1 }, { name: 'taxCardImage', maxCount: 1 }]), (0, validate_1.validate)(seller_validate_1.sellerBaseSchema), StoreCreation_controller_1.default.createRequestToJoin);
router.post("/setup", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), (0, validate_1.validate)(seller_validate_1.sellerSetupStoreSchema), upload_middleware_1.upload.fields([{ name: 'storeLogo', maxCount: 1 }, { name: 'storeBanner', maxCount: 1 }]), StoreCreation_controller_1.default.setupStore);
router.get("/total-products", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), seller_controller_1.SellerController.getTotalProducts);
router.get("/total-orders", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), seller_controller_1.SellerController.getTotalOrders);
router.get("/total-revenue", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), seller_controller_1.SellerController.getTotalRevenue);
router.get("/total-selling-product", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), seller_controller_1.SellerController.getTopSellingProducts);
router.get("/getAllOrders", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), seller_controller_1.SellerController.getAllOrders);
router.get("/totalInventoryValue", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), seller_controller_1.SellerController.totalInventoryValue);
exports.default = router;
//# sourceMappingURL=seller.route.js.map