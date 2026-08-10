import mongoose, {Schema} from "mongoose";

import {RefreshTokenInput} from "../types/auth.types";

const refreshTokenSchema = new Schema<RefreshTokenInput>({
    refreshToken: {type: String, required: true},
    userId: {type: String, required: true}
}, {timestamps: true});

const RefreshTokenModel = mongoose.model<RefreshTokenInput>('RefreshToken', refreshTokenSchema);
export default RefreshTokenModel;