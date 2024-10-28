const movieService = require("../services/movieService");
const { formatDateMonth } = require("../utils/utils");

const homeRouter = require("express").Router();

homeRouter.get("/", async (req, res) => {
  const nowMovies = await movieService.getNowShowingMovies();
  nowMovies.movies.forEach((element) => {
    element.releaseDate = formatDateMonth(element.releaseDate);
  });
  const upComingMovies = await movieService.getUpcomingMovies();
  upComingMovies.movies.forEach((element) => {
    element.releaseDate = formatDateMonth(element.releaseDate);
  });
  res.render("pages/home", {
    title: "Home Page",
    nowMovies: nowMovies.movies,
    upComingMovies: upComingMovies.movies,
  });
});

module.exports = homeRouter;
