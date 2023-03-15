const asyncHandler = require('express-async-handler');
const logger = require('../../../utils/logger');
const { AccessTokenError, BadTokenError } = require('../core/http-error');
const { verifyToken, decode } = require('./jwt');

module.exports = {
  checkToken: asyncHandler(
    async (
      /** @type {{ headers: { [x: string]: any; }; }} */ req,
      /** @type {any} */ res,
      /** @type {import('express').NextFunction} */ next
    ) => {
      const token = req.headers['x-token'];
      //
      if (!token) {
        throw new AccessTokenError();
      }
      // decode token
      const verify = await verifyToken(token);
      console.log('TOKEN [decode]:::', verify);
      if (!verify) {
        throw new AccessTokenError('Verify fail');
      }

      next();
    }
  ),

  checkRole: asyncHandler(
    async (/** @type {{ [x: string]: any; }} */ req, res, next) => {
      const token = req.headers['x-token'];
      if (!token) {
        throw new AccessTokenError('No Token');
      }

      // verify token
      const { sub } = await decode(token);
      logger.debug(`::: ${JSON.stringify(sub)}`);
      if (!sub) {
        throw new AccessTokenError('Token failed or expired');
      }
      // eslint-disable-next-line dot-notation
      // delete user['iat'];
      // eslint-disable-next-line dot-notation
      // delete user['exp'];

      if (!req.currentRoleCodes) {
        throw new BadTokenError();
      }

      const user = JSON.parse(sub);

      if (!user.roles) {
        throw new BadTokenError(
          'Tài khoản của bạn bị từ chối. Vui lòng liên hệ Admin'
        );
      }
      //
      req.user = user;

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
      if (!authorized) throw new BadTokenError('Permission denied');

      // logger.info(
      //   JSON.stringify({
      //     user,
      //     authorized,
      //     currentRoleCodes: req.currentRoleCodes,
      //   })
      // );

      next();
    }
  ),
};
