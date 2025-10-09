// server/configs/config.js
const path = require("path");
const dbDir = path.resolve(__dirname, "../db");
const dbPath = path.join(dbDir, "database.sqlite");

if (dbDir && !require("fs").existsSync(dbDir)) {
  require("fs").mkdirSync(dbDir);
}

// Database configurations for different environments
module.exports = {
  development: {
    dialect: "sqlite",
    storage: dbPath,
    logging: console.log,
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: console.log,
  },
  production: {
    dialect: process.env.DB_DIALECT || "postgres",
    use_env_variable: process.env.DATABASE_URL,
    logging: false,
  },
};
