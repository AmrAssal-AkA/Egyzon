import mongoose from "mongoose";
import { IWallet } from "../types/wallet.types";
export declare const Wallet: mongoose.Model<IWallet, {}, {}, {}, mongoose.Document<unknown, {}, IWallet, {}, mongoose.DefaultSchemaOptions> & IWallet & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWallet>;
//# sourceMappingURL=wallet.model.d.ts.map