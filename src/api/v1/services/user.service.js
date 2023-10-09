const { randomUUID } = require("node:crypto");
const logger = require("../../../utils/logger");
const { BadRequestError } = require("../core/http-error");
const { _User } = require("../models/user.model");

/**
 * isExistedUser
 * @param {*} userId string
 * @returns object | null
 */
async function isExistedUser(userId) {
  try {
    return await _User.findOne({ userId });
  } catch (error) {
    return null;
  }
}

/**
 * isExistedEmail
 * @param {*} email
 * @returns
 */
async function isExistedEmail(email) {
  try {
    return await _User.findOne({ email });
  } catch (error) {
    // @ts-ignore
    logger.error(error.message);
    return null;
  }
}

/**
 * createNewUser
 * @param {*} data
 * @returns
 */
async function createNewUser(data) {
  if (!data) return null;

  const userId = randomUUID();

  try {
    const newUser = {};
    Object.assign(newUser, data, { userId });

    return await _User.create(newUser);
  } catch (error) {
    // @ts-ignore
    logger.error(error.message);
    // return null;
    // @ts-ignore
    throw new Error(`Error[create new user]:: ${error.message}`);
  }
}

/**
 * findUserByUsername
 * @param {*} username
 * @returns
 */
async function findUserByUsername(username) {
  try {
    return await _User.findOne({ username }).lean();
    // .select('displayName username roles')
    // .exec();
  } catch (error) {
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
}

module.exports = {
  isExistedUser,
  isExistedEmail,
  createNewUser,
  findUserByUsername,
};
