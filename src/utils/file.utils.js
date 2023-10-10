const { promisify } = require("util");
const path = require("path");
const { readFile } = require("fs");
const { dirname } = require("path");
const logger = require("./logger");
// const publicFile = require("../../keys/public.pem")

const appDir = dirname(require.main.path);

module.exports = {
  /**
   * readPublicKey
   * @returns
   */
  async readPublicKey() {
    try {
      return await promisify(readFile)(
        path.join(appDir, "keys/public.pem"),
        "utf8"
      );
    } catch (error) {
      logger.error(error.message);
      return null;
    }
  },

  /**
   * readPrivateKey
   * @returns
   */
  async readPrivateKey() {
    // logger.info(path.join(appDir, "keys/private.pem"))

    try {
      return await promisify(readFile)(
        path.join(appDir, "keys/private.pem"),
        "utf8"
      );
    } catch (error) {
      logger.error(error.message);
      return null;
    }
  },
};
