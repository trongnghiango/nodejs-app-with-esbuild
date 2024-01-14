const { Schema } = require("mongoose");
const { transaction_conn } = require("../databases/init.multi.mongodb");

const roleSchema = new Schema(
  {
    transactionId: { type: Schema.Types.String, required: true, unique: true },
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

module.exports._TRANSACTION = transaction_conn.model(
  "Transaction",
  roleSchema,
  "transactions"
);
