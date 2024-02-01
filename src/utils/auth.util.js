/* eslint-disable no-restricted-syntax */
function authorization(reqRoles, userRoles) {
  let authorized = false;
  if (Array.isArray(reqRoles) && Array.isArray(userRoles))
    for (const userRole of reqRoles) {
      if (authorized) return authorized;
      for (const role of userRoles) {
        if (userRole._id.equals(role._id)) {
          authorized = true;
          return authorized;
        }
      }
    }

  return authorized;
}

module.exports = {
  authorization,
};
