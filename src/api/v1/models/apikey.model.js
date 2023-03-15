const { Schema } = require('mongoose');
const { conn2 } = require('../databases/init.multi.mongodb');

const apikeySchema = new Schema(
  {
    // keystoreId: { type: Schema.Types.String, required: true, unique: true },
    key: { type: Schema.Types.String, required: true, trim: true },
    version: { type: Schema.Types.Number, require: true },
    permissions: [{ type: Schema.Types.String, required: true, trim: true }],
    comments: [{ type: Schema.Types.String, trim: true }],
    client: {
      // client user
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      select: false,
    },
    description: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
apikeySchema.index({ _id: 1, key: 1 }, { unique: true });

module.exports.APIKEY = conn2.model('ApiKey', apikeySchema, 'api_keys');
