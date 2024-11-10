const { getAlphabetChar } = require("../../utils/text");
const { parseDateTime } = require("../../utils/utils");

class TicketInfoDto {
  id;
  price;
  bookingTime;
  seat;
  constructor(ticket = {}) {
    const { id, price, bookingTime, Seat } = ticket;

    this.id = id;
    this.price = price;
    this.bookingTime = bookingTime;
    if (Seat) {
      this.seat = getAlphabetChar(Seat.row) + Seat.number;
    }
  }
}

class MovieInfoDto {
  id;
  title;
  startTime;
  cinemaHall;
  constructor(movie = {}) {
    const { id, title, startTime, CinemaHall } = movie;
    const { day, hour, minute, month, year } = parseDateTime(startTime);
    this.id = id;
    this.title = title;
    this.startTime = `${hour}:${minute} - ${day}/${month}/${year}`;
    this.cinemaHall = CinemaHall.name;
  }
}

class PaymentInfoDto {
  id;
  amount;
  status;
  userId;
  paymentMethod;
  createdAt;
  tickets = [];
  movie;

  constructor(payment = {}) {
    const { id, amount, paymentMethod, status, userId, createdAt, Tickets } =
      payment;

    this.id = id;
    this.amount = amount;
    this.status = status;
    this.userId = userId;
    this.paymentMethod = paymentMethod;
    this.createdAt = createdAt;

    this.tickets = Tickets.map((ticket) => new TicketInfoDto(ticket));
    const Showtime = Tickets[0]?.Showtime;

    if (Showtime) {
      this.movie = new MovieInfoDto({
        ...Showtime.Movie,
        startTime: Showtime.startTime,
        CinemaHall: Showtime.CinemaHall,
      });
    }
  }
}

module.exports = PaymentInfoDto;
