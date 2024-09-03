import express from "express";
import { createNews, getAllNews } from "../controllers/newsController.js";
import { upload } from "../middlewares/upload.js";
import { newsValidationRules, validate } from "../middlewares/validators.js";

const router = express.Router();

router.post(
  "/news",
  upload.single("image"),
  newsValidationRules(),
  validate,
  createNews
);

router.get("/news", getAllNews);

export default router;
