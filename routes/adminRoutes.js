const adminRouter = require("express").Router();
const mustAdmin = require("../middlewares/mustAdmin");
const mustLogin = require("../middlewares/mustLogin");
const hallRoutes = require("./hallRoutes");

adminRouter.use(mustLogin, mustAdmin);

adminRouter.use(hallRoutes);

adminRouter.get("/", (req, res) => {
  const locals = {
    title: "Dashboard",
  };
  res.render("admin/dashboard", locals);
});

module.exports = adminRouter;
