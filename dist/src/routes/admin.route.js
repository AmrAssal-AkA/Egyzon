"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Adminloggin_controller_1 = require("../controller/AdminControllers/Adminloggin.controller");
const SellerApplicationManag_controller_1 = require("../controller/AdminControllers/SellerApplicationManag.controller");
const Admin_controller_1 = require("../controller/AdminControllers/Admin.controller");
const validate_1 = require("../middleware/validate");
const user_validate_1 = require("../validators/user.validate");
const Auth_middleware_1 = require("../middleware/Auth.middleware");
const Authorization_1 = require("../middleware/Authorization");
const auth_types_1 = require("../types/auth.types");
const router = express_1.default.Router();
router.post('/login', (0, validate_1.validate)(user_validate_1.adminLoginSchema), Adminloggin_controller_1.AdminLoggingin);
router.get('/seller-applications/pending', Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), SellerApplicationManag_controller_1.ManageSellerApplicationsController.getAllPendingSellerApplications);
router.post('/seller-applications/:sellerId/approve', Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), SellerApplicationManag_controller_1.ManageSellerApplicationsController.approveSeller);
router.post('/seller-applications/:sellerId/request-additional-documents', Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), SellerApplicationManag_controller_1.ManageSellerApplicationsController.requestAdditionalDocuments);
router.post('/seller-applications/:sellerId/reject', Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), SellerApplicationManag_controller_1.ManageSellerApplicationsController.rejectseller);
router.get("/user", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), Admin_controller_1.AdminController.getAllUsers);
router.patch("/promoteUserToAdmin/:userId", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), Admin_controller_1.AdminController.promoteToAdmin);
router.patch("/BlockTheUser/:userId", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), Admin_controller_1.AdminController.BlockUser);
router.patch('/acivateUser/:userId', Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), Admin_controller_1.AdminController.activateUser);
router.get("/allSellers", Auth_middleware_1.isAuthenticated, (0, Authorization_1.Authorize)(auth_types_1.userRole.Admin), SellerApplicationManag_controller_1.ManageSellerApplicationsController.getAllSellers);
exports.default = router;
//# sourceMappingURL=admin.route.js.map