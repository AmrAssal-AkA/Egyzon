import {v2 as cloudinary, type UploadApiResponse} from "cloudinary";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    key_name: process.env.CLOUDINARY_API_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});


const getUploadOptions = (folder: string) => {
    return {
        folder: folder,
        transformation: [
            {width: 800, height: 800, crop: "limit", quality: "auto"},
            {width: 500, height: 500, crop: "limit", quality: "auto"},
            {width: 200, height: 200, crop: "limit", quality: "auto"},
        ]
    }
}

const uploadImage = async (file: Buffer | string, folder: string) => {
    if (Buffer.isBuffer(file)) {
        return await new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                getUploadOptions(folder),
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result!);
                    }
                }
            );
            stream.end(file);
        });
    }
    logger.info(`Uploading image to Cloudinary: ${file}`);
    return await cloudinary.uploader.upload(file, getUploadOptions(folder));
}

export default uploadImage;