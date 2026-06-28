// Generic DTO validation middleware: parse req.body against a zod schema.
// On success, req.body is replaced with the parsed (and stripped) data.
module.exports = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "validation failed", issues: result.error.issues });
  }
  req.body = result.data;
  next();
};
