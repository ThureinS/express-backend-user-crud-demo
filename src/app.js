const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./user/user.routes");
const authRoutes = require("./auth/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Global rate limit; stricter one on auth to slow credential brute-forcing.
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

app.use("/auth", authLimiter, authRoutes); // public
app.use("/users", userRoutes); // protected (requireAuth inside the router)

// central error handler
app.use((err, req, res, next) => {
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({ error: "email already exists" });
  }
  res.status(err.status || 500).json({ error: err.message || "internal error" });
});

module.exports = app;
