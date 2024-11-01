const Ticket = require("../models/Ticket");

const ticketService = {
  async createTicket({ userId, showtimeId, seatId, price }) {
    return Ticket.create({
      userId,
      showtimeId,
      seatId,
      price,
    });
  },
};

module.exports = ticketService;
