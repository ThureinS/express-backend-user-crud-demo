// DTOs: the shape of accepted request bodies, validated by zod.
const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

// PUT/PATCH: any subset of the above.
const updateUserSchema = createUserSchema.partial();

module.exports = { createUserSchema, updateUserSchema };
