const { conn } = require('@/database/conn');

const Model = conn.model('Setting');

const readBySettingKey = async ({ settingKey }) => {
  try {
    // Find document by id

    if (!settingKey) {
      return null;
    }

    return await Model.findOne({ settingKey });
  } catch (err) {
    return null;
  }
};

module.exports = readBySettingKey;
