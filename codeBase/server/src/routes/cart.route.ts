import express from "express";

import cartController from "../controller/cart.controller";
import { cartSchema } from "../validators/cart.validate";
import { validate } from "../middleware/validate";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  Authorize(userRole.Customer),
  validate(cartSchema),
  cartController.createCart,
);
router.get(
  "/",
  isAuthenticated,
  Authorize(userRole.Customer),
  cartController.getCart,
);

router.delete("/remove", isAuthenticated, Authorize(userRole.Customer), cartController.removeCart);

export default router;
