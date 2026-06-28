// auth service: register reuses user creation; login verifies + issues a JWT.
const bcrypt = require("bcryptjs");
const userService = require("../user/user.service");
const User = require("../user/user.model");
const httpError = require("../http-error");
const { sign } = require("./jwt");

module.exports = {
  async register(data) {
    const user = await userService.create(data); // password hashed by model hook
    return { user, token: sign(user) };
  },

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw httpError(401, "invalid credentials");
    }
    return { user, token: sign(user) };
  },
};
