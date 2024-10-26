const CinemaHall = require("./CenimaHall");
const Movie = require("./Movie");
const Payment = require("./Payment");
const Revenue = require("./Revenue");
const Seat = require("./Seat");
const Showtime = require("./ShowTime");
const Ticket = require("./Ticket");
const TicketReservation = require("./TicketReservation");
const User = require("./User");

function setupAssociations() {
  User.hasMany(Ticket, { foreignKey: "userId" });
  User.hasMany(TicketReservation, { foreignKey: "userId" });
  CinemaHall.hasMany(Seat, { foreignKey: "cinemaHallId" });
  CinemaHall.hasMany(Showtime, { foreignKey: "cinemaHallId" });
  Movie.hasMany(Showtime, { foreignKey: "movieId" });
  Movie.hasMany(Revenue, { foreignKey: "movieId" });
  Payment.belongsTo(Ticket, { foreignKey: "ticketId" });
  Revenue.belongsTo(Movie, { foreignKey: "movieId" });
  Seat.belongsTo(CinemaHall, { foreignKey: "cinemaHallId" });
  Seat.hasMany(Ticket, { foreignKey: "seatId" });
  Seat.hasMany(TicketReservation, { foreignKey: "seatId" });
  Showtime.belongsTo(Movie, { foreignKey: "movieId" });
  Showtime.belongsTo(CinemaHall, { foreignKey: "cinemaHallId" });
  Showtime.hasMany(Ticket, { foreignKey: "showtimeId" });
  Showtime.hasMany(TicketReservation, { foreignKey: "showtimeId" });
  Ticket.belongsTo(User, { foreignKey: "userId" });
  Ticket.belongsTo(Showtime, { foreignKey: "showtimeId" });
  Ticket.belongsTo(Seat, { foreignKey: "seatId" });
  Ticket.hasOne(Payment, { foreignKey: "ticketId" });
  TicketReservation.belongsTo(User, { foreignKey: "userId" });
  TicketReservation.belongsTo(Showtime, { foreignKey: "showtimeId" });
  TicketReservation.belongsTo(Seat, { foreignKey: "seatId" });
}

module.exports = {
  setupAssociations,
};
