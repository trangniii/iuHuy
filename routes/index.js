const express = require("express");
const homeRouter = require("./homeRoutes");
const authRouter = require("./authRoutes");
const movieRouter = require("./movieRoutes");
const bookingRouter = require("./bookingRoutes");
const router = express.Router();

// Home Routes
router.use(homeRouter);
router.use(authRouter);
router.use("/movies", movieRouter);
router.use("/booking", bookingRouter);

module.exports = router;
