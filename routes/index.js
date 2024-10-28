const express = require("express");
const homeRouter = require("./homeRoutes");
const authRouter = require("./authRoutes");
const detailRouter = require("./detailRoutes");
const router = express.Router();

// Home Routes
router.use(homeRouter);
router.use(authRouter);
router.use(detailRouter);

module.exports = router;
