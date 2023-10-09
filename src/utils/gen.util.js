module.exports.genRoleIdWithPre = (prefix = "") => {
  const tmp = new Date().getTime().toString(36);
  return `${prefix}${tmp}`.toUpperCase();
};
