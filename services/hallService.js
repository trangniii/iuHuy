const CinemaHall = require("../models/CinemaHall");
const CinemaHallDto = require("../models/dto/CinemaHallDto");
const CinemaHallInfoDto = require("../models/dto/CinemaHallInfoDto");
const { NOT_FOUND } = require("../models/enum/HttpCode");
const HttpError = require("../models/HttpError");
const Movie = require("../models/Movie");
const Showtime = require("../models/Showtime");
const { getOffsetLimit } = require("../utils/utils");
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
    const seats = await seatService.generateSeatsForHall(hall, showtimeId);
    return new CinemaHallInfoDto({ ...hall, seats });
  },

  async createHall({ name, seatRows, seatColumns }) {
    return CinemaHall.create({ name, seatRows, seatColumns });
  },

  async removeHall(hallId) {
    return CinemaHall.destroy({ where: { id: hallId } });
  },

  async getHalls({ page, pageSize } = {}) {
    page = page || 1;
    pageSize = pageSize || 10;
    const { limit, offset } = getOffsetLimit(page, pageSize);

    const halls = await CinemaHall.findAndCountAll({
      limit,
      offset,
    });

    return {
      halls: halls.rows.map((hall) => new CinemaHallDto(hall)),
      total: halls.count,
      totalPages: Math.ceil(halls.count / pageSize),
    };
  },
};

module.exports = hallService;
