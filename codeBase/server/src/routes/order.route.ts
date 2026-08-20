import express from 'express';
import {placeOrder} from '../controller/order.controller';
import { validate } from '../middleware/validate';
import {isAuthenticated} from '../middleware/Auth.middleware';
import { Authorize } from '../middleware/Authorization';
import { userRole } from '../types/auth.types';
import { orderBaseSchema } from '../validators/order.validator';


const router = express.Router();



router.post("/placeOrder", isAuthenticated, Authorize(userRole.Customer), validate(orderBaseSchema), placeOrder);




export default router;