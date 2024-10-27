const auth = require("../services/AuthService");

function globalLocals(req, res, next) {
  const user = auth.getUserFromSession(req.session);
  req.user = user;
  res.locals.user = user;
  res.locals.isLoggedIn = !!user;
  next();
}

module.exports = globalLocals;
