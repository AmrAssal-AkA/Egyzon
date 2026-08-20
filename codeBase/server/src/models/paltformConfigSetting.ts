import { Schema, model } from "mongoose";
import {IPlatformConfig }from "../types/platformConfig.types";

const PlatformConfigSettingSchema = new Schema<IPlatformConfig>({
    PlatformFeePercentage: { type: Number, required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    updateAt: { type: Date, default: Date.now },
})

export const PlatformConfigSetting = model<IPlatformConfig>("PlatformConfigSetting", PlatformConfigSettingSchema);