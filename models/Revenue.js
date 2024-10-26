const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Revenue = sequelize.define("Revenue", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  movieId: { type: DataTypes.INTEGER, allowNull: false },
  totalTicketsSold: { type: DataTypes.INTEGER, allowNull: false },
  totalRevenue: { type: DataTypes.DECIMAL(20, 0), allowNull: false },
});

module.exports = Revenue;
