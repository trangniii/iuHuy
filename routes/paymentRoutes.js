const mustLogin = require("../middlewares/mustLogin");
const hallService = require("../services/hallService");
const paymentService = require("../services/paymentService");

const paymentRouter = require("express").Router();

paymentRouter.get("/checkout/:id", mustLogin, async (req, res, next) => {
  const paymentId = req.params.id;
  const userId = req.user.id;

  try {
    const paymentInfo = await paymentService.getPaymentInfo(userId, paymentId);
    res.render("pages/checkout", { payment: paymentInfo });
  } catch (error) {
    next(error);
  }
});

paymentRouter.get("/booking/:id", mustLogin, async (req, res, next) => {
  const showtimeId = req.params.id;
  try {
    const info = await hallService.getInfoOfHallWithShowtime(showtimeId);
    res.render("pages/seat", { hallInfo: info });
  } catch (error) {
    next(error);
  }
});

module.exports = paymentRouter;
