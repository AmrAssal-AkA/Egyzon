import multer from "multer";
import path from "path";


const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    console.log("Error: File upload only supports the following filetypes - " + filetypes);
    cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
  },
  limits: { fileSize: 25 * 1024 * 1024 }, 
})
