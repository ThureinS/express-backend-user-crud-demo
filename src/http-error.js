// Tiny helper so any layer can throw an HTTP-aware error.
module.exports = function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
};
