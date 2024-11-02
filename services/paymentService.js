const { CASH } = require("../models/enum/PaymentMethod");
const { PENDING } = require("../models/enum/PaymentStatus");
const Payment = require("../models/Payment");

const paymentService = {
  async createPayment({ ticketId, amount, paymentMethod, status }) {
    return Payment.create({
      ticketId,
      amount,
      paymentMethod: paymentMethod || CASH,
      status: status || PENDING,
    });
  },
};
module.exports = paymentService;
