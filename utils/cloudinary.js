import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: nanoid(),
    resource_type: "image",
  });

  return result.secure_url;
};
