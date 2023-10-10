const logger = require("../../../utils/logger");
const RoleService = require("../services/role.service");

module.exports._requiredRole =
  (...roleCodes) =>
  async (req, res, next) => {
    const role = await RoleService.getListIdByCodes(roleCodes);
    logger.info(`[currentRoleCodes]::${roleCodes} ${role}`);

    req.currentRoleCodes = role;
    next();
  };
