// repository layer: the only place that talks to the orm/model.
const User = require("./user.model");

module.exports = {
  create: (data) => User.create(data),
  findAll: () => User.findAll(),
  findById: (id) => User.findByPk(id),
  update: (user, data) => user.update(data),
  remove: (user) => user.destroy(),
};
