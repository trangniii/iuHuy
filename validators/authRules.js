const { body } = require("express-validator");

function loginRules() {
  return [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
}

function registerRules() {
  return [
    ...loginRules(),
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
  ];
}

module.exports = { loginRules, registerRules };
