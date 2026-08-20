import express from "express";

{/* Seller Routes */}
import AppSellerController  from "../controller/seller/StoreCreation.controller";
import {upload} from "../middleware/upload.middleware";
import {isAuthenticated} from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";
import { validate } from "../middleware/validate";
import { sellerBaseSchema, sellerSetupStoreSchema,  } from "../validators/seller.validate";
import { SellerController } from "../controller/seller.controller";

const router = express.Router();

router.post("/apply", isAuthenticated, upload.fields([{ name: 'commercialRegisterImage', maxCount: 1 }, { name: 'taxCardImage', maxCount: 1 }]),validate(sellerBaseSchema), AppSellerController.createRequestToJoin);
router.post("/setup", isAuthenticated, Authorize(userRole.Seller) ,validate(sellerSetupStoreSchema), upload.fields([{ name: 'storeLogo', maxCount: 1 }, { name: 'storeBanner', maxCount: 1 }]), AppSellerController.setupStore);
router.get("/total-products", isAuthenticated, Authorize(userRole.Seller), SellerController.getTotalProducts);
router.get("/total-orders", isAuthenticated, Authorize(userRole.Seller), SellerController.getTotalOrders);
router.get("/total-revenue", isAuthenticated, Authorize(userRole.Seller), SellerController.getTotalRevenue);
router.get("/total-selling-product", isAuthenticated, Authorize(userRole.Seller), SellerController.getTopSellingProducts);
router.get("/getAllOrders", isAuthenticated, Authorize(userRole.Seller), SellerController.getAllOrders);
router.get("/totalInventoryValue", isAuthenticated, Authorize(userRole.Seller), SellerController.totalInventoryValue)

export default router;
