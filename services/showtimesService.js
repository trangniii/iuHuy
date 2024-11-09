const Showtime = require("../models/Showtime");
const Movie = require("../models/Movie");
const CinemaHall = require("../models/CinemaHall");
const hallService = require("./hallService");

const showtimeService = {
  // Lấy danh sách tất cả suất chiếu, sắp xếp theo thời gian bắt đầu
  async getShowtimesById(movieId) {
    const showtimes = await Showtime.findAll({
      where: {movieId},
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

    const movieTitle = showtimes.length > 0 ? showtimes[0].Movie.title : null;

    const halls = await hallService.getAllHall();
    const newHalls = halls.map(hall => hall.name);
    return {showtimes, halls: newHalls};
  },

  // Thêm một suất chiếu mới
  async addShowtime(data) {
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
    return Showtime.update(data, {
      where: {
        id: id,
      },
    });
  },
};

module.exports = showtimeService;
