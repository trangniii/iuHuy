const { parseDateTime } = require("../../utils/utils");

class ShowTimeItemDto {
  day;
  month;
  year;
  hour;
  minute;
  constructor(startTime) {
    const { day, hour, minute, month, year } = parseDateTime(startTime);
    this.day = day;
    this.month = month;
    this.year = year;
    this.hour = hour;
    this.minute = minute;
  }
}

class MovieDetailDto {
  id;
  title;
  description;
  duration;
  genre;
  releaseDate;
  posterUrl;
  showTimes = [];
  constructor(data = {}) {
    const { Showtimes, releaseDate, ...movie } = data;
    Object.assign(this, movie);
    this.releaseDate = parseDateTime(releaseDate);
    this.showTimes = Showtimes.filter(Boolean).map(
      (showTime) => new ShowTimeItemDto(showTime.startTime)
    );
  }
}

module.exports = MovieDetailDto;
exports.ShowTimeItemDto = ShowTimeItemDto;
