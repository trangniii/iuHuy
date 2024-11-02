const { CASH } = require("../models/enum/PaymentMethod");
const { COMPLETED } = require("../models/enum/PaymentStatus");
const { BOOKED } = require("../models/enum/SeatStatus");
const Payment = require("../models/Payment");
const Seat = require("../models/Seat");
const priceService = require("./priceService");
const { isSeatValid } = require("./seatService");
const showtimeService = require("./showtimeService");
const ticketService = require("./ticketService");

const paymentService = {
  async bookTicket(showtimeId, userId, seats = []) {
    const showtime = await showtimeService.getShowtimeById(showtimeId);
    const payments = await Promise.all(
      seats.map(async (seat) => {
        const seatValid = await isSeatValid(
          showtime.cinemaHallId,
          seat.row,
          seat.number
        );
        if (seatValid) {
          const seatCreated = await Seat.create({
            cinemaHallId: showtime.cinemaHallId,
            row: seat.row,
            number: seat.number,
            status: BOOKED,
            price: 0,
          });
          const price = await priceService.calculatePriceOfRow(seat.row);
          const ticket = await ticketService.createTicket({
            userId,
            showtimeId,
            seatId: seatCreated.id,
            price,
          });
          const payment = await Payment.create({
            ticketId: ticket.id,
            amount: price,
            paymentMethod: CASH,
            status: COMPLETED,
          });

          return payment;
        }
      })
    );

    return payments.filter(Boolean).map((payment) => {
      const data = payment.dataValues;
      return {
        id: data.id,
        ticketId: data.ticketId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        status: data.status,
      };
    });
  },
};
module.exports = paymentService;
