const { formatDateMonth } = require("../../utils/utils");

class MovieInfoDto {
  id;
  title;
  releaseDate;
  posterUrl;
  genre;
  url;
  startTime;
  constructor(movie = {}) {
    const { id, title, releaseDate, posterUrl, genre, url, Showtimes } = movie;
    console.log("MovieInfoDto -> constructor -> movie", movie);
    Object.assign(this, {
      id,
      title,
      releaseDate,
      posterUrl,
      genre,
      url,
      startTime: formatDateMonth(Showtimes?.[0]?.startTime),
    });
  }

  static fromMovie(movie, rootPath = "/movies") {
    const movieInfoDto = new MovieInfoDto(movie);
    movieInfoDto.url = `${rootPath}/${movie.id}`;
    return movieInfoDto;
  }
}

module.exports = MovieInfoDto;
