import mongoose, { HydratedDocument, Schema } from "mongoose";
import { IAdmin } from "../types/User.types";
import User from "./userModel";



const AdminSchema = new Schema<IAdmin>({
    employeeId: {
       type: String,
       required: true,
       unique: true,
       default: function(){
        return `ADM - ${Date.now().toString(36).toUpperCase()}`;
       }
    },

})

export default User.discriminator<IAdmin>("admin", AdminSchema, "admin");