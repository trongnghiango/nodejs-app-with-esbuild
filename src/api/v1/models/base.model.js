const mongoose = require("mongoose");

function BaseSchema(add) {
  const schema = new mongoose.Schema(
    {
      removed: {
        type: Boolean,
        default: false,
      },
      enabled: {
        type: Boolean,
        default: false,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

  if (add) {
    schema.add(add);
  }

  return schema;
}

module.exports = {
  BaseSchema,
};
