// Verifies the Bearer token and attaches req.user. Used to protect routes.
const { verify } = require("./jwt");

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "missing bearer token" });
  try {
    req.user = verify(token);
    next();
  } catch {
    return res.status(401).json({ error: "invalid or expired token" });
  }
};
