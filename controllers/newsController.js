import fs from "fs-extra";
import News from "../models/newsModel.js";
import { validationResult } from "express-validator";
import { uploadImage } from "../middlewares/upload.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { nanoid } from "nanoid";

const createNews = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const webpImagePath = await uploadImage(req.file);
    console.log("webpImagePath: ", webpImagePath);

    const result = await uploadToCloudinary(webpImagePath);
    console.log("result", result);

    const news = await News.create({
      author: req.body.author,
      title: req.body.title,
      imageUrl: result,
      content: req.body.content,
    });

    // Delete the image from the local server
    fs.unlinkSync(webpImagePath);

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other CRUD methods (getAllNews, getNewsById, updateNewsById, deleteNewsById, deleteAllNews) will follow a similar pattern
export { createNews };
