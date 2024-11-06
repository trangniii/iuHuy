const { validationResult } = require("express-validator");
const mustLogin = require("../middlewares/mustLogin");
const hallService = require("../services/hallService");
const paymentService = require("../services/paymentService");
const { seatsRules } = require("../validators/bookingRules");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../models/enum/HttpCode");
const ticketService = require("../services/ticketService");
const { CASH } = require("../models/enum/PaymentMethod");

const paymentRouter = require("express").Router();

paymentRouter.get("/checkout/:id", mustLogin, async (req, res, next) => {
  const paymentId = req.params.id;
  const userId = req.user.id;

  try {
    const paymentInfo = await paymentService.getPaymentInfo(userId, paymentId);
    res.render("pages/checkout", { payment: paymentInfo, js: "checkoutPage" });
  } catch (error) {
    next(error);
  }
});

paymentRouter.post("/checkout/:id", mustLogin, async (req, res) => {
  const paymentId = req.params.id;
  const userId = req.user.id;
  const paymentMethod = req.body.method || CASH;

  try {
    await paymentService.pay(userId, paymentId, paymentMethod);
    res.render("pages/checkout-success", { paymentId });
  } catch (error) {
    res
      .status(error.code || INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

paymentRouter.get("/booking/:id", mustLogin, async (req, res, next) => {
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

paymentRouter.post(
  "/booking/:id",
  mustLogin,
  seatsRules(),
  async (req, res) => {
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
  }
);

module.exports = paymentRouter;
