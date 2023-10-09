const asyncHandler = require("../helpers/asyncHandler");
const logger = require("../../../utils/logger");
const { ForbiddenError } = require("../core/ApiError");
const Header = require("../helpers/constants");
const ApiKeyService = require("../services/apikey.service");

module.exports.checkApiKey = asyncHandler(async (req, res, next) => {
  const key = req.headers[Header.API_KEY];
  logger.info(key);
  if (!key) {
    throw new ForbiddenError(`[No api-key] Permission denied`);
  }

  const apiKey = await ApiKeyService.findByKey(key.toString());
  if (!apiKey) throw new ForbiddenError(`[Notfound apikey] Permission denied`);
  logger.info(apiKey);

  req.apiKey = apiKey;
  next();
});
