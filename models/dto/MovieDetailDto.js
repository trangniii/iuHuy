const { limitText } = require("../../utils/text");
const {
  parseDateTime,
  formatDateMonth,
  formatDuration,
} = require("../../utils/utils");

class ShowTimeItemDto {
  day;
  month;
  year;
  hour;
  minute;
  id;
  constructor(showTime) {
    const { day, hour, minute, month, year } = parseDateTime(
      showTime.startTime
    );
    this.id = showTime.id;
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
      const dto = new ShowTimeItemDto(showTime);
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
        (time) => time.id === dto.id
      );

      if (notExistsTime) {
        dateToShow.times.push({
          hour: dto.hour,
          minute: dto.minute,
          id: dto.id,
        });
      }
    });
  }

  getDataForView() {
    return {
      ...this,
      dates: this.dates.map((date) => {
        return {
          ...date,
          dateString: formatDateMonth(`${date.year}-${date.month}-${date.day}`),
          times: date.times.map((time) => {
            return {
              ...time,
              timeString: `${time.hour}:${time.minute
                .toString()
                .padStart(2, "0")}`,
            };
          }),
        };
      }),
      releaseDate: formatDateMonth(
        `${this.releaseDate.year}-${this.releaseDate.month}-${this.releaseDate.day}`
      ),
      duration: formatDuration(this.duration),
      description: limitText(this.description, 500),
    };
  }
}

module.exports = MovieDetailDto;
exports.ShowTimeItemDto = ShowTimeItemDto;
exports.DateToShowTimeDto = DateToShowTimeDto;
