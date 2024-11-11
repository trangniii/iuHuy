const Showtime = require("../models/Showtime");
const Movie = require("../models/Movie");
const CinemaHall = require("../models/CinemaHall");
const hallService = require("./hallService");
const Ticket = require("../models/Ticket");
const { areDateRangesNonOverlapping } = require("../utils/utils");
const { NOT_FOUND, BAD_REQUEST } = require("../models/enum/HttpCode");
const HttpError = require("../models/HttpError");
const showtimeService = {
  // Lấy danh sách tất cả suất chiếu, sắp xếp theo thời gian bắt đầu
  async getShowtimesById(movieId) {
    const showtimes = await Showtime.findAll({
      where: {movieId: movieId},
      include: [
        {
          model: Movie,
          attributes: ["title"], 
        },
        {
          model: CinemaHall,
          attributes: ["name"], 
        },
      ],
      order: [["startTime", "ASC"]],
    });

    return showtimes;
  },

  async getShowtimesOfHallId(hallId) {
    const showtimes = await Showtime.findAll({
      where: {cinemaHallId: hallId}
    });
    return showtimes;
  },

  // Thêm một suất chiếu mới
  async addShowtime(data) {
    const showtimes = await this.getShowtimesOfHallId(data.cinemaHallId);

    showtimes.forEach(showtime => {
      if (!areDateRangesNonOverlapping(showtime.startTime, showtime.endTime, data.startTime, data.endTime)) {
        throw new HttpError(BAD_REQUEST, "Trung lich chieu phim");
      }
    });

    return Showtime.create({
      movieId: data.movieId,
      cinemaHallId: data.cinemaHallId,
      startTime: data.startTime,
      endTime: data.endTime,
    });
  },

  // Xóa một suất chiếu theo ID
  async deleteShowtime(id) {
    return Showtime.destroy({
      where: {
        id: id,
      },
    });
  },

  // Cập nhật thông tin suất chiếu
  async updateShowtime(id, data) {
    const showtimes = await this.getShowtimesOfHallId(data.cinemaHallId);

    showtimes.forEach(showtime => {
      if (!areDateRangesNonOverlapping(showtime.startTime, showtime.endTime, data.startTime, data.endTime)) {
        throw new HttpError(BAD_REQUEST, "Trung lich chieu phim");
      }
    });

    return Showtime.update(data, {
      where: {
        id: id,
      },
    });
  },
};

module.exports = showtimeService;
