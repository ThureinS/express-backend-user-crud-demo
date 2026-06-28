// controller layer: maps HTTP <-> service. No business logic here.
const service = require("./user.service");

module.exports = {
  async create(req, res, next) {
    try {
      res.status(201).json(await service.create(req.body));
    } catch (err) {
      next(err);
    }
  },

  async list(req, res, next) {
    try {
      res.json(await service.list());
    } catch (err) {
      next(err);
    }
  },

  async get(req, res, next) {
    try {
      res.json(await service.get(req.params.id));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      res.json(await service.update(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await service.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
