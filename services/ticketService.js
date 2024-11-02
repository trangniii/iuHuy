const { NOT_FOUND } = require("../models/enum/HttpCode");
const HttpError = require("../models/HttpError");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const priceService = require("./priceService");
const seatService = require("./seatService");
const showtimeService = require("./showtimeService");

const ticketService = {
  async createTicket({ userId, showtimeId, seatId, price }) {
    return Ticket.create({
      userId,
      showtimeId,
      seatId,
      price,
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
    const [user, showtime, prices = []] = await Promise.all([
      User.findByPk(userId),
      showtimeService.getShowtimeById(showtimeId),
      priceService.getPrices(),
    ]);
    if (!user || !showtime)
      throw new HttpError(NOT_FOUND, "User or showtime not found");
    const ticketsBooked = await Promise.all(
      seats.map(async (seatRaw) => {
        const seat = await seatService.getValidSeat(
          showtime.cinemaHallId,
          seatRaw.row,
          seatRaw.number
        );

        const ticket = await this.createTicket({
          price: priceService.calculatePriceOfSeat(prices, seat.row),
          seatId: seat.dataValues.id,
          showtimeId,
          userId,
        });

        return ticket;
      })
    );

    return ticketsBooked;
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
