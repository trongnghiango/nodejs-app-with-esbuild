const logger = require("../../../utils/logger");

async function asyncLoop(prmises) {
  const results = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of prmises) {
    // eslint-disable-next-line no-await-in-loop
    const temp = await item();
    logger.info("test");
    results.push(temp);
  }
  return results;
}

module.exports = asyncLoop;
