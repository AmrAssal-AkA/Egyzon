import multer from "multer";
declare const allowedimageTypes: Set<string>;
declare const Max_Image_Size: number;
declare const upload: multer.Multer;
declare const validateImageFile: (file: Express.Multer.File) => Promise<void>;
export { upload, validateImageFile, Max_Image_Size, allowedimageTypes };
//# sourceMappingURL=upload.middleware.d.ts.map