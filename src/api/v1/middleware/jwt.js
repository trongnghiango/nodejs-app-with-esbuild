const JWT = require('jsonwebtoken');

const { readPrivateKey, readPublicKey } = require('../../../utils/file.utils');
const logger = require('../../../utils/logger');
const { BadTokenError } = require('../core/http-error');

module.exports = {
  /**
   * signAccessToken
   * desc:
   * @param {*} payload
   * @returns
   */
  async signAccessToken(payload) {
    /* payload template
    // create payload
    const payload = {
      userId: 1,
      name: "Nghia",
      roles: [...]
    };
    */

    const cert = await readPrivateKey();
    // create Token
    try {
      // @ts-ignore
      return await JWT.sign(payload, cert, {
        expiresIn: '60m',
        algorithm: 'RS256',
      });
    } catch (error) {
      // @ts-ignore
      logger.error(error.message);
      return null;
    }
  },

  /**
   * signRefreshToken
   * @param {*} payload
   * @returns
   */
  async signRefreshToken(payload) {
    // get payload
    const cert = await readPrivateKey();
    // create Token
    try {
      // @ts-ignore
      return await JWT.sign(payload, cert, {
        expiresIn: '1d',
        algorithm: 'RS256',
      });
    } catch (error) {
      // @ts-ignore
      logger.error(error.message);
      return null;
    }
  },

  /**
   * verifyToken
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async verifyTokenMiddleware(req, res, next) {
    try {
      if (req.headers['x-token']) {
        const token = req.headers['x-token'];
        const cert = await readPublicKey();
        // @ts-ignore
        const payload = await JWT.verify(token, cert);
        req.user = payload;
        return next();
      }
      return next(
        new BadTokenError('Người dùng chưa được định danh Hoặc Notfound TOKEN')
      );
    } catch (error) {
      // @ts-ignore
      logger.info(`[VerifyToken]:: ${error.message}`);
      // @ts-ignore
      return next(new BadTokenError(error.message));
    }
  },

  /**
   * verifyToken
   * @param {*} token
   * @returns
   */
  async verifyToken(token) {
    try {
      if (token) {
        const cert = await readPublicKey();
        // @ts-ignore
        const payload = await JWT.verify(token, cert);

        return payload;
      }

      return null;
    } catch (error) {
      // @ts-ignore
      logger.error(`[VERIFY_TOKEN]:: ${error.message}`);
      return null;
    }
  },
};
