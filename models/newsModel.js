import { DataTypes } from "sequelize";
import { nanoid } from "nanoid";
import sequelize from "../config/database.js";

const News = sequelize.define("News", {
  id: {
    type: DataTypes.STRING,
    defaultValue: nanoid,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default News;
