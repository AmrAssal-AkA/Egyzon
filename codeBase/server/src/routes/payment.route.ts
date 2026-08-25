import express from "express";
import { handlePaymobWebhook } from "../controller/payment.controller";

const router = express.Router();

router.post("/paymob/webhook", handlePaymobWebhook);

export default router;
