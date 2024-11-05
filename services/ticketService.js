const CinemaHall = require("../models/CinemaHall");
const { NOT_FOUND, BAD_REQUEST } = require("../models/enum/HttpCode");
const { PENDING } = require("../models/enum/PaymentStatus");
const { BOOKED, AVAILABLE } = require("../models/enum/SeatStatus");
const HttpError = require("../models/HttpError");
const Seat = require("../models/Seat");
const Showtime = require("../models/Showtime");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const paymentService = require("./paymentService");
const priceService = require("./priceService");
const seatService = require("./seatService");
const showtimeService = require("./showtimeService");

const ticketService = {
  async createTicket({ userId, showtimeId, seatId, price, paymentId }) {
    return Ticket.create({
      userId,
      showtimeId,
      seatId,
      price,
      paymentId,
    });
  },

  async removeTicketWithSeatId(seatId) {
    const row = await Ticket.destroy({
      where: {
        seatId,
      },
    });

    return row > 0;
  },

  async bookTicket(userId, showtimeId, seats = []) {
    const [user, showtime] = await Promise.all([
      User.findByPk(userId),
      Showtime.findByPk(showtimeId, {
        include: [CinemaHall, Seat],
      }),
    ]);

    if (!user || !showtime)
      throw new HttpError(NOT_FOUND, "User or showtime not found");
    const cinemaHallValue = showtime.CinemaHall.toJSON();
    const seatsValues = showtime.dataValues.Seats.map((s) => s.toJSON());

    if (!this.validSeats(seats, seatsValues, cinemaHallValue))
      throw new HttpError(
        BAD_REQUEST,
        "Seat is invalid of hall or already booked"
      );
    const prices = await priceService.getPrices();

    const seatsCreated = await Promise.all(
      seats.map(async (seatToCreate) => {
        const seatCreated = showtime.Seats.find(
          (s) => s.row === seatToCreate.row && s.number === seatToCreate.number
        );
        if (seatCreated) return seatCreated;

        return Seat.create({
          row: seatToCreate.row,
          number: seatToCreate.number,
          cinemaHallId: cinemaHallValue.id,
          status: AVAILABLE,
          showtimeId,
        });
      })
    );

    const existTickets = await Promise.all(
      seatsCreated.map(async (seat) => {
        return Ticket.findOne({
          where: {
            userId,
            showtimeId,
            seatId: seat.id,
          },
        });
      })
    );

    if (existTickets.some((t) => t))
      throw new HttpError(BAD_REQUEST, "You have already booked this seat");

    const ticketsCreated = await Promise.all(
      seatsCreated.map(async (seat) => {
        const price = priceService.calculatePriceOfSeat(prices, seat.row);
        return this.createTicket({
          userId,
          showtimeId,
          seatId: seat.id,
          price,
          paymentId: null,
        });
      })
    );

    const payment = await paymentService.createPayment({
      amount: ticketsCreated.reduce(
        (acc, ticket) => acc + Number(ticket.price),
        0
      ),
      status: PENDING,
      userId,
    });

    await Promise.all(
      ticketsCreated.map(async (ticket) => {
        ticket.paymentId = payment.id;
        return ticket.save();
      })
    );

    return {
      payment: payment.toJSON(),
      tickets: ticketsCreated.map((t) => t.toJSON()),
    };
  },

  validSeats(seats = [], seatsSaved = [], hall) {
    let isValid = true;

    seats.forEach((seat) => {
      if (!seatService.validSeat(hall, seat.row, seat.number)) {
        return (isValid = false);
      }

      const seatSaved = seatsSaved.find(
        (s) => s.row === seat.row && s.number === seat.number
      );

      if (seatSaved && seatSaved.status === BOOKED) {
        return (isValid = false);
      }
    });

    return isValid;
  },

  async removeTicket(userId, ticketId) {
    const ticket = await Ticket.findOne({
      where: {
        id: ticketId,
        userId,
      },
    });

    if (!ticket) return false;

    return ticket.destroy().then((row) => row >= 0);
  },
};

module.exports = ticketService;
