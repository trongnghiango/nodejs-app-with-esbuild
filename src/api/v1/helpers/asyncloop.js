// @ts-nocheck
/* eslint-disable no-restricted-syntax */

const logger = require("../../../utils/logger");

// eslint-disable-next-line node/no-unsupported-features/es-syntax
async function asyncLoop(prmises) {
  const results = [];
  for (const item of prmises) {
    // eslint-disable-next-line no-await-in-loop
    const temp = await item();
    logger.info("test");
    results.push(temp);
  }
  return results;
}

module.exports = asyncLoop;
