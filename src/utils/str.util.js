/**
 * getStr
 * @param {string} str
 * @param {import("esbuild").Charset} first
 * @param {import("esbuild").Charset} last
 * @returns
 */
const getStr = (str, first, last) =>
  str.substring(str.indexOf(first) + 1, str.lastIndexOf(last));

const getDbStr = (str) => {
  // Match all the words whose length is greater than 5
  // const regex = /[a-z]\/(.*?)\?/;
  const regex = /@(.*?)\?/;
  const result = str.match(regex);
  return result ? result[1] : null;
};

module.exports = {
  getStr,
  getDbStr,
};
