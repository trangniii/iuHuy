const { BOOKED, AVAILABLE } = require("../models/enum/SeatStatus");
const Seat = require("../models/Seat");
const { getAlphabetChar } = require("../utils/text");
const priceService = require("./priceService");

const seatService = {
  async generateSeatsForHall({ seatRows, seatColumns, id }) {
    const seatsBooked = await this.getSeatsBooked(id);
    const prices = await priceService.getPrices();
    const seats = [];

    for (let i = 0; i < seatRows; i++) {
      for (let j = 0; j < seatColumns; j++) {
        const seat = {
          row: i + 1,
          number: j + 1,
          name: getAlphabetChar(i) + (j + 1),
          price: priceService.calculatePriceOfSeat(prices, i + 1),
          status: seatsBooked.some(
            (seat) => seat.row === i + 1 && seat.number === j + 1
          )
            ? BOOKED
            : AVAILABLE,
        };

        seats.push(seat);
      }
    }

    return seats;
  },

  async getSeatsBooked(hallId) {
    const seats = await Seat.findAll({
      where: {
        cinemaHallId: hallId,
        status: BOOKED,
      },
    });

    return seats.map((seat) => seat.toJSON());
  },

  async isSeatValid(hallId, row, number) {
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
};

module.exports = seatService;
