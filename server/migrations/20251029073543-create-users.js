"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      admin: { type: Sequelize.BOOLEAN, defaultValue: false },
      banned: { type: Sequelize.BOOLEAN, defaultValue: false },
      password: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Users");
  },
};
