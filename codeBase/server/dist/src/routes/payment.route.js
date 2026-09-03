"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controller/payment.controller");
const router = express_1.default.Router();
router.post("/paymob/webhook", payment_controller_1.handlePaymobWebhook);
exports.default = router;
//# sourceMappingURL=payment.route.js.map