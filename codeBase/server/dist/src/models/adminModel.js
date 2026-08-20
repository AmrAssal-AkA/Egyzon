"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel_1 = __importDefault(require("./userModel"));
const AdminSchema = new mongoose_1.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return `ADM - ${Date.now().toString(36).toUpperCase()}`;
        }
    },
});
exports.default = userModel_1.default.discriminator("admin", AdminSchema, "admin");
//# sourceMappingURL=adminModel.js.map