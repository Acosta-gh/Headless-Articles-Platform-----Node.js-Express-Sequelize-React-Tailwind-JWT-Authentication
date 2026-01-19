"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tokens", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      tokenHash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      type: {
        type: Sequelize.ENUM("password_reset", "email_verify"),
        allowNull: false,
      },

      used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      usedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    await queryInterface.addIndex("Tokens", ["userId"]);
    await queryInterface.addIndex("Tokens", ["type"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Tokens");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Tokens_type";'
    );
  },
};
