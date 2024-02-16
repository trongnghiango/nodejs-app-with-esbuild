const { conn } = require('@/database/conn');

const Model = conn.model('Setting');

const updateBySettingKey = async ({ settingKey, settingValue }) => {
  try {
    if (!settingKey || !settingValue) {
      return null;
    }

    return await Model.findOneAndUpdate(
      { settingKey },
      {
        settingValue,
      },
      {
        new: true, // return the new result instead of the old one
        runValidators: true,
      }
    ).exec();
  } catch (err) {
    return null;
  }
};

module.exports = updateBySettingKey;
