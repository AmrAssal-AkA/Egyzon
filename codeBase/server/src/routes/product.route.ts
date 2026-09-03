import express from "express";
import {ProductController} from "../controller/product.controller";
import { validate } from "../middleware/validate";
import {
  createProductSchema,
  getAllProductsSchema,
  updateProductSchema,
  searchProductsSchema,
} from "../validators/product.validate";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import { userRole } from "../types/auth.types";
import { upload } from "../middleware/upload.middleware";
import { searchProducts } from "../controller/search.controller";
import { uploadLimiter } from "../middleware/rateLimiter";

const router = express.Router();

router.get(
  "/",
  validate(getAllProductsSchema),
  ProductController.getAllProducts,
);
router.get("/search", validate(searchProductsSchema), searchProducts);
router.post(
  "/addProduct",
  isAuthenticated,
  Authorize(userRole.Seller),
  uploadLimiter,
  upload.array("image", 3),
  validate(createProductSchema),
  ProductController.createProduct,
);
router.patch(
  "/seller/product/:productId",
  isAuthenticated,
  Authorize(userRole.Seller),
  uploadLimiter,
  validate(updateProductSchema),
  ProductController.applyDiscount,
);
router.get("/:productId", ProductController.getProductById);
router.get(
  "/seller/products",
  isAuthenticated,
  Authorize(userRole.Seller),
  ProductController.getSellerProducts,
);
router.put(
  "/seller/:productId",
  isAuthenticated,
  Authorize(userRole.Seller),
  uploadLimiter,
  upload.array("image", 3),
  validate(updateProductSchema),
  ProductController.updateProduct,
);
router.delete(
  "/seller/product/:productId",
  isAuthenticated,
  Authorize(userRole.Seller),
  ProductController.deleteProduct,
);

router.patch('/seller/product/:productId/stock', isAuthenticated, Authorize(userRole.Seller), ProductController.setStock);


export default router;
