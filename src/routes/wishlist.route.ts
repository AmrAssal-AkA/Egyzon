import express from "express";

const router = express.Router();

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controller/wishlistController";
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

export default router;
