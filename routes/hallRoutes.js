const hallService = require("../services/hallService");

const hallRouter = require("express").Router();

hallRouter.get("/halls", async (req, res) => {
  const locals = {
    title: "Hall Manager",
    js: "hallsPage",
  };

  const page = req.query.page;
  const pageSize = 10;

  const data = await hallService.getHalls({ page, pageSize });

  locals.halls = data.halls;
  locals.total = data.total;
  locals.totalPages = data.totalPages;

  res.render("admin/hall-manager", locals);
});

module.exports = hallRouter;
