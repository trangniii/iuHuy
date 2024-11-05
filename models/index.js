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
  User.hasMany(Ticket, { foreignKey: "userId", onDelete: "CASCADE" });
  User.hasMany(Payment, { foreignKey: "userId" });
  CinemaHall.hasMany(Seat, { foreignKey: "cinemaHallId", onDelete: "CASCADE" });
  CinemaHall.hasMany(Showtime, { foreignKey: "cinemaHallId" });
  Movie.hasMany(Showtime, { foreignKey: "movieId" });
  Movie.hasMany(Revenue, { foreignKey: "movieId" });
  Payment.hasMany(Ticket, { foreignKey: "paymentId" });
  Payment.belongsTo(User, { foreignKey: "userId" });
  Revenue.belongsTo(Movie, { foreignKey: "movieId" });
  Seat.belongsTo(CinemaHall, { foreignKey: "cinemaHallId" });
  Seat.hasMany(Ticket, { foreignKey: "seatId" });
  Seat.belongsTo(Showtime, { foreignKey: "showtimeId" });
  Showtime.belongsTo(Movie, { foreignKey: "movieId" });
  Showtime.belongsTo(CinemaHall, {
    foreignKey: "cinemaHallId",
    onDelete: "CASCADE",
  });
  Showtime.hasMany(Seat, {
    foreignKey: "showtimeId",
  });
  Showtime.hasMany(Ticket, { foreignKey: "showtimeId" });
  Ticket.belongsTo(User, { foreignKey: "userId" });
  Ticket.belongsTo(Showtime, {
    foreignKey: "showtimeId",
    onDelete: "CASCADE",
    hooks: true,
  });
  Ticket.belongsTo(Seat, {
    foreignKey: "seatId",
    onDelete: "CASCADE",
    hooks: true,
  });
  Ticket.belongsTo(Payment, {
    foreignKey: "paymentId",
    onDelete: "CASCADE",
    hooks: true,
  });
}

module.exports = {
  setupAssociations,
};
