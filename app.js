const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const router = require("./routes");
const session = require("express-session");
const { SESSION_SECRET } = require("./constants/env");
const expressEjsLayouts = require("express-ejs-layouts");
const globalLocals = require("./middlewares/globalLocals");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layouts/main");
app.use(logger("dev"));
app.use(express.json());
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(globalLocals);
app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  const code = Number(err?.code) || Number(err?.status) || 500;
  res.locals.error =
    req.app.get("env") === "development"
      ? err
      : {
          code,
          message: code === 404 ? "Not Found" : "Internal Server Error",
        };

  // render the error page
  res.status(code);
  res.render("error", {
    layout: "layouts/non-header",
  });
});

module.exports = app;
