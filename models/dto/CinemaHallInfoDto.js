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
    super(info);
    this.seats = seats.map((seat) => new SeatsInfoDto(seat));
  }
}

module.exports = CinemaHallInfoDto;
