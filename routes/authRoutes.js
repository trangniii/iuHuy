const authRouter = require("express").Router();

authRouter.get("/login", (_, res) => {
  res.render("login", { title: "Login" });
});

authRouter.get("/register", (_, res) => {
  res.render("register", { title: "Register" });
});

module.exports = authRouter;
