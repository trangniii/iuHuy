const mustLogin = require("../middlewares/mustLogin");
const paymentService = require("../services/paymentService");
const { INTERNAL_SERVER_ERROR } = require("../models/enum/HttpCode");
const { CASH } = require("../models/enum/PaymentMethod");

const paymentRouter = require("express").Router();

paymentRouter.get("/:id", mustLogin, async (req, res, next) => {
  const paymentId = req.params.id;
  const userId = req.user.id;

  try {
    const paymentInfo = await paymentService.getPaymentInfo(userId, paymentId);
    res.render("pages/checkout", { payment: paymentInfo, js: "checkoutPage" });
  } catch (error) {
    next(error);
  }
});

paymentRouter.post("/:id", mustLogin, async (req, res) => {
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

module.exports = paymentRouter;
