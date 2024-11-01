const { getAlphabetChar } = require("../../utils/text");

class CinemaHallDto {
  id;
  name;
  seatRows;
  seatColumns;
  constructor(cinema = {}) {
    Object.assign(this, cinema);
  }
}

module.exports = CinemaHallDto;
