import fs from "fs-extra";
import News from "../models/newsModel.js";
import { validationResult } from "express-validator";
import { uploadImage } from "../middlewares/upload.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { nanoid } from "nanoid";
import { Op } from "sequelize";

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

const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the news" });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the news" });
  }
};

const updateNewsById = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    if (req.file) {
      const webpImagePath = await uploadImage(req.file);
      const result = await uploadToCloudinary(webpImagePath);
      req.body.imageUrl = result.secure_url;

      // Delete the image from the local server
      fs.unlinkSync(webpImagePath);
    }

    await news.update(req.body);
    res.status(200).json(news);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the news" });
  }
};

const deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    await news.destroy();
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the news" });
  }
};

const deleteAllNews = async (req, res) => {
  try {
    await News.destroy({ where: {}, truncate: true });
    res.status(200).json({ message: "All news deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting all news" });
  }
};

const searchNews = async (req, res) => {
  const { query } = req.query;
  console.log("search query: ", query);

  try {
    const news = await News.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    if (news.length === 0) {
      return res
        .status(404)
        .json({ message: "No matching news articles found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "An error occurred during the search" });
  }
};

export {
  createNews,
  getAllNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
  deleteAllNews,
  searchNews,
};
