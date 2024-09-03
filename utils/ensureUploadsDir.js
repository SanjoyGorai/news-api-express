import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureUploadsDir = () => {
  const uploadPath = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
};

export { ensureUploadsDir };
