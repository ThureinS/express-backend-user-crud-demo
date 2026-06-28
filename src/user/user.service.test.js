// Checks the non-trivial bits: DTO validation, password hiding, and 404 path.
process.env.DB_STORAGE = ":memory:";

const { test } = require("node:test");
const assert = require("node:assert");
const sequelize = require("../db");
const service = require("./user.service");
const { createUserSchema } = require("./user.dto");

test("user DTO + service", async (t) => {
  await sequelize.sync();

  await t.test("DTO rejects bad email", () => {
    assert.strictEqual(createUserSchema.safeParse({ name: "A", email: "nope", password: "secret1" }).success, false);
  });

  await t.test("DTO rejects empty name", () => {
    assert.strictEqual(createUserSchema.safeParse({ name: "  ", email: "a@b.com", password: "secret1" }).success, false);
  });

  await t.test("DTO trims name", () => {
    const r = createUserSchema.safeParse({ name: " Ada ", email: "a@b.com", password: "secret1" });
    assert.strictEqual(r.data.name, "Ada");
  });

  await t.test("creates, hides password, fetches", async () => {
    const u = await service.create({ name: "Ada", email: "ada@b.com", password: "secret1" });
    assert.ok(!("password" in u.toJSON())); // never leaked
    const got = await service.get(u.id);
    assert.strictEqual(got.email, "ada@b.com");
  });

  await t.test("404 on missing", async () => {
    await assert.rejects(() => service.get(99999), { status: 404 });
  });
});
