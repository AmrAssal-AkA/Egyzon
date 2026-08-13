"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function seedAdmin() {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    const existingAdmin = await adminModel_1.default.findOne({ email: "admin@egyzon.com" });
    if (existingAdmin)
        return console.log("Admin user already exists");
    const hashedPassword = await bcryptjs_1.default.hash("admin123", 10);
    const admin = new adminModel_1.default({
        email: "admin@egyzon.com",
        password: hashedPassword,
        FirstName: "Super",
        LastName: "Admin",
        role: "admin",
        isVerified: true,
        completedOnboarding: true,
    });
    await admin.save();
    console.log("Admin user seeded successfully");
}
seedAdmin().catch((error) => {
    console.error("Error seeding admin user:", error);
    process.exit(1);
});
//# sourceMappingURL=seedAdmin.js.map