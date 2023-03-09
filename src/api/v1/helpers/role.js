const logger = require('../../../utils/logger');

module.exports._requireRole =
  (...roleCodes) =>
  (req, res, next) => {
    logger.log(`${roleCodes}`);
    req.currentRoleCodes = roleCodes;
    next();
  };
