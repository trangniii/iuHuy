const movieManagerRouter = require("express").Router();
const movieService = require("../services/movieService");
const hallRoutes = require("./hallRoutes");
const path = require("path");
const multer = require("multer");
const Movie = require("../models/Movie");
const { UPLOAD_DIR, UPLOAD_ROOT } = require("../constants/env");

movieManagerRouter.use(hallRoutes);

movieManagerRouter.get("/list-movies", async (req, res, next) => {
  const allMovies = await movieService.getMovies();

  try {
    res.render("admin/movie-management", {
      allMovies: allMovies,
    });
  } catch (error) {
    next(error);
  }
});

// add movie
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR + "/movies");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

movieManagerRouter.get("/add-movie", (req, res) => {
  res.render("admin/createMovie");
});

movieManagerRouter.post(
  "/add",
  upload.single("selectedImage"),
  async (req, res, next) => {
    try {
      const { title, description, duration, genre, releaseDate } = req.body;
      const posterUrl = req.file
        ? `/${UPLOAD_ROOT}/movies/${req.file.filename}`
        : "";

      const newMovieData = {
        title,
        description,
        duration,
        genre,
        releaseDate,
        posterUrl,
      };

      await movieService.addMovie(newMovieData);
      res.redirect("/dashboard/list-movies");
    } catch (error) {
      next(error);
    }
  }
);

//Delete
movieManagerRouter.post("/delete-movie/:id", async (req, res, next) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    if (movie.posterUrl) {
      const fs = require("fs");
      const path = require("path");
      const posterPath = path.join(
        UPLOAD_DIR,
        movie.posterUrl.replace("/uploads", "")
      ); // Đường dẫn đến poster

      if (fs.existsSync(posterPath)) {
        fs.unlinkSync(posterPath);
      }
    }

    await movie.destroy();

    res.redirect("/dashboard/list-movies");
  } catch (error) {
    next(error);
  }
});

//Change Movie
movieManagerRouter.get("/change-movie/:id", async (req, res, next) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.render("admin/changeMovie", { movie });
  } catch (error) {
    next(error);
  }
});

movieManagerRouter.post(
  "/update-movie/:id",
  upload.single("selectedImage"),
  async (req, res, next) => {
    const movieId = req.params.id;
    const { title, description, duration, genre, releaseDate } = req.body;
    const posterUrl = req.file ? `/uploads/movies/${req.file.filename}` : null;

    try {
      // Tìm phim theo ID
      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        return res.status(404).send("Movie not found");
      }

      // Cập nhật thông tin phim
      await movie.update({
        title,
        description,
        duration,
        genre,
        releaseDate,
        posterUrl: posterUrl || movie.posterUrl, // Giữ nguyên poster nếu không có hình ảnh mới
      });

      res.redirect("/dashboard/list-movies"); // Chuyển hướng về trang quản lý phim
    } catch (error) {
      next(error);
    }
  }
);

module.exports = movieManagerRouter;
