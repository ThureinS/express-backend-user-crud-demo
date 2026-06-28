// routes layer: wires URLs to controller handlers.
// All user routes require auth; bodies are validated against the DTOs.
const { Router } = require("express");
const controller = require("./user.controller");
const validate = require("../middleware/validate");
const requireAuth = require("../auth/auth.middleware");
const { createUserSchema, updateUserSchema } = require("./user.dto");

const router = Router();

router.use(requireAuth);

router.post("/", validate(createUserSchema), controller.create);
router.get("/", controller.list);
router.get("/:id", controller.get);
router.put("/:id", validate(updateUserSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
