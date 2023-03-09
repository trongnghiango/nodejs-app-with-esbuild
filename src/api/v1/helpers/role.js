module.exports._requireRole =
  (...roleCodes) =>
  (req, res, next) => {
    console.log(roleCodes);
    req.currentRoleCodes = roleCodes;
    next();
  };
