const service = require("./auth.service");

module.exports = {
  async register(req, res, next) {
    try {
      res.status(201).json(await service.register(req.body));
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      res.json(await service.login(req.body));
    } catch (err) {
      next(err);
    }
  },
};
