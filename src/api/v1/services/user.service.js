const { randomUUID } = require("node:crypto");
const logger = require("../../../utils/logger");
const { BadRequestError, InternalError } = require("../core/ApiError");
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
    logger.error(error.message);
    throw new InternalError(`Error::create new user:: ${error.message}`);
  }
}

/**
 * findUserByUsername
 * @param {*} username
 * @returns
 */
async function findUserByUsername(username) {
  try {
    return await _User
      .findOne({ username })
      .select("displayName username password roles") // not contain password -> error
      .lean()
      .exec();
  } catch (error) {
    // @ts-ignore
    throw new BadRequestError(error.message);
  }
}

/**
 * isExistedEmail
 * @param {string} email
 * @returns
 */
async function getUserById(_id) {
  try {
    return await _User.findOne({ _id }).select("roles").lean();
  } catch (error) {
    logger.error(`[UserService::getUserById]${error.message}`);
    throw new InternalError(error.message);
  }
}

module.exports = {
  isExistedUser,
  isExistedEmail,
  createNewUser,
  findUserByUsername,
  getUserById,
};
