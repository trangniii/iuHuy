const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const { RESERVED, EXPIRED } = require("./enum/TicketStatus");

const TicketReservation = sequelize.define("TicketReservation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  showtimeId: { type: DataTypes.INTEGER, allowNull: false },
  seatId: { type: DataTypes.INTEGER, allowNull: false },
  reservedAt: { type: DataTypes.TIME, allowNull: false },
  expiresAt: { type: DataTypes.TIME, allowNull: false },
  status: { type: DataTypes.ENUM(RESERVED, EXPIRED), allowNull: false },
});

module.exports = TicketReservation;
