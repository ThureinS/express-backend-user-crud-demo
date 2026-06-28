const { Sequelize } = require("sequelize");

// ponytail: file-backed sqlite; swap storage/dialect here if you outgrow it.
const storage = process.env.DB_STORAGE || "data.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});

module.exports = sequelize;
