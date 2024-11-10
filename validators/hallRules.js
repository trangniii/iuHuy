const { body } = require("express-validator");

function addHallRules() {
  return [
    body("name").isString().withMessage("Name must be a string"),
    body("seatRows").custom((value, meta) => {
      if (Number.isInteger(+value) && +value > 0 && +value <= 10) return true;
      throw new Error("Seat rows must be a positive integer");
    }),
    body("seatColumns").custom((value, meta) => {
      if (Number.isInteger(+value) && +value > 0 && +value <= 10) return true;
      throw new Error("Seat columns must be a positive integer");
    }),
  ];
}

module.exports = { addHallRules };
