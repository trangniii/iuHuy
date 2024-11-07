const mustLogin = require("../middlewares/mustLogin");
const {
  getPrices,
  deletePriceById,
  addPrice,
  getPriceById,
  updatePriceById,
} = require("../services/priceService");

const adminRouter = require("express").Router();

adminRouter.get("/priceSeatsManage", mustLogin, async (req, res) => {
  try {
    const prices = await getPrices();
    res.render("pages/priceSeatsManage", { prices });
  } catch (error) {
    res
      // .status(error.code || INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

adminRouter.get("/addPriceSeats", mustLogin, (req, res) => {
  res.render("pages/addPriceSeats");
});

adminRouter.get("/updatePriceSeats/:id", mustLogin, async (req, res) => {
  const id = req.params.id;
  const priceData = await getPriceById(id);
  res.render("pages/updatePriceSeats", { priceData });
});

adminRouter.get("/deletePriceSeats/:id", mustLogin, async (req, res) => {
  const isSuccess = await deletePriceById(req.params.id);
  if (isSuccess) {
    res.redirect("/priceSeatsManage");
  }
});

adminRouter.post("/addPriceSeats", mustLogin, async (req, res) => {
  const startRow = req.body.rowStart;
  const endRow = req.body.rowEnd;
  const price = req.body.price;
  await addPrice({
    price,
    startRow,
    endRow,
  });
  res.redirect("/priceSeatsManage");
});

adminRouter.post("/updatePriceSeats", mustLogin, async (req, res) => {
  const id = req.body.id;
  const startRow = req.body.rowStart;
  const endRow = req.body.rowEnd;
  const price = req.body.price;
  const updateData = {
    startRow,
    endRow,
    price,
  };
  const update = await updatePriceById(id, updateData);
  res.redirect("/priceSeatsManage");
});

module.exports = adminRouter;
