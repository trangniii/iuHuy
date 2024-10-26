const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const { PENDING, COMPLETED, FAILED } = require("./enum/PaymentStatus");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  ticketId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  paymentMethod: { type: DataTypes.STRING(50), allowNull: false },
  status: {
    type: DataTypes.ENUM(PENDING, COMPLETED, FAILED),
    allowNull: false,
  },
});

module.exports = Payment;
