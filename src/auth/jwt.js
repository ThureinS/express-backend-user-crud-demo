const jwt = require("jsonwebtoken");

// ponytail: dev fallback so it runs out of the box; set JWT_SECRET in prod.
const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

module.exports = {
  sign: (user) => jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1d" }),
  verify: (token) => jwt.verify(token, SECRET),
};
