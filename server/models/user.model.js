// models/user.model.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("@/database/sequelize"); 

const User = sequelize.define(
  "User",
  {
    username: { // Unique username
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    verified: { // Whether the user is verified
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: { // User's email address
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { // Hashed password
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true, // Enables soft deletes
  }
);

module.exports = { User };