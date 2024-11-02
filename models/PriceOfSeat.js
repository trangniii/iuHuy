const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const PriceOfSeat = sequelize.define("PriceOfSeat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  price: { type: DataTypes.DECIMAL(20, 0), allowNull: false },
  startRow: { type: DataTypes.INTEGER, allowNull: false },
  endRow: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = PriceOfSeat;
