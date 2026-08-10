import express from "express";

import { CustomerController } from "../controller/customer/updateCustomer.Controller";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";
import {validate} from "../middleware/validate";
import { resetPasswordSchema } from "../validators/user.validate";

const router = express.Router();

router.put("/change-password", isAuthenticated, Authorize(userRole.Customer), validate(resetPasswordSchema), CustomerController.changePassword);

export default router;