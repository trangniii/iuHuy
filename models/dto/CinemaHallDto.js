const { parseDateTime } = require("../../utils/utils");

class CinemaHallDto {
  id;
  name;
  seatRows;
  seatColumns;
  startTime;
  movieName;
  constructor({ id, name, seatRows, seatColumns, ...cinema } = {}) {
    Object.assign(this, {
      id,
      name,
      seatRows,
      seatColumns,
    });
    if (cinema.startTime) {
      const { day, hour, minute, month, year } = parseDateTime(
        cinema.startTime
      );
      this.startTime = `${hour}:${minute} - ${day}/${month}/${year}`;
    }

    if (cinema.Movie) {
      this.movieName = cinema.Movie.title;
    }
  }
}

module.exports = CinemaHallDto;
