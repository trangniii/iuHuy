require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  SESSION_SECRET: process.env.SESSION_SECRET || "session-secret",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_NAME: process.env.DB_NAME || "database",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_DIALECT: process.env.DB_DIALECT || "mysql",
  DB_PORT: process.env.DB_PORT || 3306,
};
