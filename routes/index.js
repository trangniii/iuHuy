const express = require("express");
const homeRouter = require("./homeRoutes");
const authRouter = require("./authRoutes");
const router = express.Router();

// Home Routes
router.use(homeRouter);
router.use(authRouter);

module.exports = router;
