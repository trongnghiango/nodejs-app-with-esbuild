const mongoose = require('mongoose');

const uriString = `mongodb+srv://test:${encodeURIComponent(
  'Test@1234'
)}@cluster.qinev.mongodb.net/?retryWrites=true&w=majority`;

class Database {
  constructor() {
    console.log('constructor');
    this.connect();
  }

  connect() {
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(uriString, { maxPoolSize: 50 })
      .then((_) => console.log(`Connected MongoDb.`))
      .catch((err) => console.error(`Error Connect Mongo:: ${err.message}`));
  }

  static getInstance() {
    console.log('getInstance');
    // @ts-ignore
    if (!Database._instance) {
      // @ts-ignore
      Database._instance = new Database();
    }

    // @ts-ignore
    return Database._instance;
  }
}

const dbInstance = new Database();
module.exports = dbInstance;
