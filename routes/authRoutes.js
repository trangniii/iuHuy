const authRouter = require("express").Router();

authRouter.get("/login", (_, res) => {
  res.render("auth/login", { title: "Login", css: "loginPage.css" });
});

authRouter.get("/register", (_, res) => {
  res.render("auth/register", { title: "Register", css: "registerPage.css" });
});

module.exports = authRouter;
