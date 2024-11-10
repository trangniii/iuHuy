const { body } = require("express-validator");

function seatsRules() {
  return [
    body("seats").isArray().withMessage("Seats must be an array"),
    body("seats.*.row").isInt().withMessage("Row must be an integer"),
    body("seats.*.number").isInt().withMessage("Number must be an integer"),
  ];
}

module.exports = { seatsRules };
