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

class DateToShowTimeDto {
  day;
  month;
  year;
  times = [];

  constructor(dateToShow = {}) {
    Object.assign(this, dateToShow);
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
  dates = [];
  constructor(data = {}) {
    const { Showtimes, releaseDate, ...movie } = data;
    Object.assign(this, movie);
    this.releaseDate = parseDateTime(releaseDate);
    Showtimes.filter(Boolean).forEach((showTime) => {
      const dto = new ShowTimeItemDto(showTime.startTime);
      let dateToShow = this.dates.find(
        (date) =>
          date.day === dto.day &&
          date.month === dto.month &&
          date.year === dto.year
      );

      if (!dateToShow) {
        dateToShow = new DateToShowTimeDto({
          day: dto.day,
          month: dto.month,
          year: dto.year,
        });
        this.dates.push(dateToShow);
      }

      const notExistsTime = !dateToShow.times.find(
        (time) => time.hour === dto.hour && time.minute === dto.minute
      );

      if (notExistsTime) {
        dateToShow.times.push({ hour: dto.hour, minute: dto.minute });
      }
    });
  }
}

module.exports = MovieDetailDto;
exports.ShowTimeItemDto = ShowTimeItemDto;
exports.DateToShowTimeDto = DateToShowTimeDto;
