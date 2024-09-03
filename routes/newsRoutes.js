import express from "express";
import {
  createNews,
  deleteAllNews,
  deleteNewsById,
  getAllNews,
  getNewsById,
} from "../controllers/newsController.js";
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
router.get("/news/:id", getNewsById);
router.delete("/news/:id", deleteNewsById);
router.delete("/news", deleteAllNews);

export default router;
