// @ts-nocheck
const logger = require('../../../utils/logger');
const { AccessTokenError, BadTokenError } = require('../core/http-error');
const { verifyToken } = require('./jwt');

module.exports = {
  checkToken: async (req, res, next) => {
    const token = req.headers['x-token'];

    //
    if (!token) {
      return next(new AccessTokenError());
    }
    // decode token
    const verify = await verifyToken(token);
    console.log('TOKEN [decode]:::', verify);
    if (!verify) {
      return next(new AccessTokenError('Verify fail'));
    }
    return next();
  },

  /**
   * checkRole
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  checkRole: async (req, res, next) => {
    const token = req.headers['x-token'];
    if (!token) {
      return next(new AccessTokenError('No Token'));
    }

    // verify token
    const user = await verifyToken(token);
    if (!user) {
      return next(new AccessTokenError('Token failed or expired'));
    }
    // eslint-disable-next-line dot-notation
    delete user['iat'];
    // eslint-disable-next-line dot-notation
    delete user['exp'];

    if (!req.currentRoleCodes) {
      return next(new BadTokenError());
    }

    // check Role
    let authorized = false;
    // authorized = user.roles.some((userRole) =>
    //   req.currentRoleCodes.some((role) => role === userRole)
    // );

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
    if (!authorized) next(new BadTokenError('Permission denied'));

    return next();
  },
};
