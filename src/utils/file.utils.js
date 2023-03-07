const { promisify } = require("util");
const path = require("path");
const { readFile } = require("fs");
const logger = require("./logger");

module.exports = {
  /**
   * readPublicKey
   * @returns 
   */
  readPublicKey: function () {
    return promisify(readFile)(
      path.join(__dirname, "keys/public.pem"),
      "utf8"
    );
  },

  /**
   * readPrivateKey
   * @returns 
   */
  readPrivateKey: function () {
    logger.info(path.join(__dirname, "keys/private.pem"))
    return promisify(readFile)(
      path.join(__dirname, "keys/private.pem"),
      "utf8"
    );
  }
}