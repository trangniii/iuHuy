const { Sequelize } = require("sequelize");
const {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_USER,
  DB_DIALECT,
} = require("../constants/env");

const sequelize = new Sequelize({
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  password: DB_PASSWORD,
  username: DB_USER,
  dialect: DB_DIALECT,
});

module.exports = sequelize;
