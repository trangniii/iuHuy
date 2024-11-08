const { ADMIN } = require("../models/enum/UserRole");

function mustAdmin(req, res, next) {
  if (!req.user || req.user.role !== ADMIN) return res.redirect("/");
  next();
}

module.exports = mustAdmin;
