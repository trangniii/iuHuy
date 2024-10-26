const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Showtime = sequelize.define("Showtime", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  movieId: { type: DataTypes.INTEGER, allowNull: false },
  cinemaHallId: { type: DataTypes.INTEGER, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Showtime;
