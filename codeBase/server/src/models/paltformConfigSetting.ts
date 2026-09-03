import { Schema, model } from "mongoose";
import {IPlatformConfig }from "../types/platformConfig.types";

const PlatformSchema = new Schema<IPlatformConfig>({
    PlatformFeePercentage: { type: Number, required: true },
    taxRate: { type: Number, required: true },
    totalRevenue: { type: Number, default: 0 },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    updatedAt: { type: Date, default: Date.now },
})

export const Platform = model<IPlatformConfig>("Platform", PlatformSchema);