const { sign, verify } = require("jsonwebtoken");
const { promisify } = require("util");

const { readPrivateKey, readPublicKey } = require("../../../utils/file.utils");
const logger = require("../../../utils/logger");
const { BadTokenError, InternalError } = require("../core/ApiError");

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
      return await sign(payload, cert, {
        expiresIn: "60m",
        algorithm: "RS256",
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
      return await sign(payload, cert, {
        expiresIn: "1d",
        algorithm: "RS256",
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
      if (req.headers["x-token"]) {
        const token = req.headers["x-token"];
        const cert = await readPublicKey();
        // @ts-ignore
        const payload = await verify(token, cert);
        req.user = payload;
        return next();
      }
      return next(
        new BadTokenError("Người dùng chưa được định danh Hoặc Notfound TOKEN")
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
    const cert = await readPublicKey();
    try {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      return await promisify(verify)(token, cert);
    } catch (error) {
      throw new BadTokenError(error.message);
    }
  },

  /**
   * @param {{
        aud: string,
        sub: string,
        iss: string,
        iat: number,
        exp: number,
        prm: string,
      }} payload
   */
  async encode(payload) {
    logger.debug(`[encode]:: payload -- ${JSON.stringify(payload, null, 2)}`);
    const cert = await readPrivateKey();
    if (!cert) throw new InternalError("Token generation failure");
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const token = sign({ ...payload }, cert, { algorithm: "RS256" });
    if (!token) throw new InternalError("Token generation failure");

    return token;
  },
  /**
   * @param {string} token
   * @returns {Promise<{ iss: string, aud: string, sub: any, prm: string, iat: number, exp: number}>} payload
   */
  async decode(token) {
    const cert = await readPublicKey();
    try {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      return await promisify(verify)(token, cert, {
        ignoreExpiration: true,
      });
    } catch (error) {
      throw new BadTokenError(error.message);
    }
  },
};
