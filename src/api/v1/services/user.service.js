const { randomUUID } = require('node:crypto');
const logger = require('../../../utils/logger');
const { _User } = require('../models/user.model');

async function isExistedUser(userId) {
  try {
    return await _User.findOne({ userId });
  } catch (error) {
    return null;
  }
}

async function isExistedEmail(email) {
  try {
    return await _User.findOne({ email });
  } catch (error) {
    logger.error(error.message);
    return null;
  }
}

async function createNewUser(data) {
  if (!data) return null;

  const userId = randomUUID();

  try {
    const newUser = {};
    Object.assign(newUser, data, { userId });

    return await _User.create(newUser);
  } catch (error) {
    logger.error(error.message);
    return null;
  }
}

module.exports = {
  isExistedUser,
  isExistedEmail,
  createNewUser,
};
