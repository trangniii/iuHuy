const CinemaHall = require("../models/CinemaHall");
const CinemaHallDto = require("../models/dto/CinemaHallDto");
const CinemaHallInfoDto = require("../models/dto/CinemaHallInfoDto");
const { NOT_FOUND } = require("../models/enum/HttpCode");
const HttpError = require("../models/HttpError");
const Movie = require("../models/Movie");
const Showtime = require("../models/Showtime");
const seatService = require("./seatService");

const hallService = {
  async getHallOfShowtime(showtimeId) {
    const showtime = await Showtime.findByPk(showtimeId, {
      include: [CinemaHall, Movie],
    });

    if (!showtime || !showtime?.CinemaHall)
      throw new HttpError(NOT_FOUND, "Showtime not found");
    const showtimeObj = showtime.toJSON();
    return new CinemaHallDto({
      ...showtimeObj.CinemaHall,
      Movie: showtimeObj.Movie,
      startTime: showtimeObj.startTime,
    });
  },

  async getInfoOfHallWithShowtime(showtimeId) {
    const hall = await this.getHallOfShowtime(showtimeId);
    const seats = await seatService.generateSeatsForHall(hall);
    return new CinemaHallInfoDto({ ...hall, seats });
  },
};

module.exports = hallService;
