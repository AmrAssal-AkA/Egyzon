import mongoose from "mongoose";
import { RefreshTokenInput } from "../types/auth.types";
declare const RefreshTokenModel: mongoose.Model<RefreshTokenInput, {}, {}, {}, mongoose.Document<unknown, {}, RefreshTokenInput, {}, mongoose.DefaultSchemaOptions> & RefreshTokenInput & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, RefreshTokenInput>;
export default RefreshTokenModel;
//# sourceMappingURL=refreshToken.d.ts.map