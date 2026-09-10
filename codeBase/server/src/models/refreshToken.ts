import mongoose, {Schema} from "mongoose";

import {RefreshTokenInput} from "../types/auth.types";

const refreshTokenSchema = new Schema<RefreshTokenInput>({
    refreshToken: {type: String, required: true},
    userId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: '7d'}, // Token expires after 7 days
}, {timestamps: true});

const RefreshTokenModel = mongoose.model<RefreshTokenInput>('RefreshToken', refreshTokenSchema);
export default RefreshTokenModel;