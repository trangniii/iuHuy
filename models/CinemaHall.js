const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const CinemaHall = sequelize.define("CinemaHall", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING(255), allowNull: false },
  seatRows: { type: DataTypes.INTEGER, allowNull: false },
  seatColumns: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = CinemaHall;
