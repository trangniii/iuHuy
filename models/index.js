const CinemaHall = require("./CinemaHall");
const Movie = require("./Movie");
const Payment = require("./Payment");
const PriceOfSeat = require("./PriceOfSeat");
const Revenue = require("./Revenue");
const Seat = require("./Seat");
const Showtime = require("./Showtime");
const Ticket = require("./Ticket");
const User = require("./User");

function setupAssociations() {
  User.hasMany(Ticket, { foreignKey: "userId" });
  CinemaHall.hasMany(Seat, { foreignKey: "cinemaHallId" });
  CinemaHall.hasMany(Showtime, { foreignKey: "cinemaHallId" });
  Movie.hasMany(Showtime, { foreignKey: "movieId" });
  Movie.hasMany(Revenue, { foreignKey: "movieId" });
  Payment.belongsTo(Ticket, { foreignKey: "ticketId" });
  Revenue.belongsTo(Movie, { foreignKey: "movieId" });
  Seat.belongsTo(CinemaHall, { foreignKey: "cinemaHallId" });
  Seat.hasMany(Ticket, { foreignKey: "seatId" });
  Showtime.belongsTo(Movie, { foreignKey: "movieId" });
  Showtime.belongsTo(CinemaHall, { foreignKey: "cinemaHallId" });
  Showtime.hasMany(Ticket, { foreignKey: "showtimeId" });
  Ticket.belongsTo(User, { foreignKey: "userId" });
  Ticket.belongsTo(Showtime, { foreignKey: "showtimeId" });
  Ticket.belongsTo(Seat, { foreignKey: "seatId" });
  Ticket.hasOne(Payment, { foreignKey: "ticketId" });
}

module.exports = {
  setupAssociations,
};
