const movieService = require("../services/movieService");
const { formatDateMonth } = require("../utils/utils");
const movieRouter = require("express").Router();

movieRouter.get("/:id", async (req, res, next) => {
  const movieId = req.params.id;
  const [nowMovies, upComingMovies] = await Promise.all([
    movieService.getNowShowingMovies(),
    movieService.getUpcomingMovies(),
  ]);
  nowMovies.movies.forEach((element) => {
    element.releaseDate = formatDateMonth(element.releaseDate);
  });
  try {
    const movieDetail = await movieService.getDetailOfMovie(movieId);
    const locals = {
      css: "movieDetail.css",
      ...movieDetail.getDataForView(),
      nowMovies: nowMovies.movies,
    };
    res.render("pages/createMovie", locals);
  } catch (error) {
    next(error);
  }
});

module.exports = movieRouter;
