// Checks register issues a token and login rejects a wrong password.
process.env.DB_STORAGE = ":memory:";

const { test } = require("node:test");
const assert = require("node:assert");
const sequelize = require("../db");
const auth = require("./auth.service");
const { verify } = require("./jwt");

test("auth service", async (t) => {
  await sequelize.sync();

  await t.test("register returns a valid token", async () => {
    const { user, token } = await auth.register({ name: "Ada", email: "ada@b.com", password: "secret1" });
    assert.strictEqual(verify(token).email, "ada@b.com");
    assert.ok(!("password" in user.toJSON()));
  });

  await t.test("login succeeds with correct password", async () => {
    const { token } = await auth.login({ email: "ada@b.com", password: "secret1" });
    assert.ok(token);
  });

  await t.test("login rejects wrong password", async () => {
    await assert.rejects(() => auth.login({ email: "ada@b.com", password: "wrong" }), { status: 401 });
  });
});
