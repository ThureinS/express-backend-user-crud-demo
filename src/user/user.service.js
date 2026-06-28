// service layer: business rules. Input shape is validated upstream by the DTO.
const repo = require("./user.repository");
const httpError = require("../http-error");

module.exports = {
  create(data) {
    return repo.create(data);
  },

  list() {
    return repo.findAll();
  },

  async get(id) {
    const user = await repo.findById(id);
    if (!user) throw httpError(404, "user not found");
    return user;
  },

  async update(id, data) {
    const user = await this.get(id);
    return repo.update(user, data);
  },

  async remove(id) {
    const user = await this.get(id);
    await repo.remove(user);
  },
};
