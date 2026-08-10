"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    key_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const getUploadOptions = (folder) => {
    return {
        folder: folder,
        transformation: [
            { width: 800, height: 800, crop: "limit", quality: "auto" },
            { width: 500, height: 500, crop: "limit", quality: "auto" },
            { width: 200, height: 200, crop: "limit", quality: "auto" },
        ]
    };
};
const uploadImage = async (file, folder) => {
    if (Buffer.isBuffer(file)) {
        return await new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream(getUploadOptions(folder), (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
            stream.end(file);
        });
    }
    return await cloudinary_1.v2.uploader.upload(file, getUploadOptions(folder));
};
exports.default = uploadImage;
//# sourceMappingURL=cloudainry.config.js.map