const { NOT_FOUND } = require("../models/enum/HttpCode");
const { CASH } = require("../models/enum/PaymentMethod");
const { PENDING, COMPLETED } = require("../models/enum/PaymentStatus");
const HttpError = require("../models/HttpError");
const Payment = require("../models/Payment");
const Ticket = require("../models/Ticket");
const seatService = require("./seatService");

const paymentService = {
  async createPayment({ ticketId, amount, paymentMethod, status }) {
    return Payment.create({
      ticketId,
      amount,
      paymentMethod: paymentMethod || CASH,
      status: status || PENDING,
    });
  },

  async payTicket(ticketId, amount, paymentMethod) {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) throw new HttpError(NOT_FOUND, "Ticket not found");
    await seatService.makeSeatBooked(ticket.dataValues.seatId);

    return this.createPayment({
      ticketId,
      amount,
      paymentMethod,
      status: COMPLETED,
    });
  },
};
module.exports = paymentService;
