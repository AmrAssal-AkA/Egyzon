import mongoose, { HydratedDocument, Schema } from "mongoose";
import { IUser, ICustomer, ISeller } from "../types/User.types"; 

const options = {discriminatorKey: 'role', collection: "User", timestamps: true}


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
    required: function(this: IUser) {
         if (this.googleId || this.facebookId) {
            return false;
         }
         return true;
    },
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
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiration: {
    type: Date,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationTokenExpiration: {
    type: Date,
  },
  forgetPasswordToken: {
    type: String,
  },
  forgetPasswordTokenExpiration: {
    type: Date,
  },
  completedOnboarding: {
    type: Boolean,
    default: false,
  },
  joinedDate: {type: Date, default: function (){
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }},
  lastActiveDate: {
    type: Date,
    default: function (){
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    }
  }
}, options);



export default mongoose.model("User", UserSchema);
