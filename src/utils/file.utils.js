const { promisify } = require("util");
const path = require("path");
const { readFile } = require("fs");

module.exports = {
  /**
   * readPublicKey
   * @returns 
   */
  readPublicKey: function () {
    return promisify(readFile)(
      path.join(__dirname, "../../config/keys/public.pem"),
      "utf8"
    );
  },

  /**
   * readPrivateKey
   * @returns 
   */
  readPrivateKey: function () {
    return promisify(readFile)(
      path.join(__dirname, "../../config/keys/private.pem"),
      "utf8"
    );
  }
}