const express = require("express");
const homeRouter = require("./homeRoutes");
const authRouter = require("./authRoutes");
const movieRouter = require("./movieRoutes");
const bookingRouter = require("./bookingRoutes");
const paymentRouter = require("./paymentRoutes");
const adminRouter = require("./adminRoutes");
const router = express.Router();

// Home Routes
router.use(homeRouter);
router.use(authRouter);
router.use(paymentRouter);
router.use("/movies", movieRouter);
router.use("/booking", bookingRouter);
router.use(adminRouter);

module.exports = router;
