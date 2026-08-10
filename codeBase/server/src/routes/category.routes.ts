import express from 'express';
import { CategoryController } from '../controller/category.controller';
import { validate } from '../middleware/validate';
import { createCategorySchema } from '../validators/category.validate';
import { isAuthenticated } from '../middleware/Auth.middleware';
import { Authorize } from '../middleware/Authorization';
import { userRole } from '../types/auth.types';
import { upload } from '../middleware/upload.middleware';

const router = express.Router();

router.post("/addCategory", isAuthenticated, Authorize(userRole.Seller), validate(createCategorySchema), upload.single("image"),CategoryController.createCategory);



export default router;