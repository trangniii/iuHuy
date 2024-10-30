const authRouter = require("express").Router();
const { validationResult } = require("express-validator");
const redirectIfAuthenticated = require("../middlewares/redirectIfAuthenticated");
const { loginRules, registerRules } = require("../validators/authRules");
const auth = require("../services/authService");

const globalLocals = {};

authRouter.get("/login", redirectIfAuthenticated, (_, res) => {
  res.render("auth/login", {
    title: "Login",
    css: "loginPage.css",
    ...globalLocals,
  });
});

authRouter.post(
  "/login",
  redirectIfAuthenticated,
  loginRules(),
  async (req, res) => {
    const result = validationResult(req);
    const locals = {
      title: "Login",
      css: "loginPage.css",
      ...globalLocals,
    };

    if (!result.isEmpty()) {
      locals.error = "Email hoặc mật khẩu không đúng định dạng";
      return res.render("auth/login", locals);
    }

    try {
      const user = await auth.login(req.body.email, req.body.password);
      auth.setUserToSession(req.session, user);
      res.redirect("/");
    } catch (error) {
      locals.error = "Email hoặc mật khẩu không chính xác";
      return res.render("auth/login", locals);
    }
  }
);

authRouter.get("/register", (_, res) => {
  res.render("auth/register", {
    title: "Register",
    css: "registerPage.css",
    ...globalLocals,
  });
});

authRouter.post(
  "/register",
  redirectIfAuthenticated,
  registerRules(),
  async (req, res) => {
    const result = validationResult(req);
    const locals = {
      title: "Register",
      css: "registerPage.css",
      ...globalLocals,
    };

    if (!result.isEmpty()) {
      locals.error = "Tên đăng nhập, email hoặc mật khẩu không đúng định dạng";
      return res.render("auth/register", locals);
    }

    try {
      await auth.register(req.body.username, req.body.email, req.body.password);
      res.redirect("/login");
    } catch (error) {
      locals.error = "Người dùng đã tồn tại";
      return res.render("auth/register", locals);
    }
  }
);

module.exports = authRouter;
