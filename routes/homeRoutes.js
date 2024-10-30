const movieService = require("../services/movieService");
const { formatDateMonth } = require("../utils/utils");

const homeRouter = require("express").Router();

homeRouter.get("/", async (req, res) => {
  const [nowMovies, upComingMovies] = await Promise.all([
    movieService.getNowShowingMovies(),
    movieService.getUpcomingMovies(),
  ]);
  nowMovies.movies.forEach((element) => {
    element.releaseDate = formatDateMonth(element.releaseDate);
  });
  upComingMovies.movies.forEach((element) => {
    element.releaseDate = formatDateMonth(element.releaseDate);
  });
  res.render("pages/home", {
    title: "Home Page",
    nowMovies: nowMovies.movies,
    upComingMovies: upComingMovies.movies,
    css: "homePage.css",
  });
});

module.exports = homeRouter;
