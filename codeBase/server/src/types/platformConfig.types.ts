import { Types }from 'mongoose'

export interface IPlatformConfig {
    PlatformFeePercentage: number;
    taxRate: number;
    updatedBy: Types.ObjectId;
    updateAt: Date;
}