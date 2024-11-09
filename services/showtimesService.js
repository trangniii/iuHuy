const Showtime = require("../models/Showtime");
const Movie = require("../models/Movie");
const CinemaHall = require("../models/CinemaHall");

const showtimeService = {
  // Lấy danh sách tất cả suất chiếu, sắp xếp theo thời gian bắt đầu
  async getShowtimes() {
    return Showtime.findAll({
      include: [
        {
          model: Movie,
          attributes: ["title"], // Chỉ lấy tên phim từ bảng movies
        },
        {
          model: CinemaHall,
          attributes: ["name"], // Chỉ lấy tên phòng chiếu từ bảng cinemaHalls
        },
      ],
      order: [["startTime", "ASC"]],
    });
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
