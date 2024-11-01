const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const { AVAILABLE, BOOKED } = require("./enum/SeatStatus");

const Seat = sequelize.define("Seat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cinemaHallId: { type: DataTypes.INTEGER, allowNull: false },
  row: { type: DataTypes.INTEGER, allowNull: false },
  number: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM(AVAILABLE, BOOKED), allowNull: false },
});

module.exports = Seat;
