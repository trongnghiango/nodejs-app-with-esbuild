const _ = require("lodash");

const objectFilter = (results, fieldSelectedArr) =>
  _.pick(results, fieldSelectedArr);

// _.map(results, _.partialRight(_.pick, fieldSelectedArr));

module.exports = {
  objectFilter,
};
