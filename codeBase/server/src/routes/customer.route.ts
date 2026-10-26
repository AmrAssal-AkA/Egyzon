import express from "express";

import { CustomerController } from "../controller/customer.controller";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";
import {validate} from "../middleware/validate";
import { changePasswordSchema, changeCustomerNameSchema } from "../validators/user.validate";

const router = express.Router();

router.put("/change-password", isAuthenticated, Authorize(userRole.Customer), validate(changePasswordSchema), CustomerController.changePassword);
router.get("/order-history", isAuthenticated, Authorize(userRole.Customer), CustomerController.getCustomerOrderHistory);
router.get("/total-spend",isAuthenticated, Authorize(userRole.Customer), CustomerController.getTotalSpend);
router.get("/total-orders",isAuthenticated, Authorize(userRole.Customer), CustomerController.getTotalOrders);
router.patch("/change-customer-name", isAuthenticated, Authorize(userRole.Customer), validate(changeCustomerNameSchema), CustomerController.changeCustomerName);
router.delete('/delete-customer', isAuthenticated, Authorize(userRole.Customer), CustomerController.deleteCustomerAccount);

export default router;