class MovieInfoDto {
  id;
  title;
  releaseDate;
  posterUrl;
  genre;
  url;
  constructor(movie = {}) {
    const { id, title, releaseDate, posterUrl, genre, url } = movie;
    Object.assign(this, {
      id,
      title,
      releaseDate,
      posterUrl,
      genre,
      url,
    });
  }

  static fromMovie(movie, rootPath = "/movies") {
    const movieInfoDto = new MovieInfoDto(movie);
    movieInfoDto.url = `${rootPath}/${movie.id}`;
    return movieInfoDto;
  }
}

module.exports = MovieInfoDto;
