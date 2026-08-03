import express from 'express';
import productController from '../controller/product.controller';
import { validate } from '../middleware/validate';
import {createProductSchema, getAllProductsSchema, updateProductSchema} from '../validators/product.validate'
import { isAuthenticated } from '../middleware/Auth.middleware';
import { Authorize } from '../middleware/Authorization';
import { userRole } from '../types/auth.types';
import {upload} from '../middleware/upload.middleware';

const router = express.Router();

router.get('/', validate(getAllProductsSchema), productController.getAllProducts);
router.post('/addProduct', upload.array('image', 3), isAuthenticated, Authorize(userRole.Seller),validate(createProductSchema), productController.createProduct);
router.patch('/seller/product/:productId', isAuthenticated, Authorize(userRole.Seller), validate(updateProductSchema), productController.applyDiscount);
router.get("/:productId", productController.getProductById)


export default router;