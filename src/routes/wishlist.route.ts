import express from "express";

const router = express.Router();

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  moveToCart,
} from "../controller/wishlist.controller";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";

router.post("/", isAuthenticated, Authorize(userRole.Customer), addToWishlist);
router.delete(
  "/remove",
  isAuthenticated,
  Authorize(userRole.Customer),
  removeFromWishlist,
);
router.get("/", isAuthenticated, Authorize(userRole.Customer), getWishlist);
router.post(
  "/move-to-cart",
  isAuthenticated,
  Authorize(userRole.Customer),
  moveToCart,
);

export default router;
