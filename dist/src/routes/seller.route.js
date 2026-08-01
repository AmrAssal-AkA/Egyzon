"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
{ /* Seller Routes */ }
const StoreCreation_1 = __importDefault(require("../controller/seller/StoreCreation"));
const upload_middleware_1 = require("../middleware/upload.middleware");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const validate_1 = require("../middleware/validate");
const seller_validate_1 = require("../validators/seller.validate");
const router = express_1.default.Router();
router.post("/apply", Auth_middleware_1.isAuthenticated, (0, validate_1.validate)(seller_validate_1.sellerBaseSchema), upload_middleware_1.upload.fields([{ name: 'commercialRegisterImage', maxCount: 1 }, { name: 'taxCardImage', maxCount: 1 }]), StoreCreation_1.default.createRequestToJoin);
router.post("/setup", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Seller), (0, validate_1.validate)(seller_validate_1.sellerSetupStoreSchema), upload_middleware_1.upload.fields([{ name: 'storeLogo', maxCount: 1 }, { name: 'storeBanner', maxCount: 1 }]), StoreCreation_1.default.setupStore);
exports.default = router;
//# sourceMappingURL=seller.route.js.map