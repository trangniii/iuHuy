const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const { ADMIN, USER } = require("./enum/UserRole");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(ADMIN, USER),
    defaultValue: USER,
  },
});

module.exports = User;
