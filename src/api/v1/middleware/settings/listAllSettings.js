const { conn } = require("@/database/conn");

const Model = conn.model('Setting');

const listAllSettings = async () => {
  try {
    //  Query the database for a list of all results
    const result = await Model.find({ removed: false, isPrivate: false }).exec();

    if (result.length > 0) {
      return result;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

module.exports = listAllSettings;
