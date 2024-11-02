const movieService = require("../services/movieService");
const movieRouter = require("express").Router();

movieRouter.get("/:id", async (req, res, next) => {
  const movieId = req.params.id;
  try {
    const movieDetail = await movieService.getDetailOfMovie(movieId);
    const locals = {
      css: "movieDetail.css",
      ...movieDetail.getDataForView(),
    };
    res.render("pages/movie-detail", locals);
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/checkout/:id", (req, res) => {
  res.render("pages/checkout");
});

movieRouter.get("/booking/:id", (req, res) => {
  // Data tuong tu nhu data trong sql 
  const seatList = [
    { id: 1, cinemaHallId: 1, row: 1, number: 1, status: "AVAILABLE" },
    { id: 2, cinemaHallId: 1, row: 1, number: 2, status: "BOOKED" },
    { id: 3, cinemaHallId: 2, row: 5, number: 10, status: "AVAILABLE" },
    { id: 4, cinemaHallId: 3, row: 2, number: 5, status: "BOOKED" },
    { id: 5, cinemaHallId: 1, row: 1, number: 1, status: "AVAILABLE" },
    { id: 6, cinemaHallId: 1, row: 1, number: 2, status: "BOOKED" },
    { id: 7, cinemaHallId: 2, row: 5, number: 10, status: "AVAILABLE" },
    { id: 8, cinemaHallId: 3, row: 2, number: 5, status: "BOOKED" },
    { id: 9, cinemaHallId: 1, row: 1, number: 1, status: "AVAILABLE" },
    { id: 10, cinemaHallId: 1, row: 1, number: 2, status: "BOOKED" },
    { id: 11, cinemaHallId: 2, row: 5, number: 10, status: "AVAILABLE" },
    { id: 12, cinemaHallId: 3, row: 2, number: 5, status: "BOOKED" }
  ];

  // sap sep list trong data lai thanh tung row 
  const groupedByRow = seatList.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  res.render("pages/seat", {
    seats: groupedByRow
  });
});

module.exports = movieRouter;