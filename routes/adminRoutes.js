const adminRouter = require("express").Router();
const mustAdmin = require("../middlewares/mustAdmin");
const mustLogin = require("../middlewares/mustLogin");
const hallRoutes = require("./hallRoutes");
const priceRouter = require("./priceRoutes");

adminRouter.use(mustLogin, mustAdmin);

adminRouter.use(hallRoutes);
adminRouter.use(priceRouter);

adminRouter.get("/", (req, res) => {
  const locals = {
    title: "Dashboard",
  };
  res.render("admin/dashboard", locals);
});

module.exports = adminRouter;
