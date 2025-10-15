const { DataTypes } = require("sequelize");
const { sequelize } = require("@/database/sequelize");

const Article = sequelize.define(
  "Article",
  {
    authorId: { // Who wrote the article
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: { // Title of the article
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured:{ // Is the article featured?
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    banner: { // URL of the banner image
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: { // Main content of the article
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tempId: { // Temporary ID for associating images before article creation
      type: DataTypes.STRING,
      allowNull: true,
    },  
  },
  {
    timestamps: true,
  }
);

module.exports = { Article };