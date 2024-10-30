const { INTERNAL_SERVER_ERROR } = require("./enum/HttpCode");

class HttpError extends Error {
  constructor(code = INTERNAL_SERVER_ERROR, message) {
    super(message);
    this.code = code;
  }
}

module.exports = HttpError;
