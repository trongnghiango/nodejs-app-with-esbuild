const { Schema } = require("mongoose");
const { auth_conn } = require("../databases/init.multi.mongodb");

const roleSchema = new Schema(
  {
    roleId: { type: Schema.Types.String, required: true, unique: true },
    code: { type: Schema.Types.String, required: true, unique: true },
    key: { type: Schema.Types.String, required: true, unique: true },
    author: {
      type: Schema.Types.String,
      trim: true,
      default: "",
    },
    description: String,
    notes: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
roleSchema.index({ roleId: 1, code: 1, key: 1 }, { unique: true });

module.exports._ROLE = auth_conn.model("Role", roleSchema, "roles");
