const CinemaHall = require("../models/CinemaHall");
const CinemaHallDto = require("../models/dto/CinemaHallDto");
const CinemaHallInfoDto = require("../models/dto/CinemaHallInfoDto");
const { NOT_FOUND } = require("../models/enum/HttpCode");
const HttpError = require("../models/HttpError");
const Showtime = require("../models/Showtime");
const seatService = require("./seatService");

const hallService = {
  async getHallOfShowtime(showtimeId) {
    const showtime = await Showtime.findByPk(showtimeId, {
      include: [CinemaHall],
    });

    if (!showtime) throw new HttpError(NOT_FOUND, "Showtime not found");
    return showtime.CinemaHall
      ? new CinemaHallDto(showtime.CinemaHall.toJSON())
      : null;
  },

  async getInfoOfHallWithShowtime(showtimeId) {
    const hall = await this.getHallOfShowtime(showtimeId);
    const seats = await seatService.generateSeatsForHall(hall);
    return new CinemaHallInfoDto({ ...hall, seats });
  },

  async getAllHall() {
    const halls = await CinemaHall.findAll();
    return halls;
  },
};

module.exports = hallService;
