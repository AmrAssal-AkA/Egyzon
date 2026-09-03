import { Types }from 'mongoose'

export interface IPlatformConfig {
    PlatformFeePercentage: number;
    taxRate: number;
    totalRevenue: number;
    updatedBy: Types.ObjectId;
    updatedAt: Date;
}