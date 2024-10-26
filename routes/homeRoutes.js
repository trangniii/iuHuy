const homeRouter = require("express").Router();

homeRouter.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

module.exports = homeRouter;
