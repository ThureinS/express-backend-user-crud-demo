const { Sequelize } = require("sequelize");

// ponytail: Sequelize requires the pg driver dynamically by name, which
// Vercel's function bundler can't trace statically. This static require
// forces it into the deployed bundle.
if (process.env.DATABASE_URL) require("pg");

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
