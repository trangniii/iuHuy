const bookingRouter = require("express").Router();

bookingRouter.get("/:id", (req, res) => {
  res.send("Booking page of movie with id: " + req.params.id);
});

module.exports = bookingRouter;
