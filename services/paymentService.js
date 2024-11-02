const { Op, CHAR } = require("sequelize");
const { NOT_FOUND, BAD_REQUEST } = require("../models/enum/HttpCode");
const { CASH } = require("../models/enum/PaymentMethod");
const { PENDING, COMPLETED } = require("../models/enum/PaymentStatus");
const HttpError = require("../models/HttpError");
const Payment = require("../models/Payment");
const Ticket = require("../models/Ticket");
const seatService = require("./seatService");
const PaymentMethod = require("../models/enum/PaymentMethod");
const Seat = require("../models/Seat");
const { BOOKED } = require("../models/enum/SeatStatus");
const Showtime = require("../models/Showtime");
const Movie = require("../models/Movie");
const CinemaHall = require("../models/CinemaHall");

const paymentService = {
  async createPayment({ amount, paymentMethod, status, userId }) {
    return Payment.create({
      amount,
      paymentMethod: paymentMethod || CASH,
      status: status || PENDING,
      userId,
    });
  },

  async pay(userId, paymentId, paymentMethod) {
    const payment = await Payment.findOne({
      where: {
        id: paymentId,
        userId,
        status: PENDING,
      },
      include: [
        {
          model: Ticket,
          include: [Seat],
        },
      ],
    });

    if (!payment) throw new HttpError(NOT_FOUND, "Payment not found");

    const seats = payment?.Tickets.map((ticket) => ticket.Seat) || [];

    if (seats.some((seat) => seat.dataValues.status === BOOKED)) {
      await Ticket.destroy({ where: { paymentId } });
      await Payment.destroy({ where: { id: paymentId } });
      throw new HttpError(BAD_REQUEST, "Seat is already booked");
    }

    paymentMethod = PaymentMethod[paymentMethod] ?? CASH;

    payment.paymentMethod = paymentMethod;
    payment.status = COMPLETED;

    await Promise.all(seats.map((seat) => seat.update({ status: BOOKED })));

    const returnValue = await payment.save();
    return returnValue;
  },

  async getPaymentInfo(userId, paymentId) {
    const payment = await Payment.findOne({
      where: {
        id: paymentId,
        userId,
      },
      include: [
        {
          model: Ticket,
          include: [
            Seat,
            {
              model: Showtime,
              include: [Movie, CinemaHall],
            },
          ],
        },
      ],
    });

    return payment;
  },
};
module.exports = paymentService;
