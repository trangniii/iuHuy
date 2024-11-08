const { validationResult } = require("express-validator");
const hallService = require("../services/hallService");
const { addHallRules } = require("../validators/hallRules");
const { ADMIN_HALLS } = require("../constants/path");

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

hallRouter.post("/halls/add", addHallRules(), async (req, res) => {
  const result = validationResult(req);
  const locals = {
    title: "Hall Manager",
    js: "hallsPage",
  };

  if (!result.isEmpty()) {
    console.log(result);
    const data = await hallService.getHalls();

    locals.halls = data.halls;
    locals.total = data.total;
    locals.totalPages = data.totalPages;
    locals.error = "You filled in the form incorrectly";
    res.status(400);
    return res.render("admin/hall-manager", locals);
  }

  try {
    await hallService.createHall(req.body);
    res.redirect(ADMIN_HALLS);
  } catch (error) {
    locals.error = "Error adding hall";
    return res.render("admin/hall-manager", locals);
  }
});

hallRouter.get("/halls/:id/delete", async (req, res) => {
  const id = req.params.id;
  await hallService.removeHall(id);

  res.redirect(ADMIN_HALLS);
});

hallRouter.post("/halls/:id/update", addHallRules(), async (req, res) => {
  const id = req.params.id;
  const result = validationResult(req);
  const locals = {
    title: "Hall Manager",
    js: "hallsPage",
  };

  if (!result.isEmpty()) {
    const data = await hallService.getHalls();
    locals.halls = data.halls;
    locals.total = data.total;
    locals.totalPages = data.totalPages;
    locals.error = "You filled in the form incorrectly";
    res.status(400);
    return res.render("admin/hall-manager", locals);
  }

  try {
    await hallService.updateHall(id, req.body);
    res.redirect(ADMIN_HALLS);
  } catch (error) {
    locals.error = "Error updating hall";
    return res.render("admin/hall-manager", locals);
  }
});

module.exports = hallRouter;
