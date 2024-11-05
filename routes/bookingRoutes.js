const { validationResult } = require("express-validator");
const mustLogin = require("../middlewares/mustLogin");
const hallService = require("../services/hallService");
const { seatsRules } = require("../validators/bookingRules");
const { BAD_REQUEST } = require("../models/enum/HttpCode");
const ticketService = require("../services/ticketService");

const bookingRouter = require("express").Router();

bookingRouter.get("/:id", mustLogin, async (req, res, next) => {
  const showtimeId = req.params.id;
  const from = req.query.from;
  const locals = {
    from,
    css: "seat.css",
    js: "bookingPage",
    title: "Booking Page",
    showtimeId,
  };
  try {
    const info = await hallService.getInfoOfHallWithShowtime(showtimeId);
    locals.hallInfo = info;
    res.render("pages/seat", locals);
  } catch (error) {
    next(error);
  }
});

bookingRouter.post("/:id", mustLogin, seatsRules(), async (req, res) => {
  const validResult = validationResult(req);

  if (!validResult.isEmpty()) {
    return res.status(BAD_REQUEST).json({ errors: validResult.array() });
  }

  const showtimeId = req.params.id;
  const userId = req.user.id;
  const seats = req.body.seats;

  try {
    const { payment, tickets } = await ticketService.bookTicket(
      userId,
      showtimeId,
      seats
    );

    res.json({
      paymentId: payment.id,
      ticketIds: tickets.map((ticket) => ticket.id),
    });
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
});

module.exports = bookingRouter;
