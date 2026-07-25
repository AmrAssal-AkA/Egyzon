import express from 'express';

import { createCart } from '../controller/cart.controller';
import {cartSchema} from "../validators/cart.validate";
import {validate} from "../middleware/validate";
import { isAuthenticated } from '../middleware/Auth.middleware';
import { Authorize } from '../middleware/Authorization';
import { userRole } from '../types/auth.types';


const router = express.Router();


router.post("/", isAuthenticated, Authorize(userRole.Customer), validate(cartSchema), createCart);



export default router