const JWT = require("jsonwebtoken");

const { readPrivateKey, readPublicKey } = require("../../../utils/file.utils");
const logger = require("../../../utils/logger");


module.exports = {
  /**
   * signAccessToken
   * @param {*} payload 
   * @returns 
   */
  signAccessToken: async function (payload) {
    /*
    // create payload
    const payload = {
      userId: 1,
      name: "Nghia",
    };
    */

    logger.info(`start`);
    const cert = await readPrivateKey();
    logger.info('end.')
    //create Token
    return await JWT.sign(payload, cert, { expiresIn: "1m", algorithm: "RS256" });
  },

  /**
   * signRefreshToken
   * @param {*} payload 
   * @returns 
   */
  signRefreshToken: async function (payload) {
    // get payload
    const cert = await readPrivateKey();
    //create Token
    return await JWT.sign(payload, cert, { expiresIn: "1d", algorithm: "RS256" });
  },

  /**
   * verifyToken
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  verifyToken: async function (req, res, next) {
    try {
      if (req.headers["x-token"]) {
        const token = req.headers["x-token"];
        const cert = await readPublicKey();
        const payload = await JWT.verify(token, cert);
        req.user = payload;
        return next();
      }
      return res.status(401).json({
        code: 401,
        msg: "Khong co token",
      });
      //    next("khong co token");
    } catch (error) {
      return res.status(401).json({
        code: 401,
        msg: "Invalid Token!",
        error,
      });
    }
  },

};