const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  genre: { type: DataTypes.STRING(255), allowNull: false },
  releaseDate: { type: DataTypes.DATE, allowNull: false },
  posterUrl: { type: DataTypes.STRING(255), allowNull: false },
});


module.exports = Movie;
