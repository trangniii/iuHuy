const { Op } = require("sequelize");
const User = require("../models/User");
const HttpError = require("../models/HttpError");
const { UNAUTHORIZED } = require("../models/enum/HttpCode");
const UserDto = require("../models/dto/UserDto");

const auth = {
  async login(usernameOrEmail, password) {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        password,
      },
    });

    if (!user) throw new HttpError(UNAUTHORIZED, "Invalid credentials");

    return user;
  },

  async register(username, email, password) {
    const hasUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (hasUser) throw new HttpError(UNAUTHORIZED, "User already exists");

    const user = await User.create({ username, email, password });

    return user;
  },

  getUserFromSession(session) {
    return session.user ? new UserDto(session.user) : null;
  },

  setUserToSession(session, user) {
    session.user = user;
  },
};

module.exports = auth;
