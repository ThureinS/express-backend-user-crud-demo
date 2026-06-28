const { Router } = require("express");
const controller = require("./auth.controller");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("./auth.dto");

const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);

module.exports = router;
