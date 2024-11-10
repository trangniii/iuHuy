const adminRouter = require("express").Router();
const movieManagerRoutes = require("./movieManagerRoutes");

const mustAdmin = require("../middlewares/mustAdmin");
const mustLogin = require("../middlewares/mustLogin");
const hallRoutes = require("./hallRoutes");
const priceRouter = require("./priceRoutes");
const showtimesRouter = require("./showtimesRoutes");

adminRouter.use(mustLogin, mustAdmin);

adminRouter.use(hallRoutes);
adminRouter.use(priceRouter);
adminRouter.use(showtimesRouter);

adminRouter.use(movieManagerRoutes);

adminRouter.get("/dashboard", (req, res) => {
  const locals = {
    title: "Dashboard",
  };
  res.render("admin/dashboard", locals);
});

module.exports = adminRouter;
