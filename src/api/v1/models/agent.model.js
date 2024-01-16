const { Schema } = require("mongoose");
const { agent_conn } = require("../databases/init.multi.mongodb");

const roleSchema = new Schema(
  {
    agentId: { type: Schema.Types.String, required: true, unique: true },
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
roleSchema.index({ agentId: 1, code: 1 }, { unique: true });

module.exports._AGENT = agent_conn.model("Agent", roleSchema, "agents");
