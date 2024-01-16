const { Schema } = require("mongoose");
const { point_conn } = require("../databases/init.multi.mongodb");

const roleSchema = new Schema(
  {
    pointId: { type: Schema.Types.String, required: true, unique: true },
    code: { type: Schema.Types.String, required: true, unique: true },
    title: { type: Schema.Types.String, default: "" },
    description: { type: Schema.Types.String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
roleSchema.index({ pointId: 1, code: 1 }, { unique: true });

module.exports._POINT = point_conn.model("Point", roleSchema, "points");
