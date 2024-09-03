import multer from "multer";
import fs from "fs-extra";
import sharp from "sharp";
import path from "path";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

const uploadImage = async (file) => {
  const uploadsDir = path.join(process.cwd(), "uploads");

  // Ensure the uploads directory exists
  fs.ensureDirSync(uploadsDir);

  const webpImagePath = path.join(uploadsDir, `${Date.now()}.webp`);
  await sharp(file.buffer).webp().toFile(webpImagePath);

  return webpImagePath;
};

export { upload, uploadImage };
