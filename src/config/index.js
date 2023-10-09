const devConfig = require("./dev.config");
const proConfig = require("./pro.config");
const testConfig = require("./test.config");

/**
 * @param {string} environment
 */
function getConfig(environment) {
  if (environment === "development") {
    return devConfig;
  }
  if (environment === "production") {
    return proConfig;
  }
  if (environment === "testing") {
    return testConfig;
  }
  return devConfig;
}

const configs = getConfig(process.env.NODE_ENV || "production");

module.exports = configs;
