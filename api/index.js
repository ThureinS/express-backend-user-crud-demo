const app = require("../src/app");
const sequelize = require("../src/db");

// ponytail: sync once per warm lambda instance, not per request
let ready;
module.exports = (req, res) => {
  ready ||= sequelize.sync();
  ready.then(() => app(req, res));
};
