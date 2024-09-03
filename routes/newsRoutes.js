import express from "express";
import {
  createNews,
  deleteAllNews,
  deleteNewsById,
  filterNews,
  getAllNews,
  getNewsById,
  limitNews,
  searchNews,
  updateNewsById,
} from "../controllers/newsController.js";
import { upload } from "../middlewares/upload.js";
import { newsValidationRules, validate } from "../middlewares/validators.js";

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  newsValidationRules(),
  validate,
  createNews
);
router.get("/", getAllNews);
router.get("/:id", getNewsById);
router.put("/:id", updateNewsById);
router.delete("/:id", deleteNewsById);
router.delete("/", deleteAllNews);
router.get("/search", searchNews);
router.get("/", filterNews);
router.get("/max", limitNews);

export default router;
