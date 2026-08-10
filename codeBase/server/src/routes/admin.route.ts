import express from 'express';
import { AdminLoggingin } from '../controller/AdminControllers/Adminloggin.controller';
import {ManageSellerApplicationsController} from "../controller/AdminControllers/SellerApplicationManag.controller"
import {validate} from "../middleware/validate";
import  {adminLoginSchema}  from '../validators/user.validate';
import { isAuthenticated } from '../middleware/Auth.middleware';
import { Authorize } from '../middleware/Authorization';
import { userRole } from '../types/auth.types';

const router = express.Router();



router.post('/login',validate(adminLoginSchema), AdminLoggingin);
router.get('/seller-applications/pending',isAuthenticated, Authorize(userRole.Admin) ,ManageSellerApplicationsController.getAllPendingSellerApplications);
router.post('/seller-applications/:sellerId/approve',isAuthenticated, Authorize(userRole.Admin), ManageSellerApplicationsController.approveSeller);
router.post('/seller-applications/:sellerId/request-additional-documents',isAuthenticated, Authorize(userRole.Admin), ManageSellerApplicationsController.requestAdditionalDocuments);
router.post('/seller-applications/:sellerId/reject',isAuthenticated, Authorize(userRole.Admin), ManageSellerApplicationsController.rejectseller);

export default router;