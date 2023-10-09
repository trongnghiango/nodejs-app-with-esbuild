const { Schema } = require("mongoose");
const { auth_conn } = require("../databases/init.multi.mongodb");

const keystoreSchema = new Schema(
  {
    // keystoreId: { type: Schema.Types.String, unique: true },
    primaryKey: { type: Schema.Types.String, required: true, trim: true },
    secondaryKey: { type: Schema.Types.String, required: true, trim: true },
    client: {
      // client user
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// keystoreSchema.index({ _id: 1 }, { unique: true });

module.exports.KEYSTORE = auth_conn.model(
  "Keystore",
  keystoreSchema,
  "keystores"
);
