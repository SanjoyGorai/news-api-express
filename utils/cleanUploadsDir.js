import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Manually resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cleanUploadsDir = () => {
  //   const uploadsDir = path.join(__dirname, "uploads");
  const uploadsDir = "./uploads";
  try {
    // Check if uploads directory exists
    if (fs.existsSync(uploadsDir)) {
      // Empty the uploads directory if it contains any files or folders
      fs.emptyDirSync(uploadsDir);
      console.log(
        "All files and folders in the uploads directory have been deleted."
      );
    } else {
      console.log("Uploads directory does not exist, nothing to delete.");
    }
  } catch (error) {
    console.error("Error cleaning uploads directory:", error.message);
  }
};

export { cleanUploadsDir };

// Usage
// cleanUploadsDir();
