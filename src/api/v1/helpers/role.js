const logger = require("../../../utils/logger");

module.exports._requireRole =
  (...roleCodes) =>
  (req, res, next) => {
    // logger.info(`[currentRoleCodes]::${roleCodes}`);
    req.currentRoleCodes = roleCodes;
    next();
  };
