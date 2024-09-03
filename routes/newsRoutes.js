import express from "express";
import { createNews } from "../controllers/newsController.js";
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

export default router;
