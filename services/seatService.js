const { Op } = require("sequelize");
const CinemaHall = require("../models/CinemaHall");
const { NOT_FOUND, BAD_REQUEST } = require("../models/enum/HttpCode");
const { BOOKED, AVAILABLE } = require("../models/enum/SeatStatus");
const HttpError = require("../models/HttpError");
const Seat = require("../models/Seat");
const { getAlphabetChar } = require("../utils/text");
const priceService = require("./priceService");

const seatService = {
  async generateSeatsForHall({ seatRows, seatColumns }, showtimeId) {
    const seatsBooked = await this.getSeatsBooked(showtimeId);
    const prices = await priceService.getPrices();
    const seats = [];

    for (let i = 0; i < seatRows; i++) {
      const row = [];
      for (let j = 0; j < seatColumns; j++) {
        const seat = {
          row: i + 1,
          number: j + 1,
          name: getAlphabetChar(i + 1) + (j + 1),
          price: priceService.calculatePriceOfSeat(prices, i + 1),
          status: seatsBooked.some(
            (seat) => seat.row === i + 1 && seat.number === j + 1
          )
            ? BOOKED
            : AVAILABLE,
        };

        row.push(seat);
      }
      seats.push(row);
    }

    return seats;
  },

  async getSeatsBooked(showtimeId) {
    const seats = await Seat.findAll({
      where: {
        showtimeId,
        status: BOOKED,
      },
    });

    return seats.map((seat) => seat.toJSON());
  },

  async isSeatValid(hallId, row, number) {
    const hall = await CinemaHall.findByPk(hallId);
    if (!hall) throw new HttpError(NOT_FOUND, "Cinema hall not found");

    if (!this.validSeat(hall.toJSON(), row, number))
      throw new HttpError(BAD_REQUEST, "Seat is invalid of hall");

    const seat = await Seat.findOne({
      where: {
        cinemaHallId: hallId,
        row,
        number,
      },
    });

    if (seat) return true;

    return seat.toJSON().status !== BOOKED;
  },

  async getSeatsOfHall(hallId) {
    const seats = await Seat.findAll({
      where: {
        cinemaHallId: hallId,
      },
    });

    return seats.map((seat) => seat.toJSON());
  },

  async getValidSeat(hallId, row, number) {
    const hall = await CinemaHall.findByPk(hallId);
    if (!hall) throw new HttpError(NOT_FOUND, "Cinema hall not found");

    if (!this.validSeat(hall.toJSON(), row, number))
      throw new HttpError(BAD_REQUEST, "Seat is invalid of hall");

    let seat = await Seat.findOne({
      where: {
        cinemaHallId: hallId,
        row,
        number,
      },
    });

    if (!seat) seat = await Seat.create({ cinemaHallId: hallId, row, number });

    if (seat.dataValues.status === BOOKED)
      throw new HttpError(BAD_REQUEST, "Seat is already booked");
    return seat;
  },
  validSeat(hall, row, number) {
    return (
      row >= 1 &&
      row <= hall.seatRows &&
      number >= 1 &&
      number <= hall.seatColumns
    );
  },

  async makeSeatBooked(seatId) {
    const seat = await Seat.findByPk(seatId);

    if (!seat) throw new HttpError(NOT_FOUND, "Seat not found");

    seat.status = BOOKED;

    return seat.save();
  },
};

module.exports = seatService;
