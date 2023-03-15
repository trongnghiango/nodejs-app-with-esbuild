/**
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
async function authentication(req, res, next) {
  next();
}

module.exports = authentication;
