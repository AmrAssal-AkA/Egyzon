import multer from "multer";
import path from "path";
import {fileTypeFromBuffer} from "file-type";


const storage = multer.memoryStorage();
const allowedimageTypes = new Set(["image/jpeg", "image/png", "image/gif", "image/jpg"]);

const Max_Image_Size = 25 * 1024 * 1024; 

const upload = multer({
  storage: storage,
  limits: { fileSize: Max_Image_Size },
})

const validateImageFile = async (file: Express.Multer.File): Promise<void> => {
  const fileType = await fileTypeFromBuffer(file.buffer);
  if (!fileType || !allowedimageTypes.has(fileType.mime)) return;
}

export { upload, validateImageFile, Max_Image_Size, allowedimageTypes };