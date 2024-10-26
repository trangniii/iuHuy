const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Ticket = sequelize.define("Ticket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  showtimeId: { type: DataTypes.INTEGER, allowNull: false },
  seatId: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(20, 0), allowNull: false },
  bookingTime: { type: DataTypes.TIME, allowNull: false },
});

module.exports = Ticket;
