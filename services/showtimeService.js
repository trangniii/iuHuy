const { NOT_FOUND } = require("../models/enum/HttpCode");
const HttpError = require("../models/HttpError");
const Showtime = require("../models/Showtime");

const showtimeService = {
  async getShowtimeById(showtimeId) {
    const showtime = await Showtime.findByPk(showtimeId);

    if (!showtime) throw new HttpError(NOT_FOUND, "Show time not found");

    return {
      id: showtime.id,
      movieId: showtime.movieId,
      cinemaHallId: showtime.cinemaHallId,
      startTime: showtime.startTime,
    };
  },
};

module.expors = showtimeService;
