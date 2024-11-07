const adminRouter = require("express").Router();
const hallRoutes = require("./hallRoutes");

adminRouter.use(hallRoutes);

adminRouter.get("/", (req, res) => {
  const locals = {
    title: "Dashboard",
  };
  res.render("admin/dashboard", locals);
});

module.exports = adminRouter;
