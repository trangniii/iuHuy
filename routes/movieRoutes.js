const movieService = require("../services/movieService");
const movieRouter = require("express").Router();

movieRouter.get("/:id", async (req, res, next) => {
  const movieId = req.params.id;
  try {
    const movieDetail = await movieService.getDetailOfMovie(movieId);

    console.log(JSON.stringify(movieDetail, null, 2));

    const locals = {
      css: "movieDetail.css",
      ...movieDetail.getDataForView(),
    };
    res.render("pages/movie-detail", locals);
  } catch (error) {
    next(error);
  }
});

module.exports = movieRouter;
