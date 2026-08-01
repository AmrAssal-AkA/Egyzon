import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User.types";

const UserSchema = new Schema<IUser>({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    default: null,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationTokenExpiration: {
    type: Date,
  },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
