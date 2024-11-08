const adminRouter = require("express").Router();
const movieManagerRoutes = require("./movieManagerRoutes");

// Các route khác của admin (nếu có)
adminRouter.get("/test", (req, res) => {
  const locals = { title: "Dashboard" };
  res.render("admin/dashboard", locals);
});

// Gắn các route quản lý phim từ movieManagerRoutes
adminRouter.use("/", movieManagerRoutes);

module.exports = adminRouter;
