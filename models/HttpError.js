const { INTERNAL_SERVER_ERROR } = require("./enum/HttpCode");

class HttpError extends Error {
  constructor(message, code = INTERNAL_SERVER_ERROR) {
    super(message);
    this.code = code;
  }
}

module.exports = HttpError;
