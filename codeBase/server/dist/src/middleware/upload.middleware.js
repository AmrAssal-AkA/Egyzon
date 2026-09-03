"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedimageTypes = exports.Max_Image_Size = exports.validateImageFile = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const file_type_1 = require("file-type");
const storage = multer_1.default.memoryStorage();
const allowedimageTypes = new Set(["image/jpeg", "image/png", "image/gif", "image/jpg"]);
exports.allowedimageTypes = allowedimageTypes;
const Max_Image_Size = 25 * 1024 * 1024;
exports.Max_Image_Size = Max_Image_Size;
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: Max_Image_Size },
});
exports.upload = upload;
const validateImageFile = async (file) => {
    const fileType = await (0, file_type_1.fileTypeFromBuffer)(file.buffer);
    if (!fileType || !allowedimageTypes.has(fileType.mime))
        return;
};
exports.validateImageFile = validateImageFile;
//# sourceMappingURL=upload.middleware.js.map