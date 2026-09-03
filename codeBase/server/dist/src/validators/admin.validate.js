"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPlatformFeeSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.setPlatformFeeSchema = zod_1.default.object({
    feePercentage: zod_1.default.number().min(0, "feePercentage must be at least 0").max(100, "feePercentage must be at most 100"),
    taxRate: zod_1.default.number().min(0, "taxRate must be at least 0").max(100, "taxRate must be at most 100"),
});
//# sourceMappingURL=admin.validate.js.map