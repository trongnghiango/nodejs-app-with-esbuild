const logger = require("../../../utils/logger");

module.exports._requireRole =
  (/** @type {any} */ ...roleCodes) =>
  // @ts-ignore
  (req, res, next) => {
    // logger.info(`[currentRoleCodes]::${roleCodes}`);
    req.currentRoleCodes = roleCodes;
    next();
  };
