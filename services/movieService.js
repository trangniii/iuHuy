const { Op } = require("sequelize");
const MovieInfoDto = require("../models/dto/MovieInfoDto");
const Movie = require("../models/Movie");
const { getOffsetLimit, getWeekStartEndDates } = require("../utils/utils");

const Showtime = require("../models/Showtime");
const MovieDetailDto = require("../models/dto/MovieDetailDto");
const HttpError = require("../models/HttpError");
const { NOT_FOUND } = require("../models/enum/HttpCode");


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

        MovieInfoDto.fromMovie(movie.toJSON(), rootPath)

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

        MovieInfoDto.fromMovie(movie.toJSON(), rootPath)

      ),
      total: movies.count,
      totalPages: Math.ceil(movies.count / pageSize),
    };
  },


  async getDetailOfMovie(movieId) {
    const movie = await Movie.findOne({
      where: {
        id: movieId,
      },
      include: [
        {
          model: Showtime,
          attributes: ["id", "startTime"],
        },
      ],
    });
    if (!movie) throw new HttpError(NOT_FOUND, "Movie not found");

    return new MovieDetailDto(movie.toJSON());
  },
};

module.exports = movieService;
