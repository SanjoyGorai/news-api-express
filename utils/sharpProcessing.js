import sharp from "sharp";
import path from "path";
import fsExtra from "fs-extra";

export const convertToWebp = async (filePath) => {
  const outputFilePath = `${path.parse(filePath).name}.webp`;
  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(path.resolve("uploads", outputFilePath));

  // Optionally remove the original file
  // await fsExtra.remove(filePath);

  return outputFilePath;
};
