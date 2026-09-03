import express from "express";

import { AdminLoggingin } from "../controller/AdminControllers/Adminloggin.controller";
import { ManageSellerApplicationsController } from "../controller/AdminControllers/SellerApplicationManag.controller";
import { AdminController } from "../controller/Admin.controller";
import { validate } from "../middleware/validate";
import { adminLoginSchema } from "../validators/user.validate";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";
import { setPlatformFeeSchema } from "../validators/admin.validate";

const router = express.Router();

router.post("/login", validate(adminLoginSchema), AdminLoggingin);
router.get(
  "/seller-applications/pending",
  isAuthenticated,
  Authorize(userRole.Admin),
  ManageSellerApplicationsController.getAllPendingSellerApplications,
);
router.post(
  "/seller-applications/:sellerId/approve",
  isAuthenticated,
  Authorize(userRole.Admin),
  ManageSellerApplicationsController.approveSeller,
);
router.post(
  "/seller-applications/:sellerId/request-additional-documents",
  isAuthenticated,
  Authorize(userRole.Admin),
  ManageSellerApplicationsController.requestAdditionalDocuments,
);
router.post(
  "/seller-applications/:sellerId/reject",
  isAuthenticated,
  Authorize(userRole.Admin),
  ManageSellerApplicationsController.rejectseller,
);
router.get(
  "/user",
  isAuthenticated,
  Authorize(userRole.Admin),
  AdminController.getAllUsers,
);
router.patch(
  "/promoteUserToAdmin/:userId",
  isAuthenticated,
  Authorize(userRole.Admin),
  AdminController.promoteToAdmin,
);
router.patch(
  "/BlockTheUser/:userId",
  isAuthenticated,
  Authorize(userRole.Admin),
  AdminController.BlockUser,
);
router.patch(
  "/acivateUser/:userId",
  isAuthenticated,
  Authorize(userRole.Admin),
  AdminController.activateUser,
);
router.get(
  "/allSellers",
  isAuthenticated,
  Authorize(userRole.Admin),
  ManageSellerApplicationsController.getAllSellers,
);
router.post(
  "/setPlatformFee",
  isAuthenticated,
  Authorize(userRole.Admin),
  AdminController.setPlatformFee,
);
router.get(
  "/getPlatformFee",
  isAuthenticated,
  Authorize(userRole.Admin),
  AdminController.getPlatformFee,
);
router.get('/getAllSellerActiveCounts', isAuthenticated, Authorize(userRole.Admin), AdminController.getAllSellerActiveCounts);
router.get('/getAllSellerPendingCounts', isAuthenticated, Authorize(userRole.Admin), AdminController.getAllSellerPendingCounts);
router.get('/getSellerProductsCategory',isAuthenticated, Authorize(userRole.Admin), AdminController.getSellerProductsCategory);
router.get('/getTotalRevenueInPlatform', isAuthenticated, Authorize(userRole.Admin), AdminController.getTotalRevenueInPlatform);
router.get('/getTotalOrdersInPlatform', isAuthenticated, Authorize(userRole.Admin), AdminController.getAllOrderOnPlatform);
router.get('/getPlatformRevenueGrowth', isAuthenticated, Authorize(userRole.Admin), AdminController.getPlatformRevenueGrowth);


export default router;
