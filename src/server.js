const app = require("./app");
const sequelize = require("./db");

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
});
