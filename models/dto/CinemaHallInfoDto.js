const { parseDateTime } = require("../../utils/utils");
const CinemaHallDto = require("./CinemaHallDto");

class SeatsInfoDto {
  row;
  number;
  name;
  status;
  constructor(seat = {}) {
    Object.assign(this, seat);
  }
}

class CinemaHallInfoDto extends CinemaHallDto {
  seats = [];
  constructor({ seats, ...info } = {}) {
    super({});
    this.seats = seats.map((row) => row.map((seat) => new SeatsInfoDto(seat)));
    this.movieName = info.movieName;
    this.startTime = info.startTime;
    this.seatColumns = info.seatColumns;
    this.seatRows = info.seatRows;
    this.id = info.id;
  }
}

module.exports = CinemaHallInfoDto;
