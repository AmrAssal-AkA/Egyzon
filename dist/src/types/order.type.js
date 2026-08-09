"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["pending"] = "pending";
    OrderStatus["processing"] = "processing";
    OrderStatus["shipped"] = "shipped";
    OrderStatus["delivered"] = "delivered";
    OrderStatus["cancelled"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["pending"] = "pending";
    PaymentStatus["completed"] = "completed";
    PaymentStatus["failed"] = "failed";
    PaymentStatus["refunded"] = "refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
//# sourceMappingURL=order.type.js.map