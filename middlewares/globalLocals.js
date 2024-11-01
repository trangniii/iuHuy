const PaymentStatus = require("../models/enum/PaymentStatus");
const SeatStatus = require("../models/enum/SeatStatus");
const TicketStatus = require("../models/enum/TicketStatus");
const UserRole = require("../models/enum/UserRole");
const auth = require("../services/authService");

function globalLocals(req, res, next) {
  const user = auth.getUserFromSession(req.session);
  req.user = user;
  res.locals.user = user;
  res.locals.isLoggedIn = !!user;
  res.locals = {
    ...res.locals,
    SeatStatus,
    TicketStatus,
    UserRole,
    PaymentStatus,
  };
  next();
}

module.exports = globalLocals;
