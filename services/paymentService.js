const { Op } = require("sequelize");
const { NOT_FOUND } = require("../models/enum/HttpCode");
const { CASH } = require("../models/enum/PaymentMethod");
const { PENDING, COMPLETED } = require("../models/enum/PaymentStatus");
const HttpError = require("../models/HttpError");
const Payment = require("../models/Payment");
const Ticket = require("../models/Ticket");
const seatService = require("./seatService");

const paymentService = {
  async createPayment({ amount, paymentMethod, status }) {
    return Payment.create({
      amount,
      paymentMethod: paymentMethod || CASH,
      status: status || PENDING,
    });
  },

  async payTickets(ticketIds = [], paymentMethod) {
    if (!Array.isArray(ticketIds)) ticketIds = [ticketIds];
    const tickets = await Ticket.findAll({
      where: {
        id: {
          [Op.in]: ticketIds,
        },
      },
    });

    if (tickets.length === 0)
      throw new HttpError(NOT_FOUND, "Tickets not found");

    const amount = tickets.reduce(
      (total, ticket) => total + ticket.dataValues.price,
      0
    );

    const payment = await this.createPayment({
      amount,
      paymentMethod,
      status: COMPLETED,
    });

    await Ticket.update(
      {
        paymentId: payment.dataValues.id,
      },
      {
        where: {
          id: {
            [Op.in]: ticketIds,
          },
        },
      }
    );

    await Promise.all(
      tickets.map((ticket) =>
        seatService.makeSeatBooked(ticket.dataValues.seatId)
      )
    );

    return payment;
  },
};
module.exports = paymentService;
