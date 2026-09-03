"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["sale"] = "sale";
    TransactionType["refund"] = "refund";
    TransactionType["withdrawal"] = "withdrawal";
    TransactionType["deposit"] = "deposit";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["pending"] = "pending";
    TransactionStatus["completed"] = "completed";
    TransactionStatus["failed"] = "failed";
    TransactionStatus["cancelled"] = "cancelled";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
//# sourceMappingURL=wallet.types.js.map