const baseConfig = require('./base.config');

module.exports = {
  ...baseConfig,
  env: 'development',
  db: {
    ...baseConfig.db,
    dburi: process.env.DEV_DB_URI || '',
  }
};
