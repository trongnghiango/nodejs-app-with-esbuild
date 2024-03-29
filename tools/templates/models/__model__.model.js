const { Schema } = require("mongoose");
const { __model___conn } = require("../databases/init.multi.mongodb");

const roleSchema = new Schema(
  {
    __model__Id: { type: Schema.Types.String, required: true, unique: true },
    code: { type: Schema.Types.String, required: true, unique: true },
    title: { type: Schema.Types.String, default: "" },
    description: { type: Schema.Types.String, default: "" },
    notes: { type: Schema.Types.String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
__model__Schema.index({ agentId: 1, code: 1 }, { unique: true });

module.exports._AGENT = __model___conn.model("Agent", roleSchema, "agents");
