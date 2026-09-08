import express from "express";

import { WalletController } from "../controller/wallet.controller";
import { isAuthenticated } from "../middleware/Auth.middleware";
import { Authorize } from "../middleware/Authorization";
import {userRole} from "../types/auth.types";

const router = express.Router();

router.get("/balance",isAuthenticated, Authorize(userRole.Seller), WalletController.getWalletBalance);
router.post("/withdraw", isAuthenticated, Authorize(userRole.Seller), WalletController.withdrawFunds);
router.get("/transactions", isAuthenticated, Authorize(userRole.Seller), WalletController.getTransactionHistory);

export default router;