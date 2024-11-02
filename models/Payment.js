const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const { PENDING, COMPLETED, FAILED } = require("./enum/PaymentStatus");
const { CARD, CASH, PAYPAL } = require("./enum/PaymentMethod");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  paymentMethod: { type: DataTypes.ENUM(CARD, CASH, PAYPAL), allowNull: true },
  status: {
    type: DataTypes.ENUM(PENDING, COMPLETED, FAILED),
    allowNull: false,
  },
});

module.exports = Payment;
