const priceRouter = require("express").Router();
const {
  getPrices,
  deletePriceById,
  addPrice,
  getPriceById,
  updatePriceById,
} = require("../services/priceService");

priceRouter.get("/priceSeatsManage", async (req, res) => {
  try {
    const prices = await getPrices();
    res.render("admin/priceSeatsManage", { prices });
  } catch (error) {
    res.json({ message: error.message });
  }
});

priceRouter.get("/addPriceSeats", (req, res) => {
  res.render("admin/addPriceSeats");
});

priceRouter.get("/updatePriceSeats/:id", async (req, res) => {
  const id = req.params.id;
  const priceData = await getPriceById(id);
  res.render("admin/updatePriceSeats", { priceData });
});

priceRouter.get("/deletePriceSeats/:id", async (req, res) => {
  const isSuccess = await deletePriceById(req.params.id);
  if (isSuccess) {
    res.redirect("/priceSeatsManage");
  }
});

priceRouter.post("/addPriceSeats", async (req, res) => {
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

priceRouter.post("/updatePriceSeats", async (req, res) => {
  const id = req.body.id;
  const startRow = req.body.rowStart;
  const endRow = req.body.rowEnd;
  const price = req.body.price;
  const updateData = {
    startRow,
    endRow,
    price,
  };
  await updatePriceById(id, updateData);
  res.redirect("/priceSeatsManage");
});

module.exports = priceRouter;
