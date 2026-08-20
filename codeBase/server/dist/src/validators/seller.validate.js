"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerSetupStoreSchema = exports.sellerBaseSchema = void 0;
const zod_1 = require("zod");
const typeTextRegex = zod_1.z.string().regex(/^[a-zA-Z0-9\s-]+$/, { message: "Only alphanumeric characters, spaces, and hyphens are allowed" });
const multerFileSchema = zod_1.z.object({
    originalname: zod_1.z.string(),
    mimetype: zod_1.z.string(),
    buffer: zod_1.z.instanceof(Buffer),
    size: zod_1.z.number(),
});
exports.sellerBaseSchema = zod_1.z.object({
    body: zod_1.z.object({
        storeName: zod_1.z.string().min(1, { message: "Store name is required" }),
        commercialRegisterNumber: zod_1.z.string().min(1, { message: "Commercial register number is required" }),
        taxCardNumber: zod_1.z.string().min(1, { message: "Tax card number is required" }),
    }),
    files: zod_1.z.object({
        commercialRegisterImage: zod_1.z.array(multerFileSchema, { message: "Commercial register image is required" }).min(1, { message: "Commercial register image is required" }),
        taxCardImage: zod_1.z.array(multerFileSchema, { message: "Tax card image is required" }).min(1, { message: "Tax card image is required" }),
    })
});
exports.sellerSetupStoreSchema = zod_1.z.object({
    body: zod_1.z.object({
        storeDescription: typeTextRegex.min(1, { message: "Store description is required" }),
        storeLogo: zod_1.z.instanceof(File, { message: "Store logo is required" }),
        storeBanner: zod_1.z.instanceof(File, { message: "Store banner is required" }),
        storeType: zod_1.z.enum(["physical", "online", "both"], { message: "Store type is required" }),
        storephysicalAddress: zod_1.z.string().optional(),
        storeOnlineAddress: zod_1.z.string().optional(),
    })
});
//# sourceMappingURL=seller.validate.js.map