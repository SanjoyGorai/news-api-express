import express from "express";
import newsRoutes from "./routes/newsRoutes.js";
import dotenv from "dotenv";
import { cleanUploadsDir } from "./utils/cleanUploadsDir.js";
import { ensureUploadsDirExists } from "./utils/ensureUploadsDirExists.js";

dotenv.config();

const app = express();
cleanUploadsDir();
ensureUploadsDirExists();

app.use(express.json());
app.use("/api/v1", newsRoutes);

export default app;
