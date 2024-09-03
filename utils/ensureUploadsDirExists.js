import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Manually resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ensureUploadsDirExists = () => {
  // const uploadsDir = path.join(__dirname, "uploads");
  const uploadsDir = "./uploads";
  console.log(uploadsDir);

  try {
    // Check if uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      // Create the uploads directory if it doesn't exist
      fs.mkdirSync(uploadsDir);
      console.log("Uploads directory created successfully.");
    } else {
      console.log("Uploads directory already exists.");
    }
  } catch (error) {
    console.error("Error ensuring uploads directory exists:", error.message);
  }
};

export { ensureUploadsDirExists };

// Usage
// ensureUploadsDirExists();
