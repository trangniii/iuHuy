const detailRoute = require("express").Router();

detailRoute.get("/detail", (req, res) => {
  res.render("detail", { title: "Express" });
});

module.exports = detailRoute;
