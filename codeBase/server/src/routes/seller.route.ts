import express from "express";

import {createRequestToJoin, setupStore} from "../controller/seller/StoreCreation.controller";
import { getWalletBalance } from "../controller/wallet.controller";
import {upload} from "../middleware/upload.middleware";
import {isAuthenticated} from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";
import { validate } from "../middleware/validate";
import { sellerBaseSchema, sellerSetupStoreSchema,  } from "../validators/seller.validate";
import { SellerController } from "../controller/seller.controller";
import { uploadLimiter } from "../middleware/rateLimiter";

const router = express.Router();

router.post("/apply", isAuthenticated, uploadLimiter, upload.fields([{ name: 'commercialRegisterImage', maxCount: 1 }, { name: 'taxCardImage', maxCount: 1 }]),  validate(sellerBaseSchema), createRequestToJoin);
router.post("/setup", isAuthenticated, Authorize(userRole.Seller), uploadLimiter, upload.fields([{ name: 'storeLogo', maxCount: 1 }, { name: 'storeBanner', maxCount: 1 }]), validate(sellerSetupStoreSchema), setupStore);
router.get("/total-products", isAuthenticated, Authorize(userRole.Seller), SellerController.getTotalProducts);
router.get("/total-orders", isAuthenticated, Authorize(userRole.Seller), SellerController.getTotalOrders);
router.get("/total-revenue", isAuthenticated, Authorize(userRole.Seller), SellerController.getTotalRevenue);
router.get("/total-selling-product", isAuthenticated, Authorize(userRole.Seller), SellerController.getTopSellingProducts);
router.get("/getAllOrders", isAuthenticated, Authorize(userRole.Seller), SellerController.getAllOrders);
router.get("/totalInventoryValue", isAuthenticated, Authorize(userRole.Seller), SellerController.totalInventoryValue);
router.patch("/change-order-status", isAuthenticated, Authorize(userRole.Seller), SellerController.changeOrderStatus);
router.get("/balance",isAuthenticated, Authorize(userRole.Seller), getWalletBalance);
router.get("/avg-order-value", isAuthenticated, Authorize(userRole.Seller), SellerController.getAvgOrderValue);
router.get("/sales-performance-indicator", isAuthenticated, Authorize(userRole.Seller), SellerController.salesPerformanceIndicator);
router.get("/get-salses-by-category", isAuthenticated, Authorize(userRole.Seller), SellerController.getSalesByCategory);
router.get("/getStoreDetails/:sellerId",  SellerController.getStoreDetails);

export default router;
