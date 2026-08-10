import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import  Admin  from "../models/adminModel";
import dotenv from "dotenv";
dotenv.config();

async function seedAdmin() {
    await mongoose.connect(process.env.MONGO_URI!)

    const existingAdmin = await Admin.findOne({ email: "admin@egyzon.com" });
    if (existingAdmin) return console.log("Admin user already exists");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
        email: "admin@egyzon.com",
        password: hashedPassword,
        FirstName: "Super",
        LastName: "Admin",
        role: "admin",
        isVerified: true,
        completedOnboarding: true,

    })
    await admin.save();
    console.log("Admin user seeded successfully");

}
seedAdmin().catch((error) => {
    console.error("Error seeding admin user:", error);
    process.exit(1);
});