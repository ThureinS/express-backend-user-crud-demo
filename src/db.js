const { Sequelize } = require("sequelize");

// ponytail: DATABASE_URL (Neon/Vercel Postgres) for real persistence in prod;
// local dev falls back to a plain sqlite file.
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: { ssl: { require: true } },
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: process.env.DB_STORAGE || "data.sqlite",
      logging: false,
    });

module.exports = sequelize;
