const { Schema } = require("mongoose");
const { auth_conn } = require("../databases/init.multi.mongodb");

const userSchema = new Schema(
  {
    userId: { type: Schema.Types.String, required: true, unique: true },
    username: { type: Schema.Types.String, required: true, unique: true },
    email: { type: Schema.Types.String, required: true, unique: true }, // 'unique' adds index => fastens the querying prcoess
    password: { type: Schema.Types.String, required: true, minLength: 6 },
    // option below
    phone: { type: Schema.Types.String, unique: true },
    name: { type: Schema.Types.String, default: "" },
    displayName: { type: Schema.Types.String, default: "" },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    avatar: { type: Schema.Types.String },
    bio: { type: Schema.Types.String },
    links: { type: Schema.Types.String },
    joinDate: { type: Schema.Types.Date, default: Date.now },
    location: { type: Schema.Types.String },
    work: { type: Schema.Types.String },
    skills: { type: Schema.Types.String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.index(
  { userId: 1, email: 1, username: 1, phone: 1 },
  { unique: true }
);

module.exports = {
  _User: auth_conn.model("User", userSchema, "users"), // returns a constructor function
};
