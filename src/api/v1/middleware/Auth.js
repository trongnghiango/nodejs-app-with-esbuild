const logger = require("../../../utils/logger");
const { AccessTokenError, BadTokenError } = require("../core/ApiError");
const asyncHandler = require("../helpers/asyncHandler");
const { decode, verifyToken } = require("./jwt");

module.exports = {
  // checkToken
  authentication: asyncHandler(
    async (
      /** @type {{ headers: { [x: string]: any; }; }} */ req,
      /** @type {any} */ res,
      /** @type {import('express').NextFunction} */ next
    ) => {
      const token = req.headers["x-token"];
      //
      if (!token) {
        throw new AccessTokenError();
      }
      // decode token
      const { sub } = await verifyToken(token);
      if (!sub) {
        throw new AccessTokenError("Verify fail");
      }

      const user = JSON.parse(sub);

      req.user = user;
      console.log("TOKEN [decode]:::", user);

      next();
    }
  ),

  checkRole: asyncHandler(async (req, res, next) => {
    const token = req.headers["x-token"];
    if (!token) {
      throw new AccessTokenError("No Token");
    }

    // verify token
    const { sub } = await decode(token);
    logger.debug(`::: ${JSON.stringify(sub)}`);
    if (!sub) {
      throw new AccessTokenError("Token failed or expired");
    }
    // eslint-disable-next-line dot-notation
    // delete user['iat'];
    // eslint-disable-next-line dot-notation
    // delete user['exp'];

    const user = JSON.parse(sub);

    if (!user.roles) {
      throw new BadTokenError("Token bị từ chối. Vui lòng re-check!");
    }
    //
    req.user = user;

    if (!req.currentRoleCodes) {
      throw new BadTokenError("ciquan");
    }
    // check Role
    let authorized = false;
    logger.info(`[Auth]:: ${req.currentRoleCodes} --vs-- ${user.roles}`);

    // eslint-disable-next-line no-restricted-syntax
    for (const userRole of user.roles) {
      if (authorized) break;
      // eslint-disable-next-line no-restricted-syntax
      for (const role of req.currentRoleCodes) {
        if (userRole === role) {
          authorized = true;
          break;
        }
      }
    }
    logger.info(
      JSON.stringify({
        user,
        authorized,
        currentRoleCodes: req.currentRoleCodes,
      })
    );

    if (!authorized) throw new BadTokenError("Permission denied");

    next();
  }),
};
