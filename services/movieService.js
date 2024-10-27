const { Op } = require("sequelize");
const MovieInfoDto = require("../models/dto/MovieInfoDto");
const Movie = require("../models/Movie");
const { getOffsetLimit, getWeekStartEndDates } = require("../utils/utils");

const movieService = {
  async getNowShowingMovies({ page, pageSize } = {}, rootPath = "/movies") {
    page = page || 1;
    pageSize = pageSize || 10;
    const { offset, limit } = getOffsetLimit(page, pageSize);
    const { endDate, startDate } = getWeekStartEndDates();
    const movies = await Movie.findAndCountAll({
      where: {
        releaseDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      offset,
      limit,
    });

    return {
      movies: movies.rows.map((movie) =>
        MovieInfoDto.fromMovie(movie, rootPath)
      ),
      total: movies.count,
      totalPages: Math.ceil(movies.count / pageSize),
    };
  },

  async getUpcomingMovies({ page, pageSize } = {}, rootPath = "/movies") {
    page = page || 1;
    pageSize = pageSize || 10;
    const { offset, limit } = getOffsetLimit(page, pageSize);
    const { endDate } = getWeekStartEndDates();
    const movies = await Movie.findAndCountAll({
      where: {
        releaseDate: {
          [Op.gt]: endDate,
        },
      },
      offset,
      limit,
    });

    return {
      movies: movies.rows.map((movie) =>
        MovieInfoDto.fromMovie(movie, rootPath)
      ),
      total: movies.count,
      totalPages: Math.ceil(movies.count / pageSize),
    };
  },
};

module.exports = movieService;
