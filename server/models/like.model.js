const DataTypes = require("sequelize");
const { sequelize } = require("@/database/sequelize"); 

const Like = sequelize.define(
  "Like",
  {
    articleId: { // Which article is liked
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: { // Who liked the article
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Like };