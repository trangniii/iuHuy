const express = require("express");
const homeRouter = require("./homeRoutes");
const authRouter = require("./authRoutes");
const movieRouter = require("./movieRoutes");
const bookingRouter = require("./bookingRoutes");
const showtimesRouter = require("./showtimesRoutes");
const router = express.Router();

// Home Routes
router.use(homeRouter);
router.use(authRouter);
router.use("/movies", movieRouter);
router.use("/booking", bookingRouter);
router.use("/showtimes", showtimesRouter);

module.exports = router;
